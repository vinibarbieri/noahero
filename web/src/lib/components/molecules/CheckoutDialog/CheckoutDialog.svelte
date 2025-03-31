<script lang="ts">
  import { Dialog } from '$lib/components/molecules/Dialog';
  import { formatCurrency } from '$lib/utils/formatters';

  // Props
  let {
    isOpen = false,
    onClose,
    isOwner = false,
    currency = 'R$',
    onConfirm
  } = $props<{
    isOpen: boolean;
    onClose?: () => void;
    isOwner?: boolean;
    currency?: string;
    onConfirm?: (amount: number) => void;
  }>();

  // Estado local
  let amount = $state(100);
  let paymentMethod = $state('credit_card');
  let isProcessing = $state(false);

  // Opções de valor pré-definidas
  const amountOptions = [50, 100, 200, 500, 1000];

  // Opções de pagamento
  const paymentMethods = [
    { id: 'credit_card', name: 'Cartão de Crédito' },
    { id: 'debit_card', name: 'Cartão de Débito' },
    { id: 'pix', name: 'PIX' },
    { id: 'bank_transfer', name: 'Transferência Bancária' }
  ];

  // Processar o pagamento
  function processPayment() {
    isProcessing = true;

    // Simulação de processamento
    setTimeout(() => {
      isProcessing = false;
      if (onConfirm) {
        onConfirm(amount);
      }
      if (onClose) {
        onClose();
      }
    }, 1500);
  }
</script>

<Dialog
  isOpen={isOpen}
  title={isOwner ? 'Recarregar Saldo' : 'Comprar Coins'}
  onClose={onClose}
  size="md"
>
  <div class="p-4">
    <div class="mb-6">
      <label for="amount-input" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        {isOwner ? 'Valor para recarregar' : 'Quantidade de coins'}
      </label>

      <!-- Opções de valor pré-definidas -->
      <div class="grid grid-cols-3 gap-2 mb-4">
        {#each amountOptions as option}
          <button
            class="px-4 py-2 rounded-lg {amount === option ? 'bg-primary-50 dark:bg-primary-900/30 border border-primary-500 text-primary-700 dark:text-primary-300 font-medium' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'} transition-colors"
            onclick={() => amount = option}
          >
            {formatCurrency(option, currency)}
          </button>
        {/each}
      </div>

      <!-- Input personalizado -->
      <div class="relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 dark:text-gray-300">{currency}</span>
        <input
          id="amount-input"
          type="number"
          class="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
          bind:value={amount}
          min="10"
          max="10000"
        />
      </div>
    </div>

    <div class="mb-6">
      <p class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        Método de pagamento
      </p>

      <div class="space-y-2">
        {#each paymentMethods as method}
          <label class="flex items-center p-3 {paymentMethod === method.id ? 'border border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/30' : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'} rounded-lg cursor-pointer transition-colors">
            <input
              type="radio"
              name="payment_method"
              value={method.id}
              checked={paymentMethod === method.id}
              class="h-4 w-4 text-primary-600 focus:ring-primary-500"
              onchange={() => paymentMethod = method.id}
            />
            <span class="ml-3 text-gray-800 dark:text-gray-200 font-medium">{method.name}</span>
          </label>
        {/each}
      </div>
    </div>

    <div class="border-t border-gray-200 pt-4">
      <div class="flex justify-between mb-4">
        <span class="text-gray-700 dark:text-gray-300">Total:</span>
        <span class="font-bold text-gray-900 dark:text-white">{formatCurrency(amount, currency)}</span>
      </div>

      <button
        class="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
        onclick={processPayment}
        disabled={isProcessing || amount < 10}
      >
        {#if isProcessing}
          <span class="inline-block animate-spin mr-2">⟳</span>
          Processando...
        {:else}
          {isOwner ? 'Recarregar Agora' : 'Comprar Agora'}
        {/if}
      </button>
    </div>
  </div>
</Dialog>
