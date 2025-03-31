use cosmwasm_std::{
    Addr, Timestamp, Uint128, MessageInfo,
    testing::{mock_dependencies, mock_env},
};
use crate::contract::{instantiate, execute};
use crate::msg::{InstantiateMsg, ExecuteMsg, MintMsg};
use crate::state::TREASURY;

fn mock_message_info(sender: &str) -> MessageInfo {
    MessageInfo {
        sender: Addr::unchecked(sender),
        funds: vec![],
    }
}

#[test]
fn test_instantiate_saves_admin_and_treasury() {
    let mut deps = mock_dependencies();
    let msg = InstantiateMsg {
        name: "VoucherNFT".to_string(),
        symbol: "VCH".to_string(),
        admin: "admin".to_string(),
        treasury: "treasury".to_string(),
        minter: Some("treasury".to_string()),
    };

    let info = mock_message_info("admin");
    let res = instantiate(deps.as_mut(), mock_env(), info.clone(), msg).unwrap();
    assert_eq!(res.attributes.len(), 1);

    let saved_treasury = TREASURY.load(&deps.storage).unwrap();
    assert_eq!(saved_treasury, Addr::unchecked("treasury"));
}

#[test]
fn test_only_treasury_can_mint() {
    let mut deps = mock_dependencies();

    let msg = InstantiateMsg {
        name: "VoucherNFT".to_string(),
        symbol: "VCH".to_string(),
        admin: "admin".to_string(),
        treasury: "treasury".to_string(),
        minter: None,
    };

    instantiate(deps.as_mut(), mock_env(), mock_message_info("admin"), msg).unwrap();

    let mint_msg = ExecuteMsg::Mint(MintMsg {
        token_id: "voucher001".to_string(),
        owner: "user".to_string(),
        token_uri: Some("https://example.com/metadata.json".to_string()),
        extension: crate::state::VoucherMetadata {
            value: Uint128::new(100),
            store_id: "store-abc".to_string(),
            original_owner: Addr::unchecked("user"),
            expiration_date: Timestamp::from_seconds(1700000000),
            receipt_id: "receipt123".to_string(),
            used: false,
            token_uri: "https://example.com/metadata.json".to_string(),
        },
    });

    // Mint por outro que não é o treasury (esperado: erro)
    let not_treasury = mock_message_info("not_treasury");
    let res = execute(deps.as_mut(), mock_env(), not_treasury, mint_msg.clone());
    assert!(res.is_err());

    // Mint pelo treasury (esperado: sucesso)
    let treasury = mock_message_info("treasury");
    let res_ok = execute(deps.as_mut(), mock_env(), treasury, mint_msg).unwrap();
    assert!(res_ok.attributes.iter().any(|a| a.key == "action" && a.value == "mint"));
}

#[test]
fn test_update_treasury_by_admin() {
    let mut deps = mock_dependencies();

    let instantiate_msg = InstantiateMsg {
        name: "Voucher".to_string(),
        symbol: "VCH".to_string(),
        admin: "admin".to_string(),
        treasury: "treasury".to_string(),
        minter: Some("treasury".to_string()),
    };
    instantiate(deps.as_mut(), mock_env(), mock_message_info("admin"), instantiate_msg).unwrap();

    // Atualizar com admin (esperado: sucesso)
    let update_msg = ExecuteMsg::UpdateTreasury {
        new_treasury: "treasury2".to_string(),
    };
    let res = execute(deps.as_mut(), mock_env(), mock_message_info("admin"), update_msg).unwrap();
    assert!(res.attributes.iter().any(|a| a.key == "action" && a.value == "update_treasury"));

    // Tentar atualizar com não-admin (esperado: erro)
    let bad_update = ExecuteMsg::UpdateTreasury {
        new_treasury: "treasury3".to_string(),
    };
    let res_bad = execute(deps.as_mut(), mock_env(), mock_message_info("hacker"), bad_update);
    assert!(res_bad.is_err());

    // Verifica que o treasury atualizado é o correto
    let treasury = TREASURY.load(&deps.storage).unwrap();
    assert_eq!(treasury, Addr::unchecked("treasury2"));
}
