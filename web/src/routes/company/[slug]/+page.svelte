<script lang="ts">
  import { CompanyMiniApp } from '$lib/components/miniapps/CompanyMiniApp';
  import { setVoucherContext } from '$lib/contexts/VoucherContext';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  
  // Dados carregados pelo servidor
  export let data: PageData;
  
  // Inicializar o contexto de vouchers quando o componente for montado
  onMount(() => {
    // Converter os vouchers do formato do banco para o formato do contexto
    const formattedVouchers = data.vouchers.map(voucher => ({
      id: voucher.id,
      name: voucher.name,
      image: voucher.image,
      price: voucher.price,
      timeRemaining: voucher.timeRemaining,
      notForSale: voucher.notForSale,
      owners: voucher.owners
    }));
    
    // Converter as transações do formato do banco para o formato do contexto
    const formattedTransactions = data.transactions.map(transaction => ({
      id: transaction.id,
      name: transaction.name,
      icon: transaction.icon,
      verified: transaction.verified,
      price: transaction.price,
      currency: transaction.currency,
      volume: transaction.volume,
      date: transaction.date,
      type: transaction.type
    }));
    
    // Definir o contexto de vouchers
    setVoucherContext(formattedVouchers, formattedTransactions);
  });
</script>

<CompanyMiniApp company={data.company} miniApp={data.miniApp} />
