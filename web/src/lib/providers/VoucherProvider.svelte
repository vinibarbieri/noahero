<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { setVoucherContext } from '$lib/contexts/VoucherContext';
  import type { Voucher, Transaction } from '$lib/contexts/VoucherContext';
  
  // Props
  let { vouchers = [], transactions = [] } = $props<{
    vouchers?: Voucher[];
    transactions?: Transaction[];
  }>();
  
  // Create stores
  const vouchersStore = writable<Voucher[]>(vouchers);
  const transactionsStore = writable<Transaction[]>(transactions);
  
  // Set context on mount
  onMount(() => {
    setVoucherContext({
      vouchers: vouchersStore,
      transactions: transactionsStore
    });
    
    // Update stores if props change
    $effect(() => {
      vouchersStore.set(vouchers);
      transactionsStore.set(transactions);
    });
  });
</script>

<slot />
