<script module lang="ts">
  import cantinhodoce from '$lib/assets/cantinhodoce_logo.png';
  import casaarruda from '$lib/assets/casaarruda_logo.jpeg';
  import casasfreitas from '$lib/assets/casasfreitas_logo.png';
  import casasvidal from '$lib/assets/casasvidal_logo.png';
  import potiguar from '$lib/assets/potiguar_logo.webp';
  import terrazoo from '$lib/assets/terrazoo_logo.png';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import Avatar from './Avatar.svelte';

  // Definindo a configuração do story
  const { Story } = defineMeta({
    title: 'Atoms/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {
      name: {
        control: 'text',
        description: 'Nome da empresa ou usuário que será exibido como tooltip e usado para gerar as iniciais quando não houver ícone'
      },
      icon: {
        control: 'text',
        description: 'URL da imagem do avatar. **Importante:** A imagem deve ser quadrada (1:1) com dimensões mínimas de 48x48px e máximas de 96x96px. Formatos suportados: PNG, JPG, JPEG, WebP'
      },
      href: {
        control: 'text',
        description: 'Link opcional para navegação ao clicar no avatar'
      },
      isActive: {
        control: 'boolean',
        description: 'Indica se o avatar está selecionado/ativo'
      },
      size: {
        control: { type: 'select' },
        options: ['sm', 'md', 'lg'],
        description: 'Tamanho do avatar: sm (32px), md (40px) ou lg (48px)'
      }
    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente Avatar é usado para exibir uma imagem de perfil ou logo de empresa na barra lateral.

            ### Recomendações para Imagens

            Para garantir a melhor aparência do avatar, siga estas diretrizes:

            - Use imagens quadradas (proporção 1:1)
            - Dimensões recomendadas:
              - Mínimo: 48x48px
              - Ideal: 96x96px (2x para telas retina)
              - Máximo: 144x144px (3x para telas retina)
            - Formatos suportados: PNG, JPG, JPEG, WebP
            - Para logos, use preferencialmente PNG com fundo transparente
            - Otimize as imagens para web antes de usar
          `
        }
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <Avatar {...args} />
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- Story com logo do Cantinho Doce -->
<Story
  name="Cantinho Doce"
  args={{
    name: 'Cantinho Doce',
    icon: cantinhodoce,
    href: '#'
  }}
>
  {#snippet children(args: Args<typeof Story>)}
    <Avatar {...args} />
  {/snippet}
</Story>

<!-- Story com logo do Potiguar -->
<Story
  name="Potiguar"
  args={{
    name: 'Potiguar',
    icon: potiguar,
    href: '#'
  }}
/>

<!-- Story com logo do Terra Zoo (ativo) -->
<Story
  name="Terra Zoo"
  args={{
    name: 'Terra Zoo',
    icon: terrazoo,
    href: '#',
    isActive: true
  }}
/>

<!-- Story com logo da Casa Arruda (pequeno) -->
<Story
  name="Casa Arruda"
  args={{
    name: 'Casa Arruda',
    icon: casaarruda,
    size: 'sm'
  }}
/>

<!-- Story com logo da Casas Freitas (médio) -->
<Story
  name="Casas Freitas"
  args={{
    name: 'Casas Freitas',
    icon: casasfreitas,
    size: 'md'
  }}
/>

<!-- Story com logo da Casas Vidal (grande) -->
<Story
  name="Casas Vidal"
  args={{
    name: 'Casas Vidal',
    icon: casasvidal,
    size: 'lg'
  }}
/>