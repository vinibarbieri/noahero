<script context="module" lang="ts">
  import cantinhodoce from '$lib/assets/cantinhodoce_logo.png';
  import casaarruda from '$lib/assets/casaarruda_logo.jpeg';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import ProfileHeader from './ProfileHeader.svelte';

  const { Story } = defineMeta({
    title: 'Organisms/ProfileHeader',
    component: ProfileHeader,
    tags: ['autodocs'],
    argTypes: {
      name: {
        control: 'text',
        description: 'Nome completo da empresa ou usuário'
      },
      username: {
        control: 'text',
        description: 'Nome de usuário (handle) da empresa ou usuário'
      },
      avatarUrl: {
        control: 'text',
        description: 'URL da imagem do avatar'
      },
      isVerified: {
        control: 'boolean',
        description: 'Indica se o perfil é verificado'
      },
      postsCount: {
        control: 'number',
        description: 'Número de posts'
      },
      followersCount: {
        control: 'number',
        description: 'Número de seguidores'
      },
      followingCount: {
        control: 'number',
        description: 'Número de perfis seguidos'
      },
      voucherBalance: {
        control: 'number',
        description: 'Saldo de vouchers disponível'
      },
      voucherCurrency: {
        control: 'text',
        description: 'Símbolo da moeda dos vouchers'
      },
      bio: {
        control: 'text',
        description: 'Biografia ou descrição do perfil'
      },
      status: {
        control: { type: 'select' },
        options: ['none', 'story', 'live'],
        description: 'Status do perfil (nenhum, story, ao vivo)'
      },
      isOwnProfile: {
        control: 'boolean',
        description: 'Indica se o perfil sendo visualizado é do próprio usuário'
      }
    },
    args: {
      onFollowClick: fn(),
      onEditProfileClick: fn(),
      onShareProfileClick: fn(),
      onEditAvatarClick: fn()
    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente ProfileHeader exibe as informações de perfil de uma empresa ou usuário.
            
            ### Características
            
            - Layout responsivo para diferentes tamanhos de tela
            - Exibição de avatar, nome, username e badge de verificação
            - Estatísticas de posts, seguidores e seguindo
            - Exibição de saldo de vouchers disponível
            - Bio e links acessíveis via dialog ao clicar no username
            - Botões de ação adaptáveis ao contexto (próprio perfil vs. perfil de terceiros)
            - Suporte a edição de avatar para o próprio perfil
            
            ### Modos de Visualização
            
            O componente tem dois modos principais:
            
            1. **Visualização do próprio perfil** (\`isOwnProfile=true\`):
               - Mostra botões "Editar perfil" e "Compartilhar"
               - Exibe botão de edição de avatar
               - Mostra saldo como "Your Balance"
            
            2. **Visualização de perfil de terceiros** (\`isOwnProfile=false\`):
               - Mostra botões "Seguir" e "Mensagem"
               - Não exibe botão de edição de avatar
               - Mostra saldo como "Available"
          `
        }
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <div class="p-4 max-w-3xl mx-auto">
    <ProfileHeader {...args} />
  </div>
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- Perfil de empresa (visualização de visitante) -->
<Story
  name="Perfil de Empresa (Visitante)"
  args={{
    name: "Cantinho Doce",
    username: "cantinhodoce",
    avatarUrl: cantinhodoce,
    isVerified: true,
    postsCount: 641,
    followersCount: 23400,
    followingCount: 3861,
    voucherBalance: 4259.32,
    voucherCurrency: "$",
    bio: "Doces artesanais e bolos para festas 🍰\nEntrega em todo o Brasil 🚚\nPedidos via WhatsApp",
    links: [
      { url: "https://cantinhodoce.com.br", text: "cantinhodoce.com.br" },
      { url: "https://wa.me/5511999999999", text: "WhatsApp" }
    ],
    status: "none",
    isOwnProfile: false
  }}
/>

<!-- Perfil próprio (visualização do proprietário) -->
<Story
  name="Perfil Próprio (Proprietário)"
  args={{
    name: "Casa Arruda",
    username: "casaarruda",
    avatarUrl: casaarruda,
    isVerified: true,
    postsCount: 215,
    followersCount: 5678,
    followingCount: 432,
    voucherBalance: 15750.50,
    voucherCurrency: "R$",
    bio: "Móveis e decoração para sua casa 🏠\nDesde 1985 trazendo qualidade e estilo para seu lar\nLoja física: Av. Principal, 123 - Centro",
    links: [
      { url: "https://casaarruda.com.br", text: "casaarruda.com.br" },
      { url: "https://instagram.com/casaarruda", text: "Instagram" }
    ],
    status: "story",
    isOwnProfile: true
  }}
/>

<!-- Perfil sem saldo -->
<Story
  name="Perfil Sem Saldo"
  args={{
    name: "Loja Exemplo",
    username: "lojaexemplo",
    isVerified: false,
    postsCount: 87,
    followersCount: 1234,
    followingCount: 567,
    voucherBalance: 0,
    voucherCurrency: "$",
    bio: "Loja de exemplo para demonstração",
    links: [
      { url: "https://exemplo.com", text: "exemplo.com" }
    ],
    status: "none",
    isOwnProfile: false
  }}
/>

<!-- Perfil com status ao vivo -->
<Story
  name="Perfil Ao Vivo"
  args={{
    name: "Loja Promoções",
    username: "lojapromos",
    isVerified: true,
    postsCount: 320,
    followersCount: 8700,
    followingCount: 145,
    voucherBalance: 3500.00,
    voucherCurrency: "$",
    bio: "As melhores promoções da cidade!",
    links: [
      { url: "https://lojapromos.com", text: "lojapromos.com" }
    ],
    status: "live",
    isOwnProfile: false
  }}
/>
