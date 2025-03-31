use cosmwasm_schema::cw_serde;
use crate::state::VoucherMetadata;

pub type Extension = VoucherMetadata;

#[cw_serde]
pub struct MintMsg {
    pub token_id: String,
    pub owner: String,
    pub token_uri: Option<String>,
    pub extension: VoucherMetadata,
}

#[cw_serde]
pub enum ExecuteMsg {
    Mint(MintMsg),
    TransferNft {
        recipient: String,
        token_id: String,
    },
    SendNft {
        contract: String,
        token_id: String,
        msg: cosmwasm_std::Binary,
    },
    Approve {
        spender: String,
        token_id: String,
        expires: Option<cw721::Expiration>,
    },
    Revoke {
        spender: String,
        token_id: String,
    },
    ApproveAll {
        operator: String,
        expires: Option<cw721::Expiration>,
    },
    RevokeAll {
        operator: String,
    },
    Burn {
        token_id: String,
    },
}

pub use cw721_base::msg::{
    QueryMsg,
    InstantiateMsg,
};
