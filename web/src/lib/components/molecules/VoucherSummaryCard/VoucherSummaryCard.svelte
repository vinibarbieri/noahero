<script lang="ts">
  import { formatCurrency } from '$lib/utils/formatters';
  import { onMount } from 'svelte';

  // Props
  let {
    totalValue = 0,
    currency = 'R$',
    activeVouchers = 0,
    apiKey = '',
    onManageVouchers
  } = $props<{
    totalValue: number;
    currency?: string;
    activeVouchers: number;
    apiKey: string;
    onManageVouchers?: () => void;
  }>();

  // Estado local
  let isApiKeyVisible = $state(false);
  let maskedApiKey = $state('');

  // Mascarar a API key
  $effect(() => {
    if (apiKey) {
      const firstChars = apiKey.substring(0, 4);
      const lastChars = apiKey.substring(apiKey.length - 4);
      maskedApiKey = `${firstChars}...${lastChars}`;
    }
  });

  // Função para copiar a API key
  function copyApiKey() {
    navigator.clipboard.writeText(apiKey)
      .then(() => {
        alert('API key copiada para a área de transferência!');
      })
      .catch(err => {
        console.error('Erro ao copiar API key:', err);
      });
  }

  // Função para alternar a visibilidade da API key
  function toggleApiKeyVisibility() {
    isApiKeyVisible = !isApiKeyVisible;
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
  <div class="p-5">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resumo de Vouchers</h3>
    
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Valor Total</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalValue, currency)}</div>
      </div>
      
      <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Vouchers Ativos</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-white">{activeVouchers}</div>
      </div>
    </div>
    
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        API Key
      </label>
      <div class="flex items-center">
        <div class="relative flex-grow">
          <input 
            type={isApiKeyVisible ? "text" : "password"} 
            value={isApiKeyVisible ? apiKey : maskedApiKey}
            readonly
            class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          />
          <button 
            type="button"
            class="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            onclick={toggleApiKeyVisibility}
            aria-label={isApiKeyVisible ? "Ocultar API key" : "Mostrar API key"}
          >
            {#if isApiKeyVisible}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
            {/if}
          </button>
          <button 
            type="button"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            onclick={copyApiKey}
            aria-label="Copiar API key"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <button
      class="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow"
      onclick={onManageVouchers}
    >
      Gerenciar Vouchers
    </button>
  </div>
</div>
