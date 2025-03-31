<script lang="ts">
  import { Dialog } from '$lib/components/molecules/Dialog';
  import { VoucherGrid } from '$lib/components/molecules/VoucherGrid';
  import { TransactionList } from '$lib/components/molecules/TransactionList';
  import { formatCurrency } from '$lib/utils/formatters';

  // Props
  let {
    isOpen = false,
    onClose,
    vouchers = [],
    transactions = [],
    currency = 'R$',
    totalValue = 0
  } = $props<{
    isOpen: boolean;
    onClose?: () => void;
    vouchers: Array<{
      id: string;
      name: string;
      image: string;
      price?: number;
      timeRemaining?: string;
      notForSale?: boolean;
    }>;
    transactions: Array<{
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
    currency?: string;
    totalValue: number;
  }>();

  // Estado local
  let activeTab = $state('vouchers');
</script>

<Dialog
  isOpen={isOpen}
  title="Gerenciamento de Vouchers"
  onClose={onClose}
  size="lg"
>
  <div class="p-4">
    <!-- Resumo -->
    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 flex justify-between items-center">
      <div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Valor Total de Vouchers</div>
        <div class="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalValue, currency)}</div>
      </div>
      <div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Vouchers Ativos</div>
        <div class="text-xl font-bold text-gray-900 dark:text-white text-center">{vouchers.length}</div>
      </div>
      <div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Transações</div>
        <div class="text-xl font-bold text-gray-900 dark:text-white text-center">{transactions.length}</div>
      </div>
    </div>
    
    <!-- Abas -->
    <div class="flex border-b border-gray-200 dark:border-gray-700 mb-4">
      <button
        type="button"
        class="px-4 py-2 font-medium text-sm {activeTab === 'vouchers' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 dark:text-gray-400'}"
        onclick={() => activeTab = 'vouchers'}
      >
        Vouchers Ativos
      </button>
      <button
        type="button"
        class="px-4 py-2 font-medium text-sm {activeTab === 'transactions' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 dark:text-gray-400'}"
        onclick={() => activeTab = 'transactions'}
      >
        Histórico de Transações
      </button>
    </div>
    
    <!-- Conteúdo das abas -->
    <div class="overflow-y-auto max-h-[60vh]">
      {#if activeTab === 'vouchers'}
        <VoucherGrid
          vouchers={vouchers}
          title=""
          onVoucherClick={(id) => console.log('Voucher clicado:', id)}
        />
      {:else if activeTab === 'transactions'}
        <TransactionList
          transactions={transactions}
          title=""
        />
      {/if}
    </div>
    
    <!-- Ações -->
    <div class="mt-6 flex justify-end space-x-3 border-t border-gray-200 dark:border-gray-700 pt-4">
      <button
        class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg text-sm font-medium transition-colors"
        onclick={onClose}
      >
        Fechar
      </button>
      <button
        class="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow"
        onclick={() => console.log('Criar novo voucher')}
      >
        Criar Novo Voucher
      </button>
    </div>
  </div>
</Dialog>
