<script lang="ts">
  import { VoucherGrid } from '$lib/components/molecules/VoucherGrid';
  
  // Dados de exemplo para NFTs
  const exampleVouchers = [
    {
      id: '128',
      name: 'Monk Punk',
      image: 'https://i.imgur.com/1Yk5Yrn.png',
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m'
    },
    {
      id: '20',
      name: 'Monk Punk',
      image: 'https://i.imgur.com/Yd7MWXZ.png',
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m'
    },
    {
      id: '999',
      name: 'Cool Cat',
      image: 'https://i.imgur.com/1Yk5Yrn.png',
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m'
    },
    {
      id: '42',
      name: 'Bored Ape',
      image: 'https://i.imgur.com/Yd7MWXZ.png',
      price: 0.5,
      timeRemaining: '5h 30m'
    },
    {
      id: '77',
      name: 'Crypto Punk',
      image: 'https://i.imgur.com/1Yk5Yrn.png',
      price: 0.75,
      notForSale: true
    },
    {
      id: '88',
      name: 'Doodle',
      image: 'https://i.imgur.com/Yd7MWXZ.png',
      price: 0.35,
      timeRemaining: '3h 45m'
    },
    {
      id: '101',
      name: 'Azuki',
      image: 'https://i.imgur.com/1Yk5Yrn.png',
      price: 1.2,
      timeRemaining: '1d 5h'
    },
    {
      id: '102',
      name: 'CloneX',
      image: 'https://i.imgur.com/Yd7MWXZ.png',
      price: 2.5,
      timeRemaining: '2d 12h'
    }
  ];
  
  // Função para lidar com o clique em um NFT
  function handleVoucherClick(id: string) {
    alert(`NFT clicado: ${id}`);
  }
  
  // Função para lidar com o clique em "Ver mais"
  function handleSeeMore() {
    alert('Ver mais NFTs');
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-6">Exemplo de Grade de NFTs</h1>
  
  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Grade com 2 Colunas</h2>
    <VoucherGrid
      vouchers={exampleVouchers}
      title="NFTs Disponíveis"
      columns={2}
      onVoucherClick={handleVoucherClick}
      onSeeMore={handleSeeMore}
    />
  </div>
  
  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Grade com 3 Colunas</h2>
    <VoucherGrid
      vouchers={exampleVouchers}
      title="Coleção de NFTs Raros"
      columns={3}
      onVoucherClick={handleVoucherClick}
      onSeeMore={handleSeeMore}
    />
  </div>
  
  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Grade com 4 Colunas</h2>
    <VoucherGrid
      vouchers={exampleVouchers}
      title="Marketplace de NFTs"
      columns={4}
      onVoucherClick={handleVoucherClick}
      onSeeMore={handleSeeMore}
    />
  </div>
  
  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Grade com Poucos NFTs</h2>
    <VoucherGrid
      vouchers={exampleVouchers.slice(0, 3)}
      title="NFTs em Destaque"
      columns={3}
      onVoucherClick={handleVoucherClick}
      onSeeMore={handleSeeMore}
    />
  </div>
</div>
