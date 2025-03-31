use cosmwasm_std::{DepsMut, Deps, Env, MessageInfo, Response, Binary, Addr};
use cw721_base::error::ContractError;
use crate::msg::{InstantiateMsg, ExecuteMsg, QueryMsg};
use crate::state::{TREASURY, VOUCHER_METADATA, ADMIN};
use cw721_base::entry::{instantiate as cw_instantiate, query as cw_query, execute as cw_execute};
use cw721_base::msg::ExecuteMsg as Cw721BaseExecuteMsg;
use cosmwasm_std::entry_point;
use cw721_base::msg::InstantiateMsg as Cw721InstantiateMsg;
// use cw721::state::CollectionInfo;
use cosmwasm_std::StdError;


#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _msg: Binary,
) -> Result<Response, ContractError> {
    let admin = ADMIN.load(deps.storage)?;
    if info.sender != admin {
        return Err(ContractError::Std(
            cosmwasm_std::StdError::generic_err("Only admin can migrate the contract"),
        ));
    }

    Ok(Response::new()
        .add_attribute("action", "migrate")
        .add_attribute("by", info.sender))
}


#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let admin = deps.api.addr_validate(&msg.admin)?;
    let treasury = deps.api.addr_validate(&msg.treasury)?;

    ADMIN.save(deps.storage, &admin)?;
    TREASURY.save(deps.storage, &treasury)?;

    let base_msg = Cw721InstantiateMsg {
        name: msg.name,
        symbol: msg.symbol,
        minter: Some(treasury.to_string()),
        collection_info_extension: None,
        creator: Some(admin.to_string()),
        withdraw_address: None,
    };

    cw_instantiate(deps, env, info, base_msg)
}

#[cfg_attr(not(feature = "library"), cosmwasm_std::entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Mint(mint_msg) => {
            let treasury = TREASURY.load(deps.storage)?;
            if info.sender != treasury {
                return Err(ContractError::Std(
                    cosmwasm_std::StdError::generic_err("Unauthorized"),
                ));
            }

            VOUCHER_METADATA.save(
                deps.storage,
                mint_msg.token_id.clone(),
                &mint_msg.extension,
            )?;

            let cw_msg = Cw721BaseExecuteMsg::Mint {
                token_id: mint_msg.token_id,
                owner: mint_msg.owner,
                token_uri: mint_msg.token_uri,
                extension: None,
            };

            cw_execute(deps, env, info, cw_msg)
        }

        ExecuteMsg::UpdateTreasury { new_treasury } => {
            let admin = ADMIN.load(deps.storage)?;
            if info.sender != admin {
                return Err(ContractError::Std(
                    cosmwasm_std::StdError::generic_err("Only admin can update treasury"),
                ));
            }

            let new_addr: Addr = deps.api.addr_validate(&new_treasury)?;
            TREASURY.save(deps.storage, &new_addr)?;

            Ok(Response::new()
                .add_attribute("action", "update_treasury")
                .add_attribute("new_treasury", new_treasury))
        }

        // Todos os outros comandos padrão do cw721
        other => {
            // delega para cw721_base apenas o que for compatível
            let base_msg = match other {
                ExecuteMsg::TransferNft { recipient, token_id } => {
                    let treasury = TREASURY.load(deps.storage)?;
                    if info.sender != treasury {
                        return Err(ContractError::Std(
                            StdError::generic_err("Only treasury can transfer NFTs"),
                        ));
                    }
                    Cw721BaseExecuteMsg::TransferNft { recipient, token_id }
                },
                ExecuteMsg::Burn { token_id } => {
                    let treasury = TREASURY.load(deps.storage)?;
                    if info.sender != treasury {
                        return Err(ContractError::Std(
                            StdError::generic_err("Only treasury can burn NFTs"),
                        ));
                    }
                    Cw721BaseExecuteMsg::Burn { token_id }
                },

                ExecuteMsg::Approve { spender, token_id, expires } => {
                    let treasury = TREASURY.load(deps.storage)?;
                    let validated_spender = deps.api.addr_validate(&spender)?;
                    if validated_spender != treasury {
                        return Err(ContractError::Std(
                            StdError::generic_err("Only treasury can be approved"),
                        ));
                    }

                    Cw721BaseExecuteMsg::Approve {
                        spender,
                        token_id,
                        expires,
                    }
                }
                
                _ => return Err(ContractError::Std(StdError::generic_err("Unsupported message"))),
            };

            cw_execute(deps, env, info, base_msg)
        }
        }
}

#[cfg_attr(not(feature = "library"), cosmwasm_std::entry_point)]
pub fn query(
    deps: Deps,
    env: Env,
    msg: QueryMsg,
) -> Result<Binary, ContractError> {
    cw_query(deps, env, msg)
}
