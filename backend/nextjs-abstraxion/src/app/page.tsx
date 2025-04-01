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

  // Função para mintar um NFT através do contrato manager
  // O mint é feito através do contrato manager, que chama o cw721
  const mintNft = async () => {
    if (!client || !account) return;
    setLoading(true);
    try {
      const res = await client.execute(
        account.bech32Address,
        managerContract,
        {
          mint_nft: {
            contract_addr: nftContract,
            token_id: tokenId,
            owner: account.bech32Address,
            token_uri: metadataUri,
            extension: {
              store_id: "store-123",
              original_owner: account.bech32Address,
              expiration_date: "1767150001",
              value: "100",
              receipt_id: "rec-789",
              used: false,
              token_uri: metadataUri,
            },
          },
        },
        "auto" // Define automaticamente a taxa (gas)
      );
      setResult(`✅ Mint realizado! TX: ${res.transactionHash}`);
      await getMyNfts(); // Atualiza lista de NFTs após mint
    } catch (err) {
      console.error(err);
      setResult("❌ Erro ao mintar NFT.");
    } finally {
      setLoading(false);
    }
  };

  // Função para aprovar o contrato manager a transferir um NFT
  const approveNft = async () => {
    if (!client || !account) return;
    setLoading(true);
    try {
      const res = await client.execute(
        account.bech32Address,
        nftContract,
        {
          approve: {
            spender: managerContract,
            token_id: tokenId,
          },
        },
        "auto"
      );
      setResult(`✅ Approve realizado! TX: ${res.transactionHash}`);
    } catch (err) {
      console.error("Erro no approve:", err);
      setResult("❌ Erro ao aprovar NFT.");
    } finally {
      setLoading(false);
    }
  };

  // Função que transfere o NFT para outro dono via contrato manager
  const transferNft = async () => {
    if (!client || !account) return;
    setLoading(true);
    try {
      const res = await client.execute(
        account.bech32Address,
        managerContract,
        {
          transfer_nft: {
            contract_addr: nftContract,
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
  const getMyNfts = async () => {
    if (!queryClient || !account?.bech32Address) return;
    try {
      const tokenList = await queryClient.queryContractSmart(nftContract, {
        tokens: {
          owner: account.bech32Address,
        },
      });

      console.log("Tokens encontrados:", tokenList.tokens);

      // Para cada token, busca metadados do IPFS e exibe
      const metadataList = await Promise.all(
        tokenList.tokens.map(async (token_id: string) => {
          const nftInfo = await queryClient.queryContractSmart(nftContract, {
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

      setNfts(metadataList);
    } catch (err) {
      console.error("Erro ao buscar NFTs:", err);
    }
  };

  // Executa a função de buscar NFTs apenas uma vez após conexão
  useEffect(() => {
    if (account?.bech32Address && !fetchedNfts.current) {
      fetchedNfts.current = true;
      getMyNfts();
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
          <Button onClick={mintNft} disabled={loading}>
            {loading ? "Mintando..." : "Mint NFT"}
          </Button>

          <Button onClick={approveNft} disabled={loading}>
            {loading ? "Aprovando..." : "Approve NFT"}
          </Button>

          <Button onClick={transferNft} disabled={loading}>
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
