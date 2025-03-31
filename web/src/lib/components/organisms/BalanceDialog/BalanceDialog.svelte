<script lang="ts">
	import { CheckoutDialog } from '$lib/components/molecules/CheckoutDialog';
	import FullPageDialog from '$lib/components/molecules/FullPageDialog/FullPageDialog.svelte';
	import { TransactionList } from '$lib/components/molecules/TransactionList';
	import { VoucherCarousel } from '$lib/components/molecules/VoucherCarousel';
	import { VoucherGrid } from '$lib/components/molecules/VoucherGrid';
	import { VoucherSummaryCard } from '$lib/components/molecules/VoucherSummaryCard';
	import { VoucherManagementDialog } from '$lib/components/organisms/VoucherManagementDialog';
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
  let isCheckoutDialogOpen = $state(false);
  let isVoucherManagementDialogOpen = $state(false);

  // API key de exemplo (em produção, isso viria do backend)
  const apiKey = "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"  

  // Calcular o valor total dos vouchers
  let totalVoucherValue = $derived(vouchers.reduce((total: number, voucher: any) => total + (voucher.price || 0), 0));

  // Log para depuração
  console.log('BalanceDialog isOwner:', isOwner);

  // Efeito para atualizar quando o dialog é aberto
  $effect(() => {
    if (isOpen) {
      console.log('BalanceDialog aberto com isOwner:', isOwner);
    }
  });

  // Abrir o dialog de checkout
  function openCheckoutDialog() {
    isCheckoutDialogOpen = true;
  }

  // Fechar o dialog de checkout
  function closeCheckoutDialog() {
    isCheckoutDialogOpen = false;
  }

  // Abrir o dialog de gerenciamento de vouchers
  function openVoucherManagementDialog() {
    isVoucherManagementDialogOpen = true;
  }

  // Fechar o dialog de gerenciamento de vouchers
  function closeVoucherManagementDialog() {
    isVoucherManagementDialogOpen = false;
  }

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
    <div class="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 rounded-xl p-5 mb-6 shadow-sm dark:shadow-md">
      <div class="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {#if isOwner}
          Saldo disponível para cashback
        {:else}
          Coins Disponíveis
        {/if}
      </div>
      <div class="flex items-baseline mb-3">
        <div class="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(balance, currency)}</div>
      </div>

      <!-- Botão de Recarregar/Comprar -->
      <div class="mb-3">
        <button
          class="px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow"
          onclick={() => openCheckoutDialog()}
        >
          {#if isOwner}
            Recarregar
          {:else}
            Comprar
          {/if}
        </button>
      </div>
      <div class="flex items-center">
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
      {#if isOwner}
        <!-- Resumo de Vouchers para proprietário -->
        <VoucherSummaryCard
          totalValue={totalVoucherValue}
          currency={currency}
          activeVouchers={vouchers.length}
          apiKey={apiKey}
          onManageVouchers={openVoucherManagementDialog}
        />
      {:else}
        <!-- Vouchers (Featured) para usuário comum -->
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
      {/if}
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

<!-- Checkout Dialog -->
<CheckoutDialog
  isOpen={isCheckoutDialogOpen}
  onClose={closeCheckoutDialog}
  isOwner={isOwner}
  currency={currency}
  onConfirm={(amount) => {
    // Aqui você pode implementar a lógica para adicionar o valor ao saldo
    console.log(`Adicionando ${amount} ${currency} ao saldo`);
  }}
/>

<!-- Voucher Management Dialog -->
<VoucherManagementDialog
  isOpen={isVoucherManagementDialogOpen}
  onClose={closeVoucherManagementDialog}
  vouchers={vouchers}
  transactions={transactions}
  currency={currency}
  totalValue={totalVoucherValue}
/>
