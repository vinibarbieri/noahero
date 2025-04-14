"use client";

import { useState, useEffect, useRef } from "react";
import {
  Abstraxion, // Componente de modal para conectar a carteira
  useAbstraxionAccount, // Hook que retorna a conta conectada
  useAbstraxionSigningClient, // Cliente usado para enviar transações (escrever na blockchain)
  useAbstraxionClient, // Cliente usado para consultar contratos (leitura)
  useModal, // Hook para controlar o modal de conexão da carteira
} from "@burnt-labs/abstraxion";

import { Button } from "@burnt-labs/ui"; // Componente de botão estilizado

// Endereço do contrato manager, que controla o mint e transfer
const managerContract = "xion1vxweqf08tt22w4ud0gpspygxv97x5vga9jkdyqp97z0eqsr8gyds2m9yv3";

// Endereço do contrato do NFT (cw721)
const nftContract = "xion1klhdqpgm396rl06yc0up0njn0alm2mgejgvedt6qmwlcr29zc3ds66d9lq";

// ID do token NFT a ser mintado ou manipulado
const tokenId = "voucher003";

// URI com os metadados do NFT (pode conter nome, imagem, atributos etc.)
const metadataUri = "https://brown-obliged-albatross-730.mypinata.cloud/ipfs/bafkreihvqkngnun3334j2v2tdvjjnxvnaij4lwjlrcd26bslimqgwjg42a";

// Novo dono que receberá o NFT na transferência
const newOwner = "xion1hyvx9s4y87x87wqu9v6sa64dlfggq3wynp0z5s";

