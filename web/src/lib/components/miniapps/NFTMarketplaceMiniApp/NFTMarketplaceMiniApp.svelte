<script lang="ts">
  import { onMount } from 'svelte';
  import type { MiniApp, Company } from '$lib/types';
  import { VoucherCard } from '$lib/components/molecules/VoucherCard';
  import { VoucherGrid } from '$lib/components/molecules/VoucherGrid';
  import { VoucherCarousel } from '$lib/components/molecules/VoucherCarousel';
  import { mockCompanies } from '$lib/utils/mock';
  import type { Voucher } from '$lib/contexts/VoucherContext';
  
  // Import voucher context to get NFT data
  import { getVoucherContext } from '$lib/contexts/VoucherContext';
  
  // Props
  let { miniApp } = $props<{
    miniApp: MiniApp;
  }>();
  
  // State
  let activeTab = $state('all');
  let activeCategory = $state('all');
  let searchQuery = $state('');
  let allVouchers: Voucher[] = $state([]);
  let filteredVouchers: Voucher[] = $state([]);
  let featuredVouchers: Voucher[] = $state([]);
  let vouchersByCompany: Record<string, Voucher[]> = $state({});
  let vouchersByCategory: Record<string, Voucher[]> = $state({});
  let companies: Company[] = $state([]);
  
  // Categories for NFTs
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'art', name: 'Arte' },
    { id: 'collectibles', name: 'Colecionáveis' },
    { id: 'games', name: 'Jogos' },
    { id: 'music', name: 'Música' },
    { id: 'photography', name: 'Fotografia' },
    { id: 'sports', name: 'Esportes' }
  ];
  
  // Tabs for the marketplace
  const tabs = [
    { id: 'all', name: 'Todos NFTs' },
    { id: 'featured', name: 'Destaques' },
    { id: 'new', name: 'Novos' },
    { id: 'trending', name: 'Tendências' }
  ];
  
  // Lifecycle
  onMount(() => {
    // Get voucher context
    const voucherContext = getVoucherContext();
    if (voucherContext) {
      // Subscribe to vouchers store
      const unsubscribe = voucherContext.vouchers.subscribe((vouchers) => {
        allVouchers = vouchers;
        
        // Create featured vouchers (first 6)
        featuredVouchers = [...vouchers].slice(0, 6);
        
        // Group vouchers by company
        vouchersByCompany = groupVouchersByCompany(vouchers);
        
        // Group vouchers by category (randomly assign categories for demo)
        vouchersByCategory = groupVouchersByCategory(vouchers);
        
        // Initialize filtered vouchers
        updateFilteredVouchers();
      });
      
      // Get companies
      companies = mockCompanies;
      
      // Cleanup subscription
      return unsubscribe;
    }
  });
  
  // Group vouchers by company (using a random distribution for demo)
  function groupVouchersByCompany(vouchers: Voucher[]): Record<string, Voucher[]> {
    const result: Record<string, Voucher[]> = {};
    
    // For each company, assign some vouchers
    companies.forEach((company) => {
      // Randomly select vouchers for this company
      const companyVouchers = vouchers.filter(() => Math.random() > 0.5);
      if (companyVouchers.length > 0) {
        result[company.id] = companyVouchers;
      }
    });
    
    return result;
  }
  
  // Group vouchers by category (randomly assign categories for demo)
  function groupVouchersByCategory(vouchers: Voucher[]): Record<string, Voucher[]> {
    const result: Record<string, Voucher[]> = {};
    
    // Initialize categories
    categories.forEach((category) => {
      if (category.id !== 'all') {
        result[category.id] = [];
      }
    });
    
    // Assign each voucher to a random category
    vouchers.forEach((voucher) => {
      const categoryIds = categories
        .filter((c) => c.id !== 'all')
        .map((c) => c.id);
      const randomCategoryId = categoryIds[Math.floor(Math.random() * categoryIds.length)];
      result[randomCategoryId].push(voucher);
    });
    
    return result;
  }
  
  // Update filtered vouchers based on active tab, category, and search query
  function updateFilteredVouchers() {
    let filtered = [...allVouchers];
    
    // Filter by tab
    if (activeTab === 'featured') {
      filtered = featuredVouchers;
    } else if (activeTab === 'new') {
      // For demo, just show the last 8 vouchers
      filtered = [...allVouchers].slice(-8);
    } else if (activeTab === 'trending') {
      // For demo, just show random 8 vouchers
      filtered = [...allVouchers].sort(() => 0.5 - Math.random()).slice(0, 8);
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter((voucher) => 
        vouchersByCategory[activeCategory]?.some((v) => v.id === voucher.id)
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((voucher) => 
        voucher.name.toLowerCase().includes(query)
      );
    }
    
    filteredVouchers = filtered;
  }
  
  // Handle tab change
  function handleTabChange(tabId: string) {
    activeTab = tabId;
    updateFilteredVouchers();
  }
  
  // Handle category change
  function handleCategoryChange(categoryId: string) {
    activeCategory = categoryId;
    updateFilteredVouchers();
  }
  
  // Handle search
  function handleSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    updateFilteredVouchers();
  }
  
  // Handle voucher click
  function handleVoucherClick(id: string) {
    console.log('Voucher clicked:', id);
    // Implement navigation to voucher details page
  }
