<script lang="ts">
  import FullPageDialog from '$lib/components/molecules/FullPageDialog/FullPageDialog.svelte';
  import { TransactionList } from '$lib/components/molecules/TransactionList';
  import { VoucherCarousel } from '$lib/components/molecules/VoucherCarousel';
  import { VoucherGrid } from '$lib/components/molecules/VoucherGrid';
  import { getVoucherContext } from '$lib/contexts/VoucherContext';
  import { formatCurrency } from '$lib/utils/formatters';

  // Props
  let {
    isOpen = false,
    onClose,
    balance = 0,
    currency = 'R$',
    percentChange = 0,
    valueChange = 0,
    isOwner = false,
    cardNumber = '4567',
    vouchers = [],
    transactions = []
  } = $props<{
    isOpen: boolean;
    onClose?: () => void;
    balance: number;
    currency?: string;
    percentChange?: number;
    valueChange?: number;
    isOwner?: boolean;
    cardNumber?: string;
    vouchers?: Array<{
      id: string;
      name: string;
      image: string;
      price?: number;
      timeRemaining?: string;
      notForSale?: boolean;
    }>;
    transactions?: Array<{
      id: string;
      name: string;
      icon: string;
      verified: boolean;
      price: number;
      currency: string;
      volume: number;
      date: Date;
      type: 'buy' | 'sell' | 'transfer';
    }>;
  }>();

  // Estado local
  let activeTab = $state('vouchers');

  // Obter o contexto de vouchers
  const voucherContext = getVoucherContext();

  // Se não houver vouchers ou transações fornecidos, use os dados do contexto
  $effect(() => {
    if (!vouchers || vouchers.length === 0) {
      const contextVouchers = voucherContext.vouchers;
      if (contextVouchers) {
        contextVouchers.subscribe(value => {
          vouchers = value;
        });
      }
    }

    if (!transactions || transactions.length === 0) {
      const contextTransactions = voucherContext.transactions;
      if (contextTransactions) {
        contextTransactions.subscribe(value => {
          transactions = value;
        });
      }
    }
  });

  // Formatar número de cartão
  function formatCardNumber(number: string): string {
    return `•••• •••• •••• ${number}`;
  }

  // Determinar a cor do percentual de mudança
  function getChangeColor(value: number): string {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-gray-500';
  }

  // Formatar percentual de mudança
  function formatPercentChange(value: number): string {
    const prefix = value > 0 ? '+' : '';
    return `${prefix}${value.toFixed(1)}%`;
  }


</script>

<FullPageDialog
  isOpen={isOpen}
  title="Saldo"
  onClose={onClose}
  isMobileFullPage={true}
>
  <div class="flex flex-col h-full">
    <!-- Cabeçalho com saldo -->
    <div class="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-5 mb-6">
      <div class="text-sm text-gray-600 dark:text-gray-300 mb-1">Saldo da Conta</div>
      <div class="flex items-baseline">
        <div class="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(balance, currency)}</div>
        <button class="ml-2 text-gray-500 dark:text-gray-400" aria-label="Mostrar saldo">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      <div class="flex items-center mt-1">
        <div class="text-sm font-medium text-gray-600 dark:text-gray-300">{formatCardNumber(cardNumber)}</div>
        <button class="ml-2 text-gray-500 dark:text-gray-400" aria-label="Copiar número do cartão">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
            <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
          </svg>
        </button>
      </div>
      <div class="flex items-center mt-2">
        <div class="text-sm font-medium {getChangeColor(valueChange)}">
          {valueChange > 0 ? '+' : ''}{formatCurrency(valueChange, currency)}
        </div>
        <div class="text-sm font-medium {getChangeColor(percentChange)} ml-2">
          {formatPercentChange(percentChange)}
        </div>
      </div>
    </div>

    <!-- Abas -->
    <div class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
      <button
        type="button"
        class="px-4 py-2 font-medium text-sm {activeTab === 'vouchers' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 dark:text-gray-400'}"
        onclick={() => activeTab = 'vouchers'}
      >
        Vouchers Disponíveis
      </button>
      <button
        type="button"
        class="px-4 py-2 font-medium text-sm {activeTab === 'transactions' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 dark:text-gray-400'}"
        onclick={() => activeTab = 'transactions'}
      >
        Transações
      </button>
    </div>

    <!-- Conteúdo das abas -->
    {#if activeTab === 'vouchers'}
      <!-- Vouchers (Featured) -->
      <div class="md:hidden">
        <VoucherCarousel
          vouchers={vouchers}
          title="NFTs Disponíveis"
          onVoucherClick={(id) => console.log('NFT clicado:', id)}
          onSeeMore={() => console.log('Ver mais NFTs')}
        />
      </div>
      <div class="hidden md:block">
        <VoucherGrid
          vouchers={vouchers}
          title="NFTs Disponíveis"
          columns={3}
          onVoucherClick={(id: string) => console.log('NFT clicado:', id)}
          onSeeMore={() => console.log('Ver mais NFTs')}
        />
      </div>
    {:else}
      <!-- Transações (Top Collection) -->
      <TransactionList
        transactions={transactions}
        title="Extrato de Transações"
        isOwner={isOwner}
        onTransactionClick={(id) => console.log('Transação clicada:', id)}
        onSeeMore={() => console.log('Ver mais transações')}
      />
    {/if}
  </div>
</FullPageDialog>
