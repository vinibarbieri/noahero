<script lang="ts">
  import { CompanyMiniAppTemplate } from '$lib/components/templates/CompanyMiniAppTemplate';
  import type { Company, MiniApp } from '$lib/types';
  import { onMount } from 'svelte';

  // Props
  let { miniApp, company } = $props<{
    miniApp: MiniApp;
    company: Company;
  }>();

  // State
  let activeTab = $state('offers');
  let activeFilter = $state('for-you');
  let activeNavigationItem = $state('shop');
  let favorites = $state<string[]>([]);
  let searchValue = $state('');

  // Determine if this is the user's own profile
  // In a real app, this would be determined by comparing the logged-in user ID with the company owner ID
  let isOwnProfile = $state(false); // For demo purposes, we'll add a way to toggle this

  // Mock data
  const mockProducts = [
    {
      id: '1',
      title: 'Coconut Chips',
      imageUrl: company.icon || 'https://via.placeholder.com/100',
      price: 4,
      points: 800,
      tag: '14 left',
      tagVariant: 'success' as const,
      isFavorite: false
    },
    {
      id: '2',
      title: 'Organic Sauce',
      imageUrl: company.icon || 'https://via.placeholder.com/100',
      price: 5,
      points: 800,
      tag: '30',
      tagVariant: 'danger' as const,
      isFavorite: false
    },
    {
      id: '3',
      title: 'Premium Coffee',
      imageUrl: company.icon || 'https://via.placeholder.com/100',
      price: 6,
      points: 1200,
      tag: '2 left',
      tagVariant: 'warning' as const,
      isFavorite: false
    }
  ];

  const tabs = [
    { id: 'offers', label: 'Offers', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd" /></svg>' },
    { id: 'boosts', label: 'Boosts', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" /></svg>' }
  ];

  const filters = [
    { id: 'for-you', label: 'For you' },
    { id: 'most-recent', label: 'Most recent' },
    { id: 'category', label: 'Category' },
    { id: 'high-to-low', label: 'High to low' }
  ];

  const navigationItems = [
    {
      id: 'shop',
      label: 'Shop',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'
    },
    {
      id: 'camera',
      label: 'Camera',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
    },
    {
      id: 'games',
      label: 'Games',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>'
    }
  ];

  // Computed
  $effect(() => {
    products = mockProducts.map(product => ({
      ...product,
      isFavorite: favorites.includes(product.id)
    }));
  });

  let products = $state(mockProducts);

  // Lifecycle
  onMount(() => {
    console.log('CompanyMiniApp mounted', { miniApp, company });
  });

  // Event handlers
  function handleTabChange(tabId: string) {
    activeTab = tabId;
  }

  function handleFilterChange(filterId: string) {
    activeFilter = filterId;
  }

  function handleFavoriteToggle(productId: string) {
    if (favorites.includes(productId)) {
      favorites = favorites.filter(id => id !== productId);
    } else {
      favorites = [...favorites, productId];
    }
  }

  function handleSpend(productId: string) {
    console.log('Spend points on product', productId);
    // Implement spending logic here
  }

  function handleNavigationItemClick(itemId: string) {
    activeNavigationItem = itemId;
  }

  // Profile action handlers
  function handleFollowClick() {
    console.log('Follow clicked');
    // In a real app, this would call an API to follow the company
  }

  function handleEditProfileClick() {
    console.log('Edit profile clicked');
    // In a real app, this would open a profile edit form
  }

  function handleShareProfileClick() {
    console.log('Share profile clicked');
    // In a real app, this would open a share dialog
  }

  function handleEditAvatarClick() {
    console.log('Edit avatar clicked');
    // In a real app, this would open an avatar upload dialog
  }

  // For demo purposes, let's add a way to toggle isOwnProfile when clicking on the avatar
  function toggleProfileOwnership() {
    isOwnProfile = !isOwnProfile;
    console.log('Profile ownership toggled:', isOwnProfile ? 'Own profile' : 'Other profile');
  }
</script>

<!-- Toggle button for demo purposes -->
<div class="fixed bottom-20 right-4 z-50">
  <button
    class="bg-primary-700 text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary-800 transition-colors"
    onclick={toggleProfileOwnership}
  >
    {isOwnProfile ? 'Ver como visitante' : 'Ver como proprietário'}
  </button>
</div>

<CompanyMiniAppTemplate
  companyName={company.name}
  companyUsername={company.name.toLowerCase().replace(/\s+/g, '')}
  companyAvatarUrl={company.icon || "https://via.placeholder.com/150"}
  companyIsVerified={true}
  companyPostsCount={641}
  companyFollowersCount={23400}
  companyFollowingCount={3861}
  companyVoucherBalance={4259.32}
  companyVoucherCurrency="$"
  companyBio="ASSISTÊNCIA TÉCNICA AUTORIZADA IRP\nAPPLE | MACBOOK | IPHONE\n\n🔗 Reconectamos você com o seu Apple!\n🔧 Reparos em APPLE WATCH | IPAD | MACBOOK\n🏆 +20k de clientes em 14 anos de experiência"
  companyLinks={[
    { url: 'https://linktr.ee/we.three', text: 'linktr.ee/we.three' },
    { url: '#', text: 'São Luís, Brazil' }
  ]}
  companyStatus={company.status || 'none'}
  isOwnProfile={isOwnProfile}
  onFollowClick={handleFollowClick}
  onEditProfileClick={handleEditProfileClick}
  onShareProfileClick={handleShareProfileClick}
  onEditAvatarClick={handleEditAvatarClick}

  avatarUrl="https://i.pravatar.cc/150?img=3"
  points={1200}
  promoTitle="Check out this week's new deals and earn free points!"
  promoImageUrl={company.icon || "https://via.placeholder.com/100"}
  {tabs}
  {activeTab}
  {filters}
  {activeFilter}
  {products}
  navigationItems={navigationItems}
  {activeNavigationItem}
  {searchValue}
  onAvatarClick={() => console.log('Avatar clicked')}
  onSearchClick={() => console.log('Search clicked')}
  onSearchInput={(value) => { searchValue = value; console.log('Search input:', value); }}
  onSearchSubmit={(value) => console.log('Search submit:', value)}
  onNotificationsClick={() => console.log('Notifications clicked')}
  onFavoritesClick={() => console.log('Favorites clicked')}
  onHomeClick={() => console.log('Home clicked')}
  onExploreClick={() => console.log('Explore clicked')}
  onReelsClick={() => console.log('Reels clicked')}
  onMessagesClick={() => console.log('Messages clicked')}
  onCreateClick={() => console.log('Create clicked')}
  onPromoClick={() => console.log('Promo clicked')}
  onTabChange={handleTabChange}
  onFilterChange={handleFilterChange}
  onFavoriteToggle={handleFavoriteToggle}
  onSpend={handleSpend}
  onNavigationItemClick={handleNavigationItemClick}
/>
