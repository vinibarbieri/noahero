<script lang="ts">
  // Props
  let {
    balance = 0,
    currency = '$',
    title = 'Your Balance',
    showIcon = true
  } = $props<{
    balance: number;
    currency?: string;
    title?: string;
    showIcon?: boolean;
  }>();

  // Format currency for display
  function formatCurrency(amount: number, currencySymbol: string = '$'): string {
    return `${currencySymbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 w-full h-full flex flex-col justify-center">
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
</div>
