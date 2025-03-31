<script lang="ts">
  import { BalanceCard } from '$lib/components/molecules/BalanceCard';
  import { getUserContext, setUserContext } from '$lib/contexts/UserContext';
  import { setVoucherContext } from '$lib/contexts/VoucherContext';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  // Dados carregados pelo servidor
  let { data } = $props<{ data: PageData }>();

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

  // Estado para controlar o tipo de usuário
  let userType = $state('common'); // 'common' ou 'owner'

  // Inicializar os contextos quando o componente for montado
  onMount(() => {
    setVoucherContext(formattedVouchers, formattedTransactions);
    setUserContext(false); // Inicialmente, não é proprietário
  });

  // Obter o contexto do usuário
  const userContext = getUserContext();

  // Função para alternar entre usuário comum e proprietário
  function toggleUserType() {
    userType = userType === 'common' ? 'owner' : 'common';
    userContext.isOwner.set(userType === 'owner');
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-6">Exemplo de Balance Card e Dialog</h1>
  <p class="mb-4">Dados carregados do servidor: {data.company?.name}</p>

  <div class="mb-6">
    <button
      class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
      onclick={toggleUserType}
    >
      {userType === 'common' ? 'Mudar para Proprietário' : 'Mudar para Usuário Comum'}
    </button>
    <p class="mt-2 text-sm text-gray-600">Tipo de usuário atual: <span class="font-medium">{userType === 'common' ? 'Usuário Comum' : 'Proprietário'}</span></p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Card de saldo que reage ao contexto -->
    <div>
      <h2 class="text-xl font-semibold mb-4">Card de Saldo</h2>
      <div class="w-64">
        <BalanceCard
          balance={userType === 'owner' ? 150032 : 75000}
          currency="R$"
          title={userType === 'owner' ? 'Saldo da Conta' : 'Seu Saldo'}
          percentChange={3.5}
          valueChange={12456}
        />
      </div>
    </div>
  </div>
</div>
