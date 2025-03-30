<script module lang="ts">
  import cantinhodoce from '$lib/assets/cantinhodoce_logo.png';
  import casaarruda from '$lib/assets/casaarruda_logo.jpeg';
  import casasfreitas from '$lib/assets/casasfreitas_logo.png';
  import casasvidal from '$lib/assets/casasvidal_logo.png';
  import potiguar from '$lib/assets/potiguar_logo.webp';
  import terrazoo from '$lib/assets/terrazoo_logo.png';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import AvatarList from './AvatarList.svelte';

  const mockCompanies =  [
    {
      id: '1',
      name: 'Cantinho Doce',
      icon: cantinhodoce,
      href: '#',
      status: 'story'
    },
    {
      id: '2',
      name: 'Potiguar',
      icon: potiguar,
      href: '#',
      status: 'live'
    },
    {
      id: '3',
      name: 'Terra Zoo',
      icon: terrazoo,
      href: '#',
      status: 'story'
    },
    {
      id: '4',
      name: 'Casa Arruda',
      icon: casaarruda,
      href: '#'
    },
    {
      id: '5',
      name: 'Casas Freitas',
      icon: casasfreitas,
      href: '#',
      status: 'story'
    },
    {
      id: '6',
      name: 'Casas Vidal',
      icon: casasvidal,
      href: '#'
    }
  ];

  // Definindo a configuração do story
  const { Story } = defineMeta({
    title: 'Molecules/AvatarList',
    component: AvatarList,
    tags: ['autodocs'],
    argTypes: {
      items: {
        control: 'object',
        description: 'Array de itens contendo as propriedades de cada avatar (name, icon, href, isActive, status)'
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'md', 'lg'],
        description: 'Tamanho dos avatares: sm (32px), md (40px) ou lg (48px)'
      },
      gap: {
        control: { type: 'select' },
        options: ['sm', 'md', 'lg'],
        description: 'Espaçamento entre os avatares: sm (8px), md (12px) ou lg (16px)'
      }
    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente AvatarList exibe uma lista vertical de avatares, geralmente usado na barra lateral
            para mostrar as empresas disponíveis. Ele suporta diferentes tamanhos de avatar e espaçamentos.

            ### Estados dos Avatares

            - **Story**: Borda verde indica que a empresa tem um story ou status disponível
            - **Live**: Borda vermelha e indicador pulsante indicam uma transmissão ao vivo
            - **Ativo**: Outline azul indica o avatar selecionado/ativo
            - **Normal**: Sem bordas especiais

            ### Uso

            \`\`\`svelte
            <AvatarList
              items={[
                { name: 'Empresa A', icon: '/logo-a.png', href: '/empresa-a', status: 'story' },
                { name: 'Empresa B', icon: '/logo-b.png', href: '/empresa-b', status: 'live' }
              ]}
              size="md"
              gap="md"
              on:select={(event) => {
                const selectedItem = event.detail.item;
                // Faça algo com o item selecionado
              }}
            />
            \`\`\`
          `
        }
      }
    }
  });

  function handleSelect(event) {
    console.log('Avatar selecionado:', event.detail.item.name);
  }
</script>

{#snippet template(args: Args<typeof Story>)}
  <AvatarList {...args} on:select={handleSelect} />
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- Story padrão -->
<Story
  name="Padrão"
  args={{
    items: mockCompanies,
    size: 'md',
    gap: 'md'
  }}
/>

<!-- Story com avatares pequenos -->
<Story
  name="Avatares Pequenos"
  args={{
    items: mockCompanies,
    size: 'sm',
    gap: 'sm'
  }}
/>

<!-- Story com avatares grandes -->
<Story
  name="Avatares Grandes"
  args={{
    items: mockCompanies,
    size: 'lg',
    gap: 'lg'
  }}
/>

<!-- Story com espaçamento personalizado -->
<Story
  name="Espaçamento Grande"
  args={{
    items: mockCompanies,
    size: 'md',
    gap: 'lg'
  }}
/>