<script lang="ts">
  import { BalanceCard } from '$lib/components/molecules/BalanceCard';
  import { setVoucherContext } from '$lib/contexts/VoucherContext';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  
  // Dados carregados pelo servidor
  export let data: PageData;
  
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
  
  // Inicializar o contexto de vouchers quando o componente for montado
  onMount(() => {
    setVoucherContext(formattedVouchers, formattedTransactions);
  });
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-6">Exemplo de Balance Card e Dialog</h1>
  <p class="mb-4">Dados carregados do servidor: {data.company?.name}</p>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Exemplo de usuário comum -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Usuário Comum</h2>
      <div class="w-64">
        <BalanceCard
          balance={75000}
          currency="R$"
          title="Seu Saldo"
          percentChange={3.5}
          valueChange={12456}
          isOwner={false}
          cardNumber="4567"
        />
      </div>
    </div>

    <!-- Exemplo de proprietário -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Proprietário</h2>
      <div class="w-64">
        <BalanceCard
          balance={150032}
          currency="R$"
          title="Saldo da Conta"
          percentChange={3.5}
          valueChange={12456}
          isOwner={true}
          cardNumber="4567"
        />
      </div>
    </div>
  </div>
</div>
