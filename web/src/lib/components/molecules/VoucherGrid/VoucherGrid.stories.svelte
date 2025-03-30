<script context="module" lang="ts">
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import VoucherGrid from './VoucherGrid.svelte';

  // Importar imagens locais
  import img1 from '$lib/assets/1.png';
  import img2 from '$lib/assets/2.png';
  import img3 from '$lib/assets/3.png';
  import img4 from '$lib/assets/4.png';
  import img5 from '$lib/assets/5.png';
  import img6 from '$lib/assets/6.png';

  // Dados de exemplo para NFTs
  const exampleVouchers = [
    {
      id: '128',
      name: 'Monk Punk',
      image: img1,
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m'
    },
    {
      id: '20',
      name: 'Monk Punk',
      image: img2,
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m'
    },
    {
      id: '999',
      name: 'Cool Cat',
      image: img3,
      price: 0.28,
      notForSale: true,
      timeRemaining: '10h 58m'
    },
    {
      id: '42',
      name: 'Bored Ape',
      image: img4,
      price: 0.5,
      timeRemaining: '5h 30m'
    },
    {
      id: '77',
      name: 'Crypto Punk',
      image: img5,
      price: 0.75,
      notForSale: true
    },
    {
      id: '88',
      name: 'Doodle',
      image: img6,
      price: 0.35,
      timeRemaining: '3h 45m'
    }
  ];

  const { Story } = defineMeta({
    title: 'Molecules/VoucherGrid',
    component: VoucherGrid,
    tags: ['autodocs'],
    argTypes: {
      vouchers: {
        control: 'object',
        description: 'Array de NFTs a serem exibidos na grade'
      },
      title: {
        control: 'text',
        description: 'Título da grade'
      },
      columns: {
        control: { type: 'select', options: [2, 3, 4, 5] },
        description: 'Número de colunas na grade'
      },
      onSeeMore: {
        action: 'seeMore',
        description: 'Função chamada quando o botão "Ver mais" é clicado'
      },
      onVoucherClick: {
        action: 'voucherClicked',
        description: 'Função chamada quando um NFT é clicado'
      }
    },
    args: {
      onSeeMore: fn(),
      onVoucherClick: fn()
    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente VoucherGrid é usado para exibir uma grade de NFTs disponíveis.

            ### Características

            - Layout em grade responsivo
            - Suporte a diferentes números de colunas
            - Título personalizável
            - Botão "Ver mais" opcional
            - Suporte a eventos de clique em NFTs individuais
            - Design inspirado em marketplaces de NFT

            ### Uso

            \`\`\`svelte
            <VoucherGrid
              vouchers={nfts}
              title="NFTs Disponíveis"
              columns={3}
              onVoucherClick={(id) => console.log('NFT clicado:', id)}
              onSeeMore={() => console.log('Ver mais NFTs')}
            />
            \`\`\`
          `
        }
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <div class="p-4">
    <VoucherGrid {...args} />
  </div>
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- VoucherGrid com 3 colunas (padrão) -->
<Story
  name="ThreeColumns"
  args={{
    vouchers: exampleVouchers,
    title: "NFTs Disponíveis",
    columns: 3
  }}
/>

<!-- VoucherGrid com 2 colunas -->
<Story
  name="TwoColumns"
  args={{
    vouchers: exampleVouchers,
    title: "NFTs Disponíveis",
    columns: 2
  }}
/>

<!-- VoucherGrid com 4 colunas -->
<Story
  name="FourColumns"
  args={{
    vouchers: exampleVouchers,
    title: "NFTs Disponíveis",
    columns: 4
  }}
/>

<!-- VoucherGrid com poucos NFTs -->
<Story
  name="FewNFTs"
  args={{
    vouchers: exampleVouchers.slice(0, 3),
    title: "NFTs Disponíveis",
    columns: 3
  }}
/>

<!-- VoucherGrid sem NFTs -->
<Story
  name="NoNFTs"
  args={{
    vouchers: [],
    title: "NFTs Disponíveis",
    columns: 3
  }}
/>

<!-- VoucherGrid com título personalizado -->
<Story
  name="CustomTitle"
  args={{
    vouchers: exampleVouchers,
    title: "Coleção de NFTs Raros",
    columns: 3
  }}
/>
