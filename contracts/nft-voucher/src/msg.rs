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

    // Novo
    UpdateTreasury {
        new_treasury: String,
    },

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

// Atualizado: inclui o campo admin
#[cw_serde]
pub struct InstantiateMsg {
    pub name: String,
    pub symbol: String,
    pub admin: String,
    pub treasury: String,
    pub minter: Option<String>, // se quiser manter compatibilidade com cw721_base
}


// Reutiliza QueryMsg do cw721_base
pub use cw721_base::msg::QueryMsg;
