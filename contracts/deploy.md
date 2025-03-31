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

nft-voucher = 3FBB7F4CDEB8F55C78B1131F37F49246D29AF4FDB1CE0F737B78F4B6FDB3E523

===========SET TXHASH===========
TXHASH="your-txhash-here"

===========QUERY THE CODE ID===========
CODE_ID=$(xiond query tx $TXHASH \
  --node https://rpc.xion-testnet-2.burnt.com:443 \
  --output json | jq -r '.events[-1].attributes[1].value')

===========PRINT CODE ID===========
echo $CODE_ID

nft-voucher = 261

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

nft-voucher = D6D6C3E126858CF42723A90D43DDE1337774027092E5EE09255BF332C5F27D3E

CONTRACT=$(xiond query tx $TXHASH \
  --node https://rpc.xion-testnet-2.burnt.com:443 \
  --output json | jq -r '.events[] | select(.type == "instantiate") | .attributes[] | select(.key == "_contract_address") | .value')


===========DISPLAY THE CONTRACT ADDRESS===========
echo $CONTRACT

nft-voucher = xion1wwa0z02ks7k8trhvc8empfn0cd35d6hmp9hm6sdcw0jkr278gxmsvm5tl6

===========ADICIONA O CONTRATO DE NFT===========
xiond tx wasm execute xion1vxweqf08tt22w4ud0gpspygxv97x5vga9jkdyqp97z0eqsr8gyds2m9yv3 \
  '{"add_nft_contract":{"contract_addr":"xion1wwa0z02ks7k8trhvc8empfn0cd35d6hmp9hm6sdcw0jkr278gxmsvm5tl6"}}' \
  --from wallet1 \
  --gas auto --gas-adjustment 1.3 --gas-prices 0.025uxion \
  --chain-id xion-testnet-2 \
  --node https://rpc.xion-testnet-2.burnt.com:443 \
  -y

===========MINT PELO TREASURY===========
xiond tx wasm execute xion1vxweqf08tt22w4ud0gpspygxv97x5vga9jkdyqp97z0eqsr8gyds2m9yv3 \
  '{
    "mint_nft": {
      "contract_addr": "xion1wwa0z02ks7k8trhvc8empfn0cd35d6hmp9hm6sdcw0jkr278gxmsvm5tl6",
      "token_id": "voucher002",
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
xiond query wasm contract-state smart xion1wwa0z02ks7k8trhvc8empfn0cd35d6hmp9hm6sdcw0jkr278gxmsvm5tl6 '{
  "tokens": {
    "owner": "xion1hyvx9s4y87x87wqu9v6sa64dlfggq3wynp0z5s"
  }
}' \
--node https://rpc.xion-testnet-2.burnt.com:443

===========APROVAR O TREASURY PARA TRANSFERIR NFT===========
xiond tx wasm execute xion1wwa0z02ks7k8trhvc8empfn0cd35d6hmp9hm6sdcw0jkr278gxmsvm5tl6 '{
  "approve": {
    "spender": "xion1vxweqf08tt22w4ud0gpspygxv97x5vga9jkdyqp97z0eqsr8gyds2m9yv3",
    "token_id": "voucher002"
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
    "contract_addr": "xion166wlvejtp7pjmjr53erqz9kuzyscdrgpjg3dm95zvanus4zwzyzsedmkam",
    "token_id": "voucher002",
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
