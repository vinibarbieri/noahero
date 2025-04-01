use cosmwasm_std::Addr;
use cw_storage_plus::{Item, Map};

// Admin do contrato (quem pode adicionar contratos NFT permitidos)
pub const ADMIN: Item<Addr> = Item::new("admin");

// Lista de contratos NFT permitidos
pub const ALLOWED_NFT_CONTRACTS: Map<Addr, bool> = Map::new("allowed_nft_contracts");

pub enum NftAction {
    Mint,
    Burn,
    Transfer,
}
