<script lang="ts">
  import { onMount } from 'svelte';
  import type { MiniApp, Company } from '$lib/types';
  import { VoucherCard } from '$lib/components/molecules/VoucherCard';
  import { VoucherGrid } from '$lib/components/molecules/VoucherGrid';
  import { mockCompanies } from '$lib/utils/mock';
  import type { Voucher, Transaction } from '$lib/contexts/VoucherContext';
  
  // Import voucher context to get NFT data
  import { getVoucherContext } from '$lib/contexts/VoucherContext';
  
  // Props
  let { miniApp } = $props<{
    miniApp: MiniApp;
  }>();
  
  // State
  let activeTab = $state('nfts');
  let userVouchers: Voucher[] = $state([]);
  let userTransactions: Transaction[] = $state([]);
  let vouchersByCompany: Record<string, Voucher[]> = $state({});
  let companies: Company[] = $state([]);
  let walletBalance = $state(3.45);
  let walletCurrency = $state('ETH');
  let fiatBalance = $state(6789.12);
  let fiatCurrency = $state('R$');
  
  // Tabs for the wallet
  const tabs = [
    { id: 'nfts', name: 'Meus NFTs' },
    { id: 'tokens', name: 'Tokens' },
    { id: 'transactions', name: 'Transações' }
  ];
  
  // Lifecycle
  onMount(() => {
    // Get voucher context
    const voucherContext = getVoucherContext();
    if (voucherContext) {
      // Subscribe to vouchers store
      const unsubscribeVouchers = voucherContext.vouchers.subscribe((vouchers) => {
        // For demo, randomly select some vouchers as owned by the user
        userVouchers = vouchers.filter(() => Math.random() > 0.6);
        
        // Group user vouchers by company
        vouchersByCompany = groupVouchersByCompany(userVouchers);
      });
      
      // Subscribe to transactions store
      const unsubscribeTransactions = voucherContext.transactions.subscribe((transactions) => {
        userTransactions = transactions;
      });
      
      // Get companies
      companies = mockCompanies;
      
      // Cleanup subscriptions
      return () => {
        unsubscribeVouchers();
        unsubscribeTransactions();
      };
    }
  });
  
  // Group vouchers by company
  function groupVouchersByCompany(vouchers: Voucher[]): Record<string, Voucher[]> {
    const result: Record<string, Voucher[]> = {};
    
    // For each company, find vouchers
    companies.forEach((company) => {
      // Randomly assign vouchers to companies for demo
      const companyVouchers = vouchers.filter(() => Math.random() > 0.5);
      if (companyVouchers.length > 0) {
        result[company.id] = companyVouchers;
      }
    });
    
    return result;
  }
  
  // Handle tab change
  function handleTabChange(tabId: string) {
    activeTab = tabId;
  }
  
  // Handle voucher click
  function handleVoucherClick(id: string) {
    console.log('Voucher clicked:', id);
    // Implement navigation to voucher details page
  }
  
  // Format currency
  function formatCurrency(value: number, currency: string): string {
    return `${currency} ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  
  // Format date
  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
  
  // Get transaction type icon
  function getTransactionTypeIcon(type: 'buy' | 'sell' | 'transfer'): string {
    switch (type) {
      case 'buy':
        return 'arrow_downward';
      case 'sell':
        return 'arrow_upward';
      case 'transfer':
        return 'swap_horiz';
      default:
        return 'help';
    }
  }
  
  // Get transaction type color
  function getTransactionTypeColor(type: 'buy' | 'sell' | 'transfer'): string {
    switch (type) {
      case 'buy':
        return 'text-green-500 dark:text-green-400';
      case 'sell':
        return 'text-red-500 dark:text-red-400';
      case 'transfer':
        return 'text-blue-500 dark:text-blue-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  }
</script>

<div class="bg-background dark:bg-gray-900 min-h-screen">
  <!-- Header -->
  <header class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-primary-700 dark:text-primary-300">Minha Carteira</h1>
          <p class="text-gray-600 dark:text-gray-400">Gerencie seus NFTs e tokens</p>
        </div>
      </div>
      
      <!-- Tabs -->
      <div class="flex overflow-x-auto mt-4 pb-1 gap-2">
        {#each tabs as tab}
          <button
            class="px-4 py-2 whitespace-nowrap rounded-lg font-medium transition-colors {activeTab === tab.id ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}"
            on:click={() => handleTabChange(tab.id)}
          >
            {tab.name}
          </button>
        {/each}
      </div>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="container mx-auto px-4 py-6">
    <!-- Wallet Balance Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div class="bg-gradient-to-r from-primary-700 to-primary-900 rounded-xl p-6 text-white shadow-lg">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-sm font-medium text-primary-200 mb-1">Saldo em Crypto</h3>
            <p class="text-3xl font-bold">{walletCurrency} {walletBalance}</p>
            <p class="text-sm text-primary-200 mt-1">≈ {formatCurrency(fiatBalance, fiatCurrency)}</p>
          </div>
          <div class="bg-white/20 p-2 rounded-lg">
            <span class="material-icons-round text-2xl">account_balance_wallet</span>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <button class="bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1">
            <span class="material-icons-round text-sm">add</span>
            Depositar
          </button>
          <button class="bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1">
            <span class="material-icons-round text-sm">arrow_upward</span>
            Enviar
          </button>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-secondary-700 to-secondary-900 rounded-xl p-6 text-white shadow-lg">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-sm font-medium text-secondary-200 mb-1">Coleção NFT</h3>
            <p class="text-3xl font-bold">{userVouchers.length} NFTs</p>
            <p class="text-sm text-secondary-200 mt-1">Em {Object.keys(vouchersByCompany).length} lojas</p>
          </div>
          <div class="bg-white/20 p-2 rounded-lg">
            <span class="material-icons-round text-2xl">collections</span>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <button class="bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1">
            <span class="material-icons-round text-sm">shopping_cart</span>
            Comprar NFTs
          </button>
        </div>
      </div>
    </div>
    
    <!-- NFTs Tab Content -->
    {#if activeTab === 'nfts'}
      <!-- NFTs by Company -->
      {#if Object.keys(vouchersByCompany).length > 0}
        {#each Object.entries(vouchersByCompany) as [companyId, companyVouchers]}
          {#if companyVouchers.length > 0}
            {@const company = companies.find(c => c.id === companyId)}
            {#if company}
              <section class="mb-10">
                <div class="flex items-center gap-2 mb-4">
                  {#if company.icon}
                    <img src={company.icon} alt={company.name} class="w-8 h-8 rounded-full object-cover" />
                  {/if}
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">{company.name}</h2>
                </div>
                
                <VoucherGrid
                  vouchers={companyVouchers}
                  title=""
                  columns={4}
                  onVoucherClick={handleVoucherClick}
                />
              </section>
            {/if}
          {/if}
        {/each}
      {:else}
        <div class="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm">
          <div class="flex justify-center mb-4">
            <span class="material-icons-round text-5xl text-gray-400 dark:text-gray-500">sentiment_dissatisfied</span>
          </div>
          <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">Nenhum NFT encontrado</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Você ainda não possui NFTs em sua carteira.</p>
          <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Explorar Marketplace
          </button>
        </div>
      {/if}
    {/if}
    
    <!-- Tokens Tab Content -->
    {#if activeTab === 'tokens'}
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">Meus Tokens</h2>
        </div>
        
        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <!-- ETH Token -->
          <div class="p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span class="font-bold text-blue-600 dark:text-blue-300">ETH</span>
              </div>
              <div>
                <h3 class="font-medium text-gray-900 dark:text-white">Ethereum</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">ETH</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900 dark:text-white">{walletBalance} ETH</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(fiatBalance, fiatCurrency)}</p>
            </div>
          </div>
          
          <!-- BTC Token -->
          <div class="p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                <span class="font-bold text-amber-600 dark:text-amber-300">BTC</span>
              </div>
              <div>
                <h3 class="font-medium text-gray-900 dark:text-white">Bitcoin</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">BTC</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900 dark:text-white">0.05 BTC</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">R$ 8.452,30</p>
            </div>
          </div>
          
          <!-- USDT Token -->
          <div class="p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span class="font-bold text-green-600 dark:text-green-300">USDT</span>
              </div>
              <div>
                <h3 class="font-medium text-gray-900 dark:text-white">Tether</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">USDT</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900 dark:text-white">250 USDT</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">R$ 1.250,00</p>
            </div>
          </div>
        </div>
      </div>
    {/if}
    
    <!-- Transactions Tab Content -->
    {#if activeTab === 'transactions'}
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">Histórico de Transações</h2>
        </div>
        
        {#if userTransactions.length > 0}
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            {#each userTransactions as transaction}
              <div class="p-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full overflow-hidden">
                    <img src={transaction.icon} alt={transaction.name} class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div class="flex items-center gap-1">
                      <h3 class="font-medium text-gray-900 dark:text-white">{transaction.name}</h3>
                      {#if transaction.verified}
                        <span class="material-icons-round text-blue-500 text-sm">verified</span>
                      {/if}
                    </div>
                    <div class="flex items-center gap-1 text-sm">
                      <span class="material-icons-round text-sm {getTransactionTypeColor(transaction.type)}">
                        {getTransactionTypeIcon(transaction.type)}
                      </span>
                      <span class="text-gray-500 dark:text-gray-400">
                        {transaction.type === 'buy' ? 'Compra' : transaction.type === 'sell' ? 'Venda' : 'Transferência'}
                      </span>
                      <span class="text-gray-500 dark:text-gray-400">•</span>
                      <span class="text-gray-500 dark:text-gray-400">{formatDate(transaction.date)}</span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-medium text-gray-900 dark:text-white">
                    {transaction.type === 'buy' ? '-' : transaction.type === 'sell' ? '+' : ''}
                    {transaction.price} {transaction.currency}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Volume: {transaction.volume}</p>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="p-8 text-center">
            <div class="flex justify-center mb-4">
              <span class="material-icons-round text-5xl text-gray-400 dark:text-gray-500">receipt_long</span>
            </div>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">Nenhuma transação encontrada</h3>
            <p class="text-gray-600 dark:text-gray-400">Você ainda não realizou nenhuma transação.</p>
          </div>
        {/if}
      </div>
    {/if}
  </main>
</div>