// Componente principal da página
export default function Page() {
  // Dados da conta conectada (como o endereço da carteira)
  const { data: account } = useAbstraxionAccount();

  // Cliente para transações e assinar mensagens
  const { client, signArb } = useAbstraxionSigningClient();

  // Cliente para consultar informações dos contratos
  const { client: queryClient } = useAbstraxionClient();

  // Controle do modal de conexão
  const [, setShowModal] = useModal();

  // Estados para feedback e controle
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [nfts, setNfts] = useState<any[]>([]); // Lista de NFTs do usuário

  const fetchedNfts = useRef(false); // Garante que só busque os NFTs uma vez

  type VoucherMetadata = {
    store_id: string;
    original_owner: string;
    expiration_date: string;
    value: string;
    receipt_id: string;
    used: boolean;
    token_uri: string;
  };

  type MintNftParams = {
    contractAddr: string;
    tokenId: string;
    owner: string;
    tokenUri?: string; // opcional, pois é Option<String> no Rust
    extension: VoucherMetadata;
  };

  type NftMetadata = {
    id: string;
    name: string;
    description: string;
    image: string;
    store?: string;
    value?: string;
  };


  // Função para mintar um NFT através do contrato manager
  // O mint é feito através do contrato manager, que chama o cw721
  const mintNft = async ({
    contractAddr,
    tokenId,
    owner,
    tokenUri,
    extension,
  }: MintNftParams) => {
    if (!client) return;
    setLoading(true);

    try {
      const res = await client.execute(
        owner,
        managerContract,
        {
          mint_nft: {
            contract_addr: contractAddr,
            token_id: tokenId,
            owner,            
            token_uri: tokenUri ?? null,
            extension,
          },
        },
        "auto" // Define automaticamente a taxa (gas)
      );

      setResult(`✅ Mint realizado! TX: ${res.transactionHash}`);
      await getNftsByOwner({
        contractAddr: nftContract,
        ownerAddress: account.bech32Address,
        setResult: setNfts,
      }); // Atualiza lista de NFTs após mint
    } catch (err) {
      console.error(err);
      setResult("❌ Erro ao mintar NFT.");
    } finally {
      setLoading(false);
    }
  };

  // Função para aprovar o contrato manager a transferir um NFT
  const approveNft = async ({
    tokenId,
    owner,
    spender,
    contractAddr,
  }: {
    tokenId: string;
    owner: string;
    spender: string;
    contractAddr: string;
  }) => {
    if (!client) return;
    setLoading(true);

    try {
      const res = await client.execute(
        owner,
        contractAddr,
        {
          approve: {
            spender,
            token_id: tokenId,
          },
        },
        "auto"
      );
      
      setResult(`✅ Approve realizado com sucesso! TX: ${res.transactionHash}`);
    } catch (err) {
      console.error("Erro no approve:", err);
      setResult("❌ Erro ao aprovar NFT.");
    } finally {
      setLoading(false);
    }
  };

  
  

  // Função que transfere o NFT para outro dono via contrato manager
  const transferNft = async ({
    tokenId,
    currentOwner,
    newOwner,
    contractAddr,
  }: {
    tokenId: string;
    currentOwner: string;
    newOwner: string;
    contractAddr: string;
  }) => {
    if (!client) return;
    setLoading(true);
  
    try {
      const res = await client.execute(
        currentOwner,
        managerContract,
        {
          transfer_nft: {
            contract_addr: contractAddr,
            token_id: tokenId,
            new_owner: newOwner,
          },
        },
        "auto"
      );

      setResult(`✅ Transferência realizada! TX: ${res.transactionHash}`);
    } catch (err) {
      console.error("Erro ao transferir NFT:", err);
      setResult("❌ Erro ao transferir NFT.");
    } finally {
      setLoading(false);
    }
  };
  

  // Função que consulta os NFTs do usuário
  const getNftsByOwner = async ({
    contractAddr,
    ownerAddress,
    setResult,
  }: {
    contractAddr: string;
    ownerAddress: string;
    setResult?: (nfts: NftMetadata[]) => void;
  }): Promise<NftMetadata[] | void> => {
    if (!queryClient || !ownerAddress) return;
  
    try {
      const tokenList = await queryClient.queryContractSmart(contractAddr, {
        tokens: { owner: ownerAddress },
      });
  
      console.log("Tokens encontrados:", tokenList.tokens);
  
      const metadataList = await Promise.all(
        tokenList.tokens.map(async (token_id: string) => {
          const nftInfo = await queryClient.queryContractSmart(contractAddr, {
            nft_info: { token_id },
          });
  
          const metadata = await fetch(nftInfo.token_uri).then((res) =>
            res.json()
          );
  
          const storeAttr = metadata.attributes.find(
            (a: any) => a.trait_type === "Store ID"
          );
          const valueAttr = metadata.attributes.find(
            (a: any) => a.trait_type === "Value"
          );
  
          return {
            id: token_id,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            store: storeAttr?.value,
            value: valueAttr?.value,
          };
        })
      );
  
      if (setResult) setResult(metadataList);
  
      return metadataList;
    } catch (err) {
      console.error("Erro ao buscar NFTs:", err);
    }
  };

  // Executa a função de buscar NFTs apenas uma vez após conexão
  useEffect(() => {
    if (account?.bech32Address && !fetchedNfts.current) {
      fetchedNfts.current = true;
      getNftsByOwner({
        contractAddr: nftContract,
        ownerAddress: account.bech32Address,
        setResult: setNfts,
    });
    }
  }, [account]);

  // JSX que renderiza a interface do usuário
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-white bg-black">
      <h1 className="text-3xl font-bold">Noahero NFT Treasury</h1>

      {/* Botão para conectar a carteira */}
      <Button onClick={() => setShowModal(true)}>
        {account?.bech32Address || "Conectar Wallet"}
      </Button>

      {/* Se estiver conectado, mostra os botões de ação */}
      {account && (
        <>
          <Button onClick={() =>
            mintNft({
              contractAddr: nftContract,
              tokenId,
              owner: account.bech32Address,
              tokenUri: metadataUri,
              extension: {
                store_id: "store_id",
                original_owner: account.bech32Address,
                expiration_date: "2023-12-31T23:59:59Z",
                value: "100.00",
                receipt_id: "receipt_id",
                used: false,
                token_uri: metadataUri,
              },
            })
          } disabled={loading}>
            {loading ? "Mintando..." : "Mint NFT"}
          </Button>

          <Button onClick={() =>
            approveNft({
              tokenId,
              owner: account.bech32Address,
              spender: managerContract,
              contractAddr: nftContract,
            })
          } disabled={loading}>
            {loading ? "Aprovando..." : "Approve NFT"}
          </Button>

          <Button onClick={() =>
            transferNft({
              tokenId,
              currentOwner: account.bech32Address,
              newOwner,
              contractAddr: nftContract,
            })
          } disabled={loading}>
            {loading ? "Transferindo..." : "Transferir NFT"}
          </Button>
        </>
      )}

      {/* Feedback da operação (mint, approve ou transfer) */}
      {result && (
        <div className="p-4 mt-4 border border-gray-300 rounded-md text-sm text-center max-w-md">
          {result}
        </div>
      )}

      {/* Lista de NFTs do usuário conectados */}
      <div className="grid grid-cols-1 gap-4 mt-6 w-full max-w-2xl">
        {nfts.map((nft) => (
          <div key={nft.id} className="border p-4 rounded-md bg-white text-black">
            <h2 className="text-lg font-semibold">{nft.name || `NFT ${nft.id}`}</h2>
            <p><strong>Descrição:</strong> {nft.description}</p>
            <p><strong>Loja:</strong> {nft.store}</p>
            <p><strong>Valor:</strong> R$ {nft.value}</p>
            {nft.image && (
              <img
                src={nft.image}
                alt={nft.name}
                className="mt-2 max-h-40 rounded-md"
              />
            )}
          </div>
        ))}
      </div>

      {/* Componente do modal de conexão da carteira (Abstraxion) */}
      <Abstraxion onClose={() => setShowModal(false)} />
    </main>
  );
}
