<script lang="ts">
  import { BalanceDialog } from '$lib/components/organisms/BalanceDialog';
  import { getUserContext } from '$lib/contexts/UserContext';
  import { formatCurrency } from '$lib/utils/formatters';

  // Props
  let {
    balance = 0,
    currency = 'R$',
    title = 'Your Balance',
    showIcon = true,
    percentChange = 0,
    valueChange = 0,
    isOwner = false,
    vouchers = [],
    transactions = []
  } = $props<{
    balance: number;
    currency?: string;
    title?: string;
    showIcon?: boolean;
    percentChange?: number;
    valueChange?: number;
    isOwner?: boolean;

    vouchers?: Array<{
      id: string;
      name: string;
      image?: string;
      price?: number;
      timeRemaining?: string;
      notForSale?: boolean;
    }>;
    transactions?: Array<{
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
  }>();

  // Estado local
  let isDialogOpen = $state(false);

  // Obter o contexto do usuário
  const userContext = getUserContext();
  let contextIsOwner = $state(false);

  // Subscrever às mudanças no contexto
  $effect(() => {
    const unsubscribe = userContext.isOwner.subscribe(value => {
      contextIsOwner = value;
      console.log('BalanceCard contextIsOwner atualizado:', contextIsOwner);
    });

    return unsubscribe;
  });

  // Determinar se é proprietário com base no contexto ou no prop
  $effect(() => {
    // Se isOwner for explicitamente passado como prop, ele tem prioridade
    // Caso contrário, usamos o valor do contexto
    if (isOwner !== undefined) {
      console.log('BalanceCard usando isOwner do prop:', isOwner);
    } else {
      isOwner = contextIsOwner;
      console.log('BalanceCard usando isOwner do contexto:', isOwner);
    }
  });

  // Abrir o dialog
  function openDialog() {
    isDialogOpen = true;
  }

  // Fechar o dialog
  function closeDialog() {
    isDialogOpen = false;
  }
</script>

<button
  class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 w-full h-full flex flex-col justify-center cursor-pointer hover:shadow-md transition-shadow text-left"
  onclick={openDialog}
  onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && openDialog()}
  aria-label="Ver detalhes do saldo"
>
  <div class="flex items-center gap-1 mb-0.5 text-gray-500 dark:text-gray-400">
    {#if showIcon}
      <div class="w-5 h-5 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
        </svg>
      </div>
    {/if}
    <span class="text-xs font-medium truncate">{title}</span>
  </div>

  <div class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
    {formatCurrency(balance, currency)}
  </div>
</button>

<!-- Balance Dialog -->
<BalanceDialog
  isOpen={isDialogOpen}
  onClose={closeDialog}
  balance={balance}
  currency={currency}
  percentChange={percentChange}
  valueChange={valueChange}
  isOwner={isOwner}

  vouchers={vouchers}
  transactions={transactions}
/>