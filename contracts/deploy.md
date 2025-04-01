===========GENERATE NEW KEY PAIR===========
xiond keys add <keyname>

===========PRINT PUBLIC KEY===========
xiond keys show <keyname>

===========GET FAUCETS===========
https://faucet.xion.burnt.com/

===========COMPILA O CONTRATO===========
sudo docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/optimizer:0.16.1

===========SET WALLET===========
WALLET=wallet1

===========UPLOAD THE CONTRACT TO THE BLOCKCHAIN===========
RES=$(xiond tx wasm store ./artifacts/nft_voucher.wasm \
      --chain-id xion-testnet-2 \
      --gas-adjustment 1.3 \
      --gas-prices 0.1uxion \
      --gas auto \
      -y --output json \
      --node https://rpc.xion-testnet-2.burnt.com:443 \
      --from $WALLET)

===========EXTRACT THE TX HASH===========
echo $RES

nft-voucher = C0482A09505332DAE90EF430F9CF4750474CE0B1DF619884BD74D9D640964B22

===========SET TXHASH===========
TXHASH="your-txhash-here"

===========QUERY THE CODE ID===========
CODE_ID=$(xiond query tx $TXHASH \
  --node https://rpc.xion-testnet-2.burnt.com:443 \
  --output json | jq -r '.events[-1].attributes[1].value')

===========PRINT CODE ID===========
echo $CODE_ID

nft-voucher = 264

===========INSTANCIA O CONTRATO TREASURY===========
xiond tx wasm instantiate 251 '{"admin":"xion1hyvx9s4y87x87wqu9v6sa64dlfggq3wynp0z5s"}' \
  --label "treasury contract" \
  --from wallet1 \
  --chain-id xion-testnet-2 \
  --gas-adjustment 1.3 \
  --gas auto \
  --gas-prices 0.025uxion \
  --node https://rpc.xion-testnet-2.burnt.com:443 \
  --no-admin \
  -y

===========INSTANTIATE THE CONTRACT===========
MSG='{ "count": 1 }'

MSG='{
  "name": "VoucherNFT",
  "symbol": "VCH",
  "admin": wallet1,
  "treasury": "xion1vxweqf08tt22w4ud0gpspygxv97x5vga9jkdyqp97z0eqsr8gyds2m9yv3"
}'


xiond tx wasm instantiate $CODE_ID '{
  "name": "VoucherNFT",
  "symbol": "VCH",
  "admin": "xion1hyvx9s4y87x87wqu9v6sa64dlfggq3wynp0z5s",
  "treasury": "xion1vxweqf08tt22w4ud0gpspygxv97x5vga9jkdyqp97z0eqsr8gyds2m9yv3"
}' \
  --from $WALLET \
  --label "nft-voucher" \
  --gas-prices 0.025uxion \
  --gas auto \
  --gas-adjustment 1.3 \
  -y --no-admin \
  --chain-id xion-testnet-2 \
  --node https://rpc.xion-testnet-2.burnt.com:443

===========GET THE CONTRACT ADDRESS===========
TXHASH="your-txhash-here" //TXHASH DO INSTANTIATE

nft-voucher = A74F188E9951B4F04C8063A06B10C8B9D7F7FAB7283F2514C2C3D2EB40EACE01

CONTRACT=$(xiond query tx $TXHASH \
  --node https://rpc.xion-testnet-2.burnt.com:443 \
  --output json | jq -r '.events[] | select(.type == "instantiate") | .attributes[] | select(.key == "_contract_address") | .value')


===========DISPLAY THE CONTRACT ADDRESS===========
echo $CONTRACT

nft-voucher = xion1klhdqpgm396rl06yc0up0njn0alm2mgejgvedt6qmwlcr29zc3ds66d9lq

===========ADICIONA O CONTRATO DE NFT===========
xiond tx wasm execute xion1vxweqf08tt22w4ud0gpspygxv97x5vga9jkdyqp97z0eqsr8gyds2m9yv3 \
  '{"add_nft_contract":{"contract_addr":"xion1klhdqpgm396rl06yc0up0njn0alm2mgejgvedt6qmwlcr29zc3ds66d9lq"}}' \
  --from wallet1 \
  --gas auto --gas-adjustment 1.3 --gas-prices 0.025uxion \
  --chain-id xion-testnet-2 \
  --node https://rpc.xion-testnet-2.burnt.com:443 \
  -y

