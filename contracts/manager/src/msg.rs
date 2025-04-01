use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Addr;
use serde_json::Value;

#[cw_serde]
pub struct InstantiateMsg {
    pub admin: Addr,
}

#[cw_serde]
pub enum ExecuteMsg {
    AddNftContract { contract_addr: Addr },
    RemoveNftContract { contract_addr: Addr },
    MintNft {
        contract_addr: Addr,
        token_id: String,
        owner: Addr,
        token_uri: Option<String>,
        extension: Value,
    },
    TransferNft {
        contract_addr: Addr,
        token_id: String,
        new_owner: Addr,
    },
    BurnNft {
        contract_addr: Addr,
        token_id: String,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(bool)]
    IsContractAllowed { contract_addr: Addr },
    #[returns(Addr)]
    GetAdmin {},
}
