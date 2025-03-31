use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
use crate::state::{ADMIN, ALLOWED_NFT_CONTRACTS};
use cosmwasm_std::{Deps, DepsMut, Env, MessageInfo, Response, StdResult, entry_point, Binary, to_json_binary, CosmosMsg, WasmMsg};


#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    ADMIN.save(deps.storage, &msg.admin)?;
    Ok(Response::new().add_attribute("method", "instantiate"))
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    match msg {
        ExecuteMsg::AddNftContract { contract_addr } => {
            let admin = ADMIN.load(deps.storage)?;
            if info.sender != admin {
                return Err(cosmwasm_std::StdError::generic_err("Unauthorized"));
            }
            ALLOWED_NFT_CONTRACTS.save(deps.storage, contract_addr.clone(), &true)?;
            Ok(Response::new().add_attribute("action", "add_nft_contract").add_attribute("contract", contract_addr))
        },
        ExecuteMsg::RemoveNftContract { contract_addr } => {
            let admin = ADMIN.load(deps.storage)?;
            if info.sender != admin {
                return Err(cosmwasm_std::StdError::generic_err("Unauthorized"));
            }
            ALLOWED_NFT_CONTRACTS.remove(deps.storage, contract_addr.clone());
            Ok(Response::new().add_attribute("action", "remove_nft_contract").add_attribute("contract", contract_addr))
        },
        ExecuteMsg::MintNft { contract_addr, token_id, owner, token_uri, extension } => {
            if !ALLOWED_NFT_CONTRACTS.has(deps.storage, contract_addr.clone()) {
                return Err(cosmwasm_std::StdError::generic_err("NFT contract not allowed"));
            }
            let msg = WasmMsg::Execute {
                contract_addr: contract_addr.to_string(),
                msg: to_json_binary(&serde_json::json!({
                    "mint": {
                        "token_id": token_id,
                        "owner": owner,
                        "token_uri": token_uri,
                        "extension": extension
                    }
                }))?,
                funds: vec![],
            };
            Ok(Response::new().add_message(CosmosMsg::Wasm(msg)).add_attribute("action", "mint"))
        },
        ExecuteMsg::TransferNft { contract_addr, token_id, new_owner } => {
            if !ALLOWED_NFT_CONTRACTS.has(deps.storage, contract_addr.clone()) {
                return Err(cosmwasm_std::StdError::generic_err("NFT contract not allowed"));
            }
            let msg = WasmMsg::Execute {
                contract_addr: contract_addr.to_string(),
                msg: to_json_binary(&serde_json::json!({
                    "transfer_nft": {
                        "recipient": new_owner,
                        "token_id": token_id,
                    }
                }))?,
                funds: vec![],
            };
            Ok(Response::new().add_message(CosmosMsg::Wasm(msg)).add_attribute("action", "transfer"))
        },
        ExecuteMsg::BurnNft { contract_addr, token_id } => {
            if !ALLOWED_NFT_CONTRACTS.has(deps.storage, contract_addr.clone()) {
                return Err(cosmwasm_std::StdError::generic_err("NFT contract not allowed"));
            }
            let msg = WasmMsg::Execute {
                contract_addr: contract_addr.to_string(),
                msg: to_json_binary(&serde_json::json!({
                    "burn": {
                        "token_id": token_id
                    }
                }))?,
                funds: vec![],
            };
            Ok(Response::new().add_message(CosmosMsg::Wasm(msg)).add_attribute("action", "burn"))
        },
    }
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::IsContractAllowed { contract_addr } => {
            let allowed = ALLOWED_NFT_CONTRACTS.has(deps.storage, contract_addr);
            to_json_binary(&allowed)
        },
        QueryMsg::GetAdmin {} => {
            let admin = ADMIN.load(deps.storage)?;
            to_json_binary(&admin)
        },
    }
}

#[derive(Debug, thiserror::Error)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] cosmwasm_std::StdError),
    
    #[error("Unauthorized")]
    Unauthorized {},
}
