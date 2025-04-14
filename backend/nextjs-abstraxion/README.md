# 📦 Noahero NFT Treasury – Funções Utilitárias de Integração com Contratos

Este módulo foi desenvolvido como base para testar a integração entre o **frontend** (React + Abstraxion) e os **contratos inteligentes** (cw721 + contrato manager) da rede **XION**.

Ele provê funções prontas para:

- Mintar NFTs
- Aprovar um contrato para movimentar NFTs
- Transferir NFTs
- Buscar NFTs de um usuário e renderizar seus metadados

Estas funções podem ser reutilizadas em outras partes da aplicação. Abaixo, você encontra explicações detalhadas sobre cada função, os parâmetros esperados e exemplos de uso.

---

## 📄 Funções disponíveis

### `mintNft({ contractAddr, tokenId, owner, tokenUri?, extension })`

Mint um novo NFT usando o **contrato manager**, que por sua vez chama o contrato cw721.

#### Parâmetros:

| Nome         | Tipo            | Obrigatório | Descrição |
|--------------|-----------------|-------------|-----------|
| `contractAddr` | `string`       | ✅ | Endereço do contrato cw721 |
| `tokenId`    | `string`         | ✅ | ID único do token |
| `owner`      | `string`         | ✅ | Endereço da carteira que receberá o NFT |
| `tokenUri`   | `string`         | ❌ | URI com os metadados do NFT |
| `extension`  | `VoucherMetadata` | ✅ | Objeto com metadados customizados usados no contrato |

#### Tipo `VoucherMetadata`:

```ts
{
  store_id: string;
  original_owner: string;
  expiration_date: string; // formato ISO 8601
  value: string;           // Ex: "100.00"
  receipt_id: string;
  used: boolean;
  token_uri: string;
}
```

#### Exemplo de uso:

```ts
await mintNft({
  contractAddr: nftContract,
  tokenId: "voucher123",
  owner: account.bech32Address,
  tokenUri: "https://ipfs.io/ipfs/...",
  extension: {
    store_id: "store001",
    original_owner: account.bech32Address,
    expiration_date: "2024-12-31T23:59:59Z",
    value: "100.00",
    receipt_id: "r123",
    used: false,
    token_uri: "https://ipfs.io/ipfs/..."
  }
});
```

---

### `approveNft({ tokenId, owner, spender, contractAddr })`

Autoriza um contrato externo (como o `managerContract`) a transferir o NFT em nome do usuário.

#### Parâmetros:

| Nome         | Tipo    | Obrigatório | Descrição |
|--------------|---------|-------------|-----------|
| `tokenId`    | `string`| ✅ | Token que será aprovado |
| `owner`      | `string`| ✅ | Dono atual do token |
| `spender`    | `string`| ✅ | Endereço do contrato que receberá permissão |
| `contractAddr` | `string`| ✅ | Endereço do contrato cw721 do NFT |

#### Exemplo de uso:

```ts
await approveNft({
  tokenId: "voucher123",
  owner: account.bech32Address,
  spender: managerContract,
  contractAddr: nftContract
});
```

---

### `transferNft({ tokenId, currentOwner, newOwner, contractAddr })`

Realiza a **transferência** de um NFT para outro dono usando o contrato manager.

#### Parâmetros:

| Nome         | Tipo    | Obrigatório | Descrição |
|--------------|---------|-------------|-----------|
| `tokenId`    | `string`| ✅ | Token que será transferido |
| `currentOwner` | `string`| ✅ | Endereço da carteira que possui o NFT |
| `newOwner`   | `string`| ✅ | Novo destinatário |
| `contractAddr` | `string`| ✅ | Endereço do contrato cw721 do NFT |

#### Exemplo de uso:

```ts
await transferNft({
  tokenId: "voucher123",
  currentOwner: account.bech32Address,
  newOwner: "xion1abc123...",
  contractAddr: nftContract
});
```

---

### `getNftsByOwner({ contractAddr, ownerAddress, setResult? })`

Busca todos os NFTs pertencentes a um endereço e retorna os metadados formatados.

#### Parâmetros:

| Nome         | Tipo       | Obrigatório | Descrição |
|--------------|------------|-------------|-----------|
| `contractAddr` | `string` | ✅ | Endereço do contrato cw721 |
| `ownerAddress` | `string` | ✅ | Endereço da carteira a ser consultada |
| `setResult`  | `Function` | ❌ | Função opcional para salvar o resultado no estado |

#### Retorno:

Uma lista de objetos no formato:

```ts
type NftMetadata = {
  id: string;
  name: string;
  description: string;
  image: string;
  store?: string;
  value?: string;
};
```

#### Exemplo de uso:

```ts
const nfts = await getNftsByOwner({
  contractAddr: nftContract,
  ownerAddress: account.bech32Address,
  setResult: setNfts // atualiza o estado local automaticamente
});
```

---

## 💡 Reutilização e Boas Práticas

- As funções `mintNft`, `approveNft` e `transferNft` usam `client.execute`, e exigem que a carteira esteja **conectada e com saldo suficiente**.
- `getNftsByOwner` pode ser usada em páginas de perfil, dashboards ou histórico do usuário.
- Os estados `loading` e `result` podem ser compartilhados via contexto para feedback global na UI.
- É possível extrair essas funções para um hook ou arquivo separado, como `useNftActions.ts`.

---

## 🔗 Dependências

- [`@burnt-labs/abstraxion`](https://www.npmjs.com/package/@burnt-labs/abstraxion)
- React 18+
- Rede **XION** (Cosmos-based chain)
- Contrato cw721 com extensão personalizada