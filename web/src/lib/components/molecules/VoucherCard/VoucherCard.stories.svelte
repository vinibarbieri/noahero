<script context="module" lang="ts">
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import { VoucherCard } from './index';

  // Importar imagens locais
  import img1 from '$lib/assets/1.png';
  import img2 from '$lib/assets/2.png';
  import img3 from '$lib/assets/3.png';
  import img4 from '$lib/assets/4.png';
  import img5 from '$lib/assets/5.png';

  const { Story } = defineMeta({
    title: 'Molecules/VoucherCard',
    component: VoucherCard,
    tags: ['autodocs'],
    argTypes: {
      id: {
        control: 'text',
        description: 'ID do NFT'
      },
      name: {
        control: 'text',
        description: 'Nome do NFT'
      },
      image: {
        control: 'text',
        description: 'URL da imagem do NFT'
      },
      price: {
        control: 'number',
        description: 'Preço do NFT em ETH'
      },
      timeRemaining: {
        control: 'text',
        description: 'Tempo restante para o fim do leilão'
      },
      notForSale: {
        control: 'boolean',
        description: 'Indica se o NFT não está à venda'
      },
      owners: {
        control: 'object',
        description: 'Lista de proprietários do NFT'
      },
      onClick: {
        action: 'clicked',
        description: 'Função chamada quando o card é clicado'
      }
    },
    args: {
      id: '',
      name: '',
      onClick: fn()
    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente VoucherCard é usado para exibir informações sobre um NFT disponível.

            ### Características

            - Design inspirado em marketplaces de NFT
            - Exibe imagem do NFT em formato quadrado (proporção 1:1)
            - Mostra nome e ID do NFT
            - Exibe preço em ETH em um badge na interseção
            - Mostra avatares dos proprietários na interseção
            - Indica status de venda ou tempo restante para o fim do leilão
            - Interativo com evento de clique
            - Acessível com suporte a navegação por teclado

            ### Tamanho de Imagem Recomendado

            - **Proporção**: 1:1 (quadrada)
            - **Tamanho recomendado**: 500x500 pixels
            - **Formato**: PNG ou JPG
            - **Observação**: Imagens com proporções diferentes serão cortadas para manter a proporção quadrada

            ### Uso

            \`\`\`svelte
            <VoucherCard
              id="128"
              name="Monk Punk"
              image="https://example.com/monk-punk.png"
              price={0.28}
              timeRemaining="10h 58m"
              notForSale={true}
              owners={[
                {
                  id: 1,
                  name: "John Doe",
                  designation: "Owner",
                  image: "https://example.com/avatar1.jpg"
                }
              ]}
              onClick={() => console.log('NFT clicado')}
            />
            \`\`\`
          `
        }
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <div class="p-4 max-w-[180px]">
    <VoucherCard {...args} />
  </div>
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- VoucherCard com tempo restante -->
<Story
  name="WithTimeRemaining"
  args={{
    id: "128",
    name: "Monk Punk",
    image: img1,
    price: 0.28,
    timeRemaining: "10h 58m",
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
  }}
/>

<!-- VoucherCard não à venda -->
<Story
  name="NotForSale"
  args={{
    id: "20",
    name: "Monk Punk",
    image: img2,
    price: 0.28,
    notForSale: true,
    owners: [
      {
        id: 1,
        name: "John Doe",
        designation: "Owner",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
      }
    ]
  }}
/>

<!-- VoucherCard com nome longo -->
<Story
  name="LongName"
  args={{
    id: "999",
    name: "Cool Cat Super Rare Collection",
    image: img3,
    price: 0.28,
    timeRemaining: "10h 58m"
  }}
/>

<!-- VoucherCard sem imagem -->
<Story
  name="NoImage"
  args={{
    id: "42",
    name: "Bored Ape",
    image: img4,
    price: 0.5,
    timeRemaining: "5h 30m"
  }}
/>

<!-- VoucherCard com preço alto -->
<Story
  name="HighPrice"
  args={{
    id: "77",
    name: "Crypto Punk",
    image: img5,
    price: 75.5,
    timeRemaining: "2h 15m"
  }}
/>
