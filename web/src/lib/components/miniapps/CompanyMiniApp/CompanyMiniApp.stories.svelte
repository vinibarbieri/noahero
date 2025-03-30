<script context="module" lang="ts">
  import cantinhodoce from '$lib/assets/cantinhodoce_logo.png';
  import terrazoo from '$lib/assets/terrazoo_logo.png';
  import type { Company, MiniApp } from '$lib/types';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { CompanyMiniApp } from './index';

  const mockCompany: Company = {
    id: '1',
    name: 'Cantinho Doce',
    icon: cantinhodoce,
    href: '#',
    status: 'active'
  };

  const mockMiniApp: MiniApp = {
    id: '1',
    companyId: '1',
    title: 'Dashboard',
    path: '/cantinhodoce'
  };

  const { Story } = defineMeta({
    title: 'MiniApps/CompanyMiniApp',
    component: CompanyMiniApp,
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
            O componente CompanyMiniApp é o miniapp padrão para empresas, exibindo:

            - Informações básicas da empresa
            - Análises e métricas
            - Configurações

            Este componente é exibido quando o usuário seleciona uma empresa no AppLayout.
          `
        }
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <div class="h-screen bg-gray-50">
    <CompanyMiniApp
      miniApp={args.miniApp || mockMiniApp}
      company={args.company || mockCompany}
    />
  </div>
{/snippet}

<script>
  import { setTemplate } from '@storybook/addon-svelte-csf';
  setTemplate(template);
</script>

<!-- Story Padrão -->
<Story
  name="Padrão"
  args={{
    miniApp: mockMiniApp,
    company: mockCompany
  }}
/>

<!-- Story com Empresa Diferente -->
<Story
  name="Terra Zoo"
  args={{
    miniApp: {
      id: '5',
      companyId: '5',
      title: 'Dashboard',
      path: '/terrazoo'
    },
    company: {
      id: '5',
      name: 'Terra Zoo',
      icon: terrazoo,
      href: '#',
      status: 'active'
    }
  }}
/>

<!-- Story com Tema Escuro -->
<Story
  name="Tema Escuro"
  args={{
    miniApp: mockMiniApp,
    company: mockCompany
  }}
  parameters={{
    backgrounds: {
      default: 'dark'
    }
  }}
/>
