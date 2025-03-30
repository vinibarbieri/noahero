<script lang="ts">
  import { VoucherCard } from '$lib/components/molecules/VoucherCard';
  import { VoucherGrid } from '$lib/components/molecules/VoucherGrid';
// Importar imagens locais
  import img1 from '$lib/assets/1.png';
  import img10 from '$lib/assets/10.png';
  import img11 from '$lib/assets/11.png';
  import img12 from '$lib/assets/12.png';
  import img2 from '$lib/assets/2.png';
  import img3 from '$lib/assets/3.png';
  import img4 from '$lib/assets/4.png';
  import img5 from '$lib/assets/5.png';
  import img6 from '$lib/assets/6.png';
  import img7 from '$lib/assets/7.png';
  import img8 from '$lib/assets/8.png';
  import img9 from '$lib/assets/9.png';

  // Dados de exemplo para NFTs
  const exampleVouchers = [
    {
      id: '128',
      name: 'Monk Punk',
      image: img1,
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m',
      owners: [
        {
          id: 1,
          name: "John Doe",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        },
        {
          id: 2,
          name: "Robert Johnson",
          designation: "Co-owner",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        }
      ]
    },
    {
      id: '20',
      name: 'Monk Punk',
      image: img2,
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m',
      owners: [
        {
          id: 1,
          name: "John Doe",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        }
      ]
    },
    {
      id: '999',
      name: 'Cool Cat',
      image: img3,
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m',
      owners: [
        {
          id: 1,
          name: "John Doe",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        },
        {
          id: 2,
          name: "Robert Johnson",
          designation: "Co-owner",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
          id: 3,
          name: "Jane Smith",
          designation: "Contributor",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        }
      ]
    },
    {
      id: '42',
      name: 'Bored Ape',
      image: img4,
      price: 0.5,
      timeRemaining: '5h 30m',
      owners: [
        {
          id: 4,
          name: "Emily Davis",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        }
      ]
    },
    {
      id: '77',
      name: 'Crypto Punk',
      image: img5,
      price: 0.75,
      notForSale: true,
      owners: [
        {
          id: 5,
          name: "Tyler Durden",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        },
        {
          id: 6,
          name: "Dora",
          designation: "Co-owner",
          image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
        }
      ]
    },
    {
      id: '101',
      name: 'Azuki',
      image: img6,
      price: 1.2,
      timeRemaining: '1d 5h',
      owners: [
        {
          id: 7,
          name: "Alex Morgan",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        }
      ]
    },
    {
      id: '102',
      name: 'CloneX',
      image: img7,
      price: 2.5,
      timeRemaining: '2d 12h',
      owners: [
        {
          id: 8,
          name: "Sarah Lee",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        }
      ]
    },
    {
      id: '103',
      name: 'Doodle',
      image: img8,
      price: 0.35,
      notForSale: true,
      owners: [
        {
          id: 9,
          name: "Mike Wilson",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        }
      ]
    },
    {
      id: '104',
      name: 'Moonbird',
      image: img9,
      price: 3.2,
      timeRemaining: '6h 45m',
      owners: [
        {
          id: 10,
          name: "Jessica Chen",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        }
      ]
    },
    {
      id: '105',
      name: 'Pudgy Penguin',
      image: img10,
      price: 1.8,
      timeRemaining: '3d 8h',
      owners: [
        {
          id: 11,
          name: "David Kim",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        }
      ]
    },
    {
      id: '106',
      name: 'World of Women',
      image: img11,
      price: 0.9,
      notForSale: true,
      owners: [
        {
          id: 12,
          name: "Emma Thompson",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        }
      ]
    },
    {
      id: '107',
      name: 'CryptoPunk',
      image: img12,
      price: 5.5,
      timeRemaining: '12h 30m',
      owners: [
        {
          id: 13,
          name: "James Brown",
          designation: "Owner",
          image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        },
        {
          id: 14,
          name: "Sophia Garcia",
          designation: "Co-owner",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        }
      ]
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
  <h1 class="text-2xl font-bold mb-6">Exemplo de Monk Punk NFT Card</h1>

  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Card Individual</h2>
    <div class="max-w-[280px]">
      <VoucherCard
        id="128"
        name="Monk Punk"
        image={img1}
        price={0.28}
        notForSale={true}
        timeRemaining="10h 58m"
        owners={[
          {
            id: 1,
            name: "John Doe",
            designation: "Owner",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
          },
          {
            id: 2,
            name: "Robert Johnson",
            designation: "Co-owner",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
          }
        ]}
        onClick={() => handleVoucherClick("128")}
      />
    </div>
  </div>

  <div class="mb-8">
    <h2 class="text-xl font-semibold mb-4">Grade de NFTs</h2>
    <VoucherGrid
      vouchers={exampleVouchers}
      title="NFTs Disponíveis"
      columns={3}
      onVoucherClick={handleVoucherClick}
      onSeeMore={handleSeeMore}
    />
  </div>
</div>
