<script context="module" lang="ts">
  import type { MiniApp } from '$lib/types';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';
  import { UserMiniApp } from './index';

  const mockMiniApp: MiniApp = {
    id: 'user-1',
    companyId: 'user',
    title: 'Perfil do Usuário',
    path: '/user'
  };

  const { Story } = defineMeta({
    title: 'MiniApps/UserMiniApp',
    component: UserMiniApp,
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
            O componente UserMiniApp é o miniapp para o perfil do usuário, exibindo:

            - Informações do usuário
            - Notificações
            - Configurações de conta
            
            Este componente é exibido quando o usuário clica no primeiro ícone da lista de avatares no AppLayout2.
          `
        }
      }
    }
  });
</script>

{#snippet template(args: Args<typeof Story>)}
  <div class="h-screen p-6 bg-gray-100 dark:bg-gray-900">
    <UserMiniApp
      miniApp={args.miniApp}
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
    miniApp: mockMiniApp
  }}
/>

<!-- Story com Tema Escuro -->
<Story
  name="Tema Escuro"
  args={{
    miniApp: mockMiniApp
  }}
  parameters={{
    backgrounds: {
      default: 'dark'
    }
  }}
/>
