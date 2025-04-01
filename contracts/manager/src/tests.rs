use cosmwasm_std::testing::{mock_dependencies, mock_env};
use cosmwasm_std::{Addr, MessageInfo, from_json};
use crate::contract::{instantiate, execute, query};
use crate::msg::{InstantiateMsg, ExecuteMsg, QueryMsg};
use cosmwasm_std::StdError;

fn mock_message_info(sender: &str) -> MessageInfo {
    MessageInfo {
        sender: Addr::unchecked(sender),
        funds: vec![],
    }
}

#[test]
fn test_instantiate_sets_admin() {
    let mut deps = mock_dependencies();

    let msg = InstantiateMsg {
        admin: Addr::unchecked("creator"),
    };

    let info = mock_message_info("creator");
    let res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();
    assert_eq!(0, res.messages.len());

    let query_res = query(deps.as_ref(), mock_env(), QueryMsg::GetAdmin {}).unwrap();
    let admin: String = from_json(&query_res).unwrap();
    assert_eq!(admin, "creator");
}

#[test]
fn test_add_and_remove_nft_contract() {
    let mut deps = mock_dependencies();
    let admin = Addr::unchecked("admin");
    let nft_contract = Addr::unchecked("nft_contract_1");

    let msg = InstantiateMsg {
        admin: admin.clone(),
    };
    let info = mock_message_info("admin");
    instantiate(deps.as_mut(), mock_env(), info.clone(), msg).unwrap();

    // Add NFT contract
    let add_msg = ExecuteMsg::AddNftContract {
        contract_addr: nft_contract.clone(),
    };
    let res = execute(deps.as_mut(), mock_env(), info.clone(), add_msg).unwrap();
    assert_eq!(res.attributes[1].value, "nft_contract_1");

    // Query it
    let q_msg = QueryMsg::IsContractAllowed {
        contract_addr: nft_contract.clone(),
    };
    let qres = query(deps.as_ref(), mock_env(), q_msg).unwrap();
    let allowed: bool = from_json(&qres).unwrap();
    assert!(allowed);

    // Remove NFT contract
    let rm_msg = ExecuteMsg::RemoveNftContract {
        contract_addr: nft_contract.clone(),
    };
    let _ = execute(deps.as_mut(), mock_env(), info.clone(), rm_msg).unwrap();

    let qres2 = query(
        deps.as_ref(),
        mock_env(),
        QueryMsg::IsContractAllowed {
            contract_addr: nft_contract,
        },
    )
    .unwrap();
    let allowed2: bool = from_json(&qres2).unwrap();
    assert!(!allowed2);
}

#[test]
fn unauthorized_add_should_fail() {
    let mut deps = mock_dependencies();
    let msg = InstantiateMsg {
        admin: Addr::unchecked("admin"),
    };

    let info = mock_message_info("admin");
    instantiate(deps.as_mut(), mock_env(), info.clone(), msg).unwrap();

    let add_msg = ExecuteMsg::AddNftContract {
        contract_addr: Addr::unchecked("nft_contract_unauthorized"),
    };
    let bad_info = mock_message_info("hacker");
    let err = execute(deps.as_mut(), mock_env(), bad_info, add_msg).unwrap_err();

    assert!(matches!(err, StdError::GenericErr { msg, .. } if msg == "Unauthorized"));
}

