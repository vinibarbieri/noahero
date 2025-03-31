pub const CONTRACT_NAME: &str = "crates.io:xion-nft";
pub const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg(feature = "entry")]
pub mod contract;
pub mod msg;
pub mod state;

// #[cfg(test)]
// mod tests;
