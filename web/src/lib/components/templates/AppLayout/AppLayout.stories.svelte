<script context="module" lang="ts">
  import cantinhodoce from '$lib/assets/cantinhodoce_logo.png';
  import casaarruda from '$lib/assets/casaarruda_logo.jpeg';
  import casasfreitas from '$lib/assets/casasfreitas_logo.png';
  import casasvidal from '$lib/assets/casasvidal_logo.png';
  import potiguar from '$lib/assets/potiguar_logo.webp';
  import terrazoo from '$lib/assets/terrazoo_logo.png';
  import { CompanyMiniApp } from '$lib/components/miniapps';
  import type { Company, MiniApp } from '$lib/types';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import AppLayout from './AppLayout.svelte';

  const mockCompanies: Company[] = [
    {
      id: '1',
      name: 'Cantinho Doce',
      icon: cantinhodoce,
      href: '#',
      status: 'story'
    },
    {
      id: '2',
      name: 'Casa Arruda',
      icon: casaarruda,
      href: '#',
      status: 'story'
    },
    {
      id: '3',
      name: 'Casas Freitas',
      icon: casasfreitas,
      href: '#',
      status: 'story'
    },
    {
      id: '4',
      name: 'Potiguar',
      icon: potiguar,
      href: '#',
      status: 'story'
    },
    {
      id: '5',
      name: 'Terra Zoo',
      icon: terrazoo,
      href: '#',
      status: 'story'
    },
    {
      id: '6',
      name: 'Casas Vidal',
      icon: casasvidal,
      href: '#',
      status: 'story'
    }
  ];

  const mockMiniApps: MiniApp[] = [
    {
      id: '1',
      companyId: '1',
      title: 'Cantinho Doce',
      path: '/cantinhodoce'
    },
    {
      id: '2',
      companyId: '2',
      title: 'Casa Arruda',
      path: '/casaarruda'
    },
    {
      id: '3',
      companyId: '3',
      title: 'Casas Freitas',
      path: '/casasfreitas'
    },
    {
      id: '4',
      companyId: '4',
      title: 'Potiguar',
      path: '/potiguar'
    },
    {
      id: '5',
      companyId: '5',
      title: 'Terra Zoo',
      path: '/terrazoo'
    },
    {
      id: '6',
      companyId: '6',
      title: 'Casas Vidal',
      path: '/casasvidal'
    }
  ];

  const { Story } = defineMeta({
    title: 'Templates/AppLayout',
    component: AppLayout,
    // tags: ['autodocs'], // Removido para usar o arquivo MDX personalizado
    parameters: {
      layout: 'fullscreen',
      backgrounds: {
        default: 'light',
        values: [
          { name: 'light', value: '#fafafa' },
          { name: 'dark', value: '#09090b' }
        ]
      },
      docs: {
        description: {
          component: `
            O componente AppLayout é o template principal da aplicação, responsável por:

            - Organizar a estrutura básica da interface
            - Gerenciar a sidebar e área de conteúdo
            - Controlar o layout responsivo
            - Gerenciar o estado de seleção das empresas
            - Navegação entre miniapps

            ### Características

            - Layout responsivo (desktop/mobile)
            - Sidebar colapsável no mobile
            - Overlay para fechar a sidebar no mobile
            - Suporte a temas claro/escuro
            - Sistema de navegação entre miniapps
            - Histórico de navegação
          `
        }
      }
    }
  });
</script>

{#snippet miniappContent(currentMiniApp: MiniApp | null)}
  {#if currentMiniApp}
    <CompanyMiniApp
      miniApp={currentMiniApp}
      company={mockCompanies.find(c => c.id === currentMiniApp.companyId) || mockCompanies[0]}
    />
  {/if}
{/snippet}

{#snippet defaultContent()}
  <div class="h-full flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Bem-vindo!</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Selecione uma empresa na sidebar para começar
      </p>
    </div>
  </div>
{/snippet}

{#snippet template(args: Args<typeof Story>)}
  <AppLayout
    companies={args.companies || []}
    miniApps={args.miniApps || []}
    children={{
      miniapp: miniappContent,
      default: defaultContent
    }}
  />
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- Story Desktop -->
<Story
  name="Desktop"
  args={{
    companies: mockCompanies,
    miniApps: mockMiniApps
  }}
/>

<!-- Story Mobile -->
<Story
  name="Mobile"
  args={{
    companies: mockCompanies,
    miniApps: mockMiniApps
  }}
  parameters={{
    viewport: {
      defaultViewport: 'mobile1'
    }
  }}
/>

<!-- Story Dark Theme -->
<Story
  name="Dark Theme"
  args={{
    companies: mockCompanies,
    miniApps: mockMiniApps
  }}
  parameters={{
    backgrounds: {
      default: 'dark'
    }
  }}
/>
