<script lang="ts">
  import { AppLayout2 } from '$lib/components/templates/AppLayout2';
  import type { MiniApp } from '$lib/types';
  import { mockCompanies, mockMiniApps } from '$lib/utils/mock';

  // Mock do MiniApp do usuário
  const userMiniApp: MiniApp = {
    id: 'user-profile',
    companyId: 'user',
    title: 'Perfil do Usuário',
    path: '/profile'
  };
</script>

<AppLayout2
  companies={mockCompanies}
  miniApps={mockMiniApps}
  userMiniApp={userMiniApp}
>
  {#snippet userProfile(miniApp: MiniApp)}
    <div>
      <h1 class="text-2xl font-bold mb-4">{miniApp.title}</h1>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 class="text-xl font-semibold mb-2">Configurações do Usuário</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <h3 class="font-medium">Perfil</h3>
              <p class="text-sm text-gray-500">Editar informações pessoais</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-medium">Segurança</h3>
              <p class="text-sm text-gray-500">Gerenciar senhas e autenticação</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-medium">Notificações</h3>
              <p class="text-sm text-gray-500">Configurar preferências de notificação</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/snippet}

  {#snippet miniapp(miniApp: MiniApp)}
    <div>
      <h1 class="text-2xl font-bold mb-4">{miniApp.title}</h1>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <p>Conteúdo do MiniApp: {miniApp.path}</p>

        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="h-32 bg-gray-100 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
          <div class="h-32 bg-gray-100 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
          <div class="h-32 bg-gray-100 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
          <div class="h-32 bg-gray-100 dark:bg-neutral-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  {/snippet}

  <div class="flex items-center justify-center h-full">
    <div class="text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-4 text-gray-400">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h2 class="text-xl font-semibold mb-2">Selecione uma empresa</h2>
      <p class="text-gray-500">Escolha uma empresa na barra lateral para visualizar seu conteúdo</p>
    </div>
  </div>
</AppLayout2>
