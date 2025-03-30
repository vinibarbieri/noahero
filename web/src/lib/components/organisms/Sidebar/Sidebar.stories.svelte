<script lang="ts" module>
  import type { Company } from '$lib/types';
  import { mockCompanies } from '$lib/utils/mock';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { Sidebar } from './index';

  const { Story } = defineMeta({
    title: 'Organisms/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    argTypes: {
      companies: {
        control: 'object',
        description: 'Array de empresas para exibir na sidebar'
      },
      selectedCompanyId: {
        control: 'text',
        description: 'ID da empresa selecionada'
      },
      isOpen: {
        control: 'boolean',
        description: 'Controla se a sidebar está aberta (apenas para mobile)'
      },
      isMobile: {
        control: 'boolean',
        description: 'Define se o componente está em modo mobile'
      }
    },
    parameters: {
      docs: {
        description: {
          component: `
            O componente Sidebar é inspirado na interface do Discord, exibindo uma barra lateral
            com avatares das empresas parceiras. Cada avatar pode ter diferentes estados (story, live)
            e a sidebar é totalmente responsiva.

            ### Características

            - Layout responsivo (desktop/mobile)
            - Animações suaves
            - Suporte a temas claro/escuro
            - Estados de story/live para empresas
            - Scrollbar customizada
            - Botão de toggle no mobile

            ### Eventos

            - \`select\`: Disparado quando uma empresa é selecionada
            - \`toggle\`: Disparado quando a sidebar é aberta/fechada no mobile

            ### Uso

            \`\`\`svelte
            <Sidebar
              companies={[
                { id: '1', name: 'Empresa A', icon: '/logo.png', href: '/empresa-a', status: 'story' }
              ]}
              selectedCompanyId="1"
              isOpen={true}
              isMobile={false}
              on:select={(event) => {
                const company = event.detail.company;
                // Faça algo com a empresa selecionada
              }}
              on:toggle={(event) => {
                const isOpen = event.detail.isOpen;
                // Atualize o estado da sidebar
              }}
            />
            \`\`\`
          `
        }
      },
      layout: 'fullscreen'
    }
  });

  function handleSelect(event: CustomEvent<{ company: Company }>) {
    console.log('Empresa selecionada:', event.detail.company);
  }

  function handleToggle(event: CustomEvent<{ isOpen: boolean }>) {
    console.log('Sidebar toggle:', event.detail.isOpen);
  }
</script>

{#snippet template(args: Args<typeof Story>)}
  <Sidebar
    {...args}
    on:select={handleSelect}
    on:toggle={handleToggle}
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
    selectedCompanyId: '1',
    isOpen: true,
    isMobile: false
  }}
/>

<!-- Story Mobile -->
<Story
  name="Mobile"
  args={{
    companies: mockCompanies,
    selectedCompanyId: '1',
    isOpen: true,
    isMobile: true
  }}
/>

<!-- Story Mobile Fechada -->
<Story
  name="Mobile Fechada"
  args={{
    companies: mockCompanies,
    selectedCompanyId: '1',
    isOpen: false,
    isMobile: true
  }}
/>