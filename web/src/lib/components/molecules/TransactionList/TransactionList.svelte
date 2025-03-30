<script lang="ts">
  import { formatCurrency } from '$lib/utils/formatters';
  
  // Props
  let {
    transactions = [],
    title = 'Extrato de Transações',
    isOwner = false,
    onSeeMore,
    onTransactionClick
  } = $props<{
    transactions: Array<{
      id: string;
      name: string;
      icon?: string;
      verified: boolean;
      price: number;
      currency: string;
      volume: number;
      date: Date;
      type: 'buy' | 'sell' | 'transfer';
    }>;
    title?: string;
    isOwner?: boolean;
    onSeeMore?: () => void;
    onTransactionClick?: (id: string) => void;
  }>();
  
  // Filtrar transações com base no proprietário
  function getFilteredTransactions() {
    // Se for proprietário, mostrar todas as transações
    if (isOwner) {
      return transactions;
    }
    
    // Se for usuário comum, mostrar apenas as transações dele
    // Aqui estamos simulando isso mostrando apenas as 3 primeiras transações
    return transactions.slice(0, 3);
  }
  
  // Obter ícone para o tipo de transação
  function getTransactionTypeIcon(type: 'buy' | 'sell' | 'transfer') {
    switch (type) {
      case 'buy':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
          </svg>
        `;
      case 'sell':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clip-rule="evenodd" />
          </svg>
        `;
      case 'transfer':
        return `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
          </svg>
        `;
    }
  }
  
  // Manipular clique em uma transação
  function handleTransactionClick(id: string) {
    if (onTransactionClick) onTransactionClick(id);
  }
  
  // Manipular clique em "Ver mais"
  function handleSeeMore() {
    if (onSeeMore) onSeeMore();
  }
</script>

<div>
  <!-- Cabeçalho -->
  <div class="flex justify-between items-center mb-3">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
    <button 
      class="text-sm text-primary-600 dark:text-primary-400 flex items-center"
      onclick={handleSeeMore}
    >
      Ver mais
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
  
  <!-- Cabeçalho da tabela -->
  <div class="grid grid-cols-4 gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">
    <div>Coleção</div>
    <div class="text-right">Preço</div>
    <div class="text-right">Volume</div>
    <div class="text-right">Data</div>
  </div>
  
  <!-- Lista de transações -->
  <div class="space-y-3">
    {#each getFilteredTransactions() as transaction (transaction.id)}
      <div 
        class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 grid grid-cols-4 gap-2 items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        onclick={() => handleTransactionClick(transaction.id)}
      >
        <div class="flex items-center">
          <div class="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full mr-2 flex-shrink-0 flex items-center justify-center">
            {#if transaction.icon}
              <img src={transaction.icon} alt={transaction.name} class="w-full h-full object-cover rounded-full" />
            {:else}
              <div class="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                {transaction.name.charAt(0)}
              </div>
            {/if}
          </div>
          <div class="truncate">
            <div class="text-sm font-medium text-gray-900 dark:text-white flex items-center">
              {transaction.name}
              {#if transaction.verified}
                <svg class="w-3 h-3 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              {/if}
            </div>
          </div>
        </div>
        <div class="text-right text-sm font-medium text-gray-900 dark:text-white">
          {formatCurrency(transaction.price, transaction.currency)}
        </div>
        <div class="text-right text-sm font-medium text-gray-900 dark:text-white">
          {transaction.volume}
        </div>
        <div class="text-right text-sm text-gray-500 dark:text-gray-400 flex items-center justify-end">
          <span class="mr-1">{transaction.date.toLocaleDateString()}</span>
          {@html getTransactionTypeIcon(transaction.type)}
        </div>
      </div>
    {/each}
    
    {#if getFilteredTransactions().length === 0}
      <div class="py-8 text-center text-gray-500 dark:text-gray-400">
        Nenhuma transação encontrada.
      </div>
    {/if}
  </div>
</div>