===========MINT PELO TREASURY===========
xiond tx wasm execute xion1vxweqf08tt22w4ud0gpspygxv97x5vga9jkdyqp97z0eqsr8gyds2m9yv3 \
  '{
    "mint_nft": {
      "contract_addr": "xion1klhdqpgm396rl06yc0up0njn0alm2mgejgvedt6qmwlcr29zc3ds66d9lq",
      "token_id": "voucher001",
      "owner": "xion1hyvx9s4y87x87wqu9v6sa64dlfggq3wynp0z5s",
      "token_uri": "https://brown-obliged-albatross-730.mypinata.cloud/ipfs/bafkreihvqkngnun3334j2v2tdvjjnxvnaij4lwjlrcd26bslimqgwjg42a",
      "extension": {
        "store_id": "store-123",
        "original_owner": "xion1hyvx9s4y87x87wqu9v6sa64dlfggq3wynp0z5s",
        "expiration_date": "1767150001",
        "value": "100",
        "receipt_id": "rec-789",
        "used": false,
        "token_uri": "https://brown-obliged-albatross-730.mypinata.cloud/ipfs/bafkreihvqkngnun3334j2v2tdvjjnxvnaij4lwjlrcd26bslimqgwjg42a"
      }
    }
  }' \
  --from wallet1 \
  --chain-id xion-testnet-2 \
  --gas auto --gas-adjustment 1.3 \
  --gas-prices 0.025uxion \
  --node https://rpc.xion-testnet-2.burnt.com:443 \
  -y

===========VER OS TOKENS DA WALLET===========
xiond query wasm contract-state smart xion1klhdqpgm396rl06yc0up0njn0alm2mgejgvedt6qmwlcr29zc3ds66d9lq '{
  "tokens": {
    "owner": "xion1gpfvcqd76d6hfhqh33u4qd6k4608juf5mvcff6"
  }
}' \
--node https://rpc.xion-testnet-2.burnt.com:443

===========APROVAR O TREASURY PARA TRANSFERIR NFT===========
xiond tx wasm execute xion1klhdqpgm396rl06yc0up0njn0alm2mgejgvedt6qmwlcr29zc3ds66d9lq '{
  "approve": {
    "spender": "xion1vxweqf08tt22w4ud0gpspygxv97x5vga9jkdyqp97z0eqsr8gyds2m9yv3",
    "token_id": "voucher001"
  }
}' \
--from wallet1 \
--gas auto --gas-adjustment 1.3 --gas-prices 0.025uxion \
--chain-id xion-testnet-2 \
--node https://rpc.xion-testnet-2.burnt.com:443 \
-y


===========TRANSFERIR NFT PELO TREASURY===========
xiond tx wasm execute xion1vxweqf08tt22w4ud0gpspygxv97x5vga9jkdyqp97z0eqsr8gyds2m9yv3 '{
  "transfer_nft": {
    "contract_addr": "xion1klhdqpgm396rl06yc0up0njn0alm2mgejgvedt6qmwlcr29zc3ds66d9lq",
    "token_id": "voucher001",
    "new_owner": "xion1gpfvcqd76d6hfhqh33u4qd6k4608juf5mvcff6"
  }
}' \
--from wallet1 \
--chain-id xion-testnet-2 \
--gas auto \
--gas-adjustment 1.3 \
--gas-prices 0.025uxion \
--node https://rpc.xion-testnet-2.burnt.com:443 \
-y


===========TESTAR TRANSFERENCIA DIRETA ENTRE USUARIOS===========
xiond tx wasm execute xion1klhdqpgm396rl06yc0up0njn0alm2mgejgvedt6qmwlcr29zc3ds66d9lq '{
  "transfer_nft": {
    "recipient": "xion1hyvx9s4y87x87wqu9v6sa64dlfggq3wynp0z5s",
    "token_id": "voucher001"
  }
}' \
--from wallet2 \
--chain-id xion-testnet-2 \
--gas auto --gas-adjustment 1.3 --gas-prices 0.025uxion \
--node https://rpc.xion-testnet-2.burnt.com:443 \
-y




xiond query wasm contract-state smart xion1klhdqpgm396rl06yc0up0njn0alm2mgejgvedt6qmwlcr29zc3ds66d9lq '{"nft_info": {"token_id": "voucher003"}}' \
--node https://rpc.xion-testnet-2.burnt.com:443



TRANSFERIR TOKENS
xiond tx bank send xion1gpfvcqd76d6hfhqh33u4qd6k4608juf5mvcff6 xion1qcpz57pyy84n45gxkttautswqkja2tn4ehpjkjaclvz2vh9kd2cskgsgkp 1000uxion \
  --from xion1gpfvcqd76d6hfhqh33u4qd6k4608juf5mvcff6 \
  --chain-id xion-testnet-2 \
  --node https://rpc.xion-testnet-2.burnt.com:443 \
  --gas-prices 0.025uxion \
  --gas auto \
  --gas-adjustment 1.3 \
  -y
