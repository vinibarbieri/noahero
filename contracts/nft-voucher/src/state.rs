
use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Timestamp, Uint128};
use cw_storage_plus::{Item, Map};
// use serde_json::Value;


#[cw_serde]
pub struct VoucherMetadata {
    pub value: Uint128,
    pub store_id: String,
    pub original_owner: Addr,
    pub expiration_date: Timestamp,
    pub receipt_id: String,
    pub used: bool,
    pub token_uri: String,
}

pub const VOUCHER_METADATA: Map<String, VoucherMetadata> = Map::new("voucher_metadata");
pub const IS_LOCKED: Map<String, bool> = Map::new("is_locked");
pub const PENDING_TRANSFERS: Map<String, Addr> = Map::new("pending_transfers");
pub const TREASURY: Item<Addr> = Item::new("treasury");
pub const ADMIN: Item<Addr> = Item::new("admin");
