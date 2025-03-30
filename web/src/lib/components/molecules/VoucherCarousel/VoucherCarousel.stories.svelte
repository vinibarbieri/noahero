<script context="module" lang="ts">
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import VoucherCarousel from './VoucherCarousel.svelte';

  // Importar imagens locais
  import img1 from '$lib/assets/1.png';
  import img2 from '$lib/assets/2.png';
  import img3 from '$lib/assets/3.png';
  import img4 from '$lib/assets/4.png';
  import img5 from '$lib/assets/5.png';
  import img6 from '$lib/assets/6.png';
  import img7 from '$lib/assets/7.png';

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
    },
    {
      id: '101',
      name: 'Azuki',
      image: img7,
      price: 1.2,
      timeRemaining: '1d 5h'
    }
  ];

  const { Story } = defineMeta({
    title: 'Molecules/VoucherCarousel',
    component: VoucherCarousel,
    tags: ['autodocs'],
    argTypes: {
      vouchers: {
        control: 'object',
        description: 'Array de NFTs a serem exibidos no carrossel'
      },
      title: {
        control: 'text',
        description: 'Título do carrossel'
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
            O componente VoucherCarousel é usado para exibir uma lista horizontal rolável de NFTs disponíveis.

            ### Características

            - Carrossel horizontal com rolagem suave
            - Navegação por setas (quando necessário)
            - Botão "Ver mais" para acessar todos os NFTs
            - Título personalizável
            - Suporte a eventos de clique em NFTs individuais
            - Layout responsivo
            - Design inspirado em marketplaces de NFT

            ### Uso

            \`\`\`svelte
            <VoucherCarousel
              vouchers={nfts}
              title="NFTs Disponíveis"
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
  <div class="p-4 max-w-2xl">
    <VoucherCarousel {...args} />
  </div>
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- VoucherCarousel com múltiplos NFTs -->
<Story
  name="Múltiplos NFTs"
  args={{
    vouchers: exampleVouchers,
    title: "NFTs Disponíveis"
  }}
/>

<!-- VoucherCarousel com poucos NFTs -->
<Story
  name="Poucos NFTs"
  args={{
    vouchers: exampleVouchers.slice(0, 3),
    title: "NFTs Disponíveis"
  }}
/>

<!-- VoucherCarousel sem NFTs -->
<Story
  name="Sem NFTs"
  args={{
    vouchers: [],
    title: "NFTs Disponíveis"
  }}
/>

<!-- VoucherCarousel com título personalizado -->
<Story
  name="Título Personalizado"
  args={{
    vouchers: exampleVouchers,
    title: "Featured NFTs"
  }}
/>