</script>

<div class="bg-background dark:bg-gray-900 min-h-screen">
  <!-- Header -->
  <header class="bg-white dark:bg-gray-800 shadow-sm">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-primary-700 dark:text-primary-300">NFT Marketplace</h1>
          <p class="text-gray-600 dark:text-gray-400">Descubra, colecione e venda NFTs exclusivos</p>
        </div>
        
        <!-- Search -->
        <div class="w-full md:w-64">
          <input
            type="search"
            placeholder="Buscar NFTs..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            value={searchQuery}
            on:input={handleSearch}
          />
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
    <!-- Featured Section (only on 'all' and 'featured' tabs) -->
    {#if activeTab === 'all' || activeTab === 'featured'}
      <section class="mb-10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">NFTs em Destaque</h2>
          <button class="text-primary-600 dark:text-primary-400 font-medium hover:underline">
            Ver todos
          </button>
        </div>
        
        <VoucherCarousel
          vouchers={featuredVouchers}
          onVoucherClick={handleVoucherClick}
        />
      </section>
    {/if}
    
    <!-- Categories -->
    <section class="mb-6">
      <div class="flex overflow-x-auto pb-2 gap-2">
        {#each categories as category}
          <button
            class="px-4 py-2 whitespace-nowrap rounded-lg font-medium transition-colors {activeCategory === category.id ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}"
            on:click={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        {/each}
      </div>
    </section>
    
    <!-- NFTs by Category (when a specific category is selected) -->
    {#if activeCategory !== 'all'}
      <section class="mb-10">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {categories.find(c => c.id === activeCategory)?.name || 'Categoria'}
        </h2>
        
        <VoucherGrid
          vouchers={filteredVouchers}
          title=""
          columns={4}
          onVoucherClick={handleVoucherClick}
        />
      </section>
    {:else}
      <!-- NFTs by Company (when 'all' category is selected) -->
      {#each Object.entries(vouchersByCompany) as [companyId, companyVouchers]}
        {#if companyVouchers.length > 0}
          {@const company = companies.find(c => c.id === companyId)}
          {#if company}
            <section class="mb-10">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  {#if company.icon}
                    <img src={company.icon} alt={company.name} class="w-8 h-8 rounded-full object-cover" />
                  {/if}
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">{company.name}</h2>
                </div>
                <button class="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                  Ver todos
                </button>
              </div>
              
              <VoucherCarousel
                vouchers={companyVouchers}
                onVoucherClick={handleVoucherClick}
              />
            </section>
          {/if}
        {/if}
      {/each}
      
      <!-- NFTs by Category (when 'all' category is selected) -->
      {#each Object.entries(vouchersByCategory) as [categoryId, categoryVouchers]}
        {#if categoryVouchers.length > 0}
          {@const category = categories.find(c => c.id === categoryId)}
          {#if category}
            <section class="mb-10">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h2>
                <button 
                  class="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  on:click={() => handleCategoryChange(categoryId)}
                >
                  Ver todos
                </button>
              </div>
              
              <VoucherCarousel
                vouchers={categoryVouchers}
                onVoucherClick={handleVoucherClick}
              />
            </section>
          {/if}
        {/if}
      {/each}
    {/if}
  </main>
</div>
