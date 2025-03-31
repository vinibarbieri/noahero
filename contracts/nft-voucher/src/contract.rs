use cosmwasm_std::{DepsMut, Deps, Env, MessageInfo, Response, Binary};
use cw721_base::error::ContractError;
use crate::msg::{InstantiateMsg, ExecuteMsg, QueryMsg};
use crate::state::{TREASURY, VOUCHER_METADATA};
use cw721_base::entry::{instantiate as cw_instantiate, query as cw_query, execute as cw_execute};
use cw721_base::msg::ExecuteMsg as Cw721BaseExecuteMsg;

#[cfg_attr(not(feature = "library"), cosmwasm_std::entry_point)]
pub fn instantiate(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let minter = msg.minter.clone().ok_or_else(|| cosmwasm_std::StdError::generic_err("Minter is required"))?;
    let treasury = deps.api.addr_validate(&minter)?;
    TREASURY.save(deps.storage, &treasury)?;
    cw_instantiate(deps, env, info, msg)
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

            // Salva os metadados personalizados
            VOUCHER_METADATA.save(
                deps.storage,
                mint_msg.token_id.clone(),
                &mint_msg.extension,
            )?;

            // Encaminha para o cw721_base
            let cw_msg = Cw721BaseExecuteMsg::Mint {
                token_id: mint_msg.token_id,
                owner: mint_msg.owner,
                token_uri: mint_msg.token_uri,
                extension: None,
            };

            cw_execute(deps, env, info, cw_msg)
        }

        _ => Err(ContractError::Std(
            cosmwasm_std::StdError::generic_err("Only mint is supported in this version"),
        )),
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
