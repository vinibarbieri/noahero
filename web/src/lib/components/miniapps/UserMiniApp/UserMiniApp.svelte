<script lang="ts">
  import { onMount } from 'svelte';
  import type { MiniApp } from '$lib/types';
  
  // Props
  let { miniApp } = $props<{
    miniApp: MiniApp;
  }>();
  
  // State
  let activeTab = $state('profile');
  let user = $state({
    name: 'João Silva',
    email: 'joao.silva@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    role: 'Administrador',
    lastLogin: '2023-05-15T10:30:00Z'
  });
  
  // Lifecycle
  onMount(() => {
    console.log('UserMiniApp mounted', { miniApp });
  });
  
  // Functions
  function handleTabChange(tab: string) {
    activeTab = tab;
  }
  
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
</script>

<div class="h-full flex flex-col">
  <!-- Header -->
  <div class="flex items-center gap-4 mb-6">
    <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <img src={user.avatar} alt={user.name} class="w-full h-full object-cover" />
    </div>
    <div>
      <h1 class="text-2xl font-bold">{user.name}</h1>
      <p class="text-gray-500 dark:text-gray-400">{user.role}</p>
    </div>
  </div>
  
  <!-- Tabs -->
  <div class="border-b border-gray-200 dark:border-gray-700 mb-6">
    <nav class="flex space-x-8">
      <button 
        class="py-2 px-1 border-b-2 font-medium text-sm {activeTab === 'profile' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
        onclick={() => handleTabChange('profile')}
        aria-label="Profile tab"
      >
        Perfil
      </button>
      <button 
        class="py-2 px-1 border-b-2 font-medium text-sm {activeTab === 'notifications' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
        onclick={() => handleTabChange('notifications')}
        aria-label="Notifications tab"
      >
        Notificações
      </button>
      <button 
        class="py-2 px-1 border-b-2 font-medium text-sm {activeTab === 'settings' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}"
        onclick={() => handleTabChange('settings')}
        aria-label="Settings tab"
      >
        Configurações
      </button>
    </nav>
  </div>
  
  <!-- Content -->
  <div class="flex-1 overflow-auto">
    {#if activeTab === 'profile'}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium mb-4">Informações do Usuário</h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">Nome:</span>
              <span>{user.name}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">Email:</span>
              <span>{user.email}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">Função:</span>
              <span>{user.role}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500 dark:text-gray-400">Último acesso:</span>
              <span>{formatDate(user.lastLogin)}</span>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium mb-4">Atividade Recente</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p class="text-sm">Login realizado</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Hoje, 10:30</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <p class="text-sm">Perfil atualizado</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Ontem, 15:45</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
              <div>
                <p class="text-sm">Novo relatório acessado</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">3 dias atrás</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 md:col-span-2">
          <h2 class="text-lg font-medium mb-4">Resumo</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Este é o miniapp de usuário. Aqui você pode visualizar e gerenciar suas informações pessoais,
            notificações e configurações de conta.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 class="font-medium mb-2">Empresas</h3>
              <p class="text-2xl font-bold">6</p>
              <p class="text-xs text-green-600 dark:text-green-400">Acesso total</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 class="font-medium mb-2">Projetos</h3>
              <p class="text-2xl font-bold">12</p>
              <p class="text-xs text-blue-600 dark:text-blue-400">4 ativos</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 class="font-medium mb-2">Notificações</h3>
              <p class="text-2xl font-bold">3</p>
              <p class="text-xs text-orange-600 dark:text-orange-400">1 não lida</p>
            </div>
          </div>
        </div>
      </div>
    {:else if activeTab === 'notifications'}
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-medium mb-6">Notificações</h2>
        <div class="space-y-4">
          <div class="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
            <div class="flex justify-between">
              <h3 class="font-medium">Atualização do Sistema</h3>
              <span class="text-xs text-gray-500 dark:text-gray-400">Hoje</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Uma nova versão do sistema está disponível. Clique para saber mais.
            </p>
          </div>
          
          <div class="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 rounded-r-lg">
            <div class="flex justify-between">
              <h3 class="font-medium">Relatório Concluído</h3>
              <span class="text-xs text-gray-500 dark:text-gray-400">Ontem</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              O relatório mensal foi gerado com sucesso e está disponível para download.
            </p>
          </div>
          
          <div class="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 rounded-r-lg opacity-60">
            <div class="flex justify-between">
              <h3 class="font-medium">Lembrete de Reunião</h3>
              <span class="text-xs text-gray-500 dark:text-gray-400">3 dias atrás</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Reunião de equipe agendada para amanhã às 14h.
            </p>
          </div>
        </div>
        
        <div class="mt-6 text-center">
          <button class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Ver todas as notificações
          </button>
        </div>
      </div>
    {:else if activeTab === 'settings'}
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-medium mb-6">Configurações</h2>
        <div class="space-y-6">
          <div>
            <label for="user-name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome
            </label>
            <input
              type="text"
              id="user-name"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={user.name}
            />
          </div>
          
          <div>
            <label for="user-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="user-email"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={user.email}
            />
          </div>
          
          <div>
            <label for="user-language" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Idioma
            </label>
            <select
              id="user-language"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="pt-BR" selected>Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es">Español</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Preferências de Notificação
            </label>
            <div class="space-y-2">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="notify-email"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked
                />
                <label for="notify-email" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Receber notificações por email
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="notify-system"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked
                />
                <label for="notify-system" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Receber notificações no sistema
                </label>
              </div>
            </div>
          </div>
          
          <div class="pt-4">
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
