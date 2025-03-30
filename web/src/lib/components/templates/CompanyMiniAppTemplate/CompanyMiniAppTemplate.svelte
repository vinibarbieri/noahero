<script lang="ts">
  import { PromoBanner } from '$lib/components/molecules/PromoBanner';
  import { BottomNavigation } from '$lib/components/organisms/BottomNavigation';
  import { FilterBar } from '$lib/components/organisms/FilterBar';
  import { ProductList } from '$lib/components/organisms/ProductList';
  import { ProfileHeader } from '$lib/components/organisms/ProfileHeader';
  import { TabNavigation } from '$lib/components/organisms/TabNavigation';

  // Props
  let {
    // Company Profile
    companyName = '',
    companyUsername = '',
    companyAvatarUrl = '',
    companyIsVerified = false,
    companyPostsCount = 0,
    companyFollowersCount = 0,
    companyFollowingCount = 0,
    companyVoucherBalance = 0,
    companyVoucherCurrency = 'R$',
    companyBio = '',
    companyLinks = [],
    companyStatus = 'none',
    isOwnProfile = false,
    onFollowClick,
    onEditProfileClick,
    onShareProfileClick,
    onEditAvatarClick,

    // Other props
    avatarUrl,
    points,
    searchValue,
    promoTitle,
    promoSubtitle,
    promoImageUrl,
    tabs,
    activeTab,
    filters,
    activeFilter,
    products,
    navigationItems,
    activeNavigationItem,
    onAvatarClick,
    onSearchClick,
    onSearchInput,
    onSearchSubmit,
    onNotificationsClick,
    onFavoritesClick,
    onHomeClick,
    onExploreClick,
    onReelsClick,
    onMessagesClick,
    onCreateClick,
    onPromoClick,
    onTabChange,
    onFilterChange,
    onFavoriteToggle,
    onSpend,
    onNavigationItemClick
  } = $props<{
    // Company Profile
    companyName?: string;
    companyUsername?: string;
    companyAvatarUrl?: string;
    companyIsVerified?: boolean;
    companyPostsCount?: number;
    companyFollowersCount?: number;
    companyFollowingCount?: number;
    companyVoucherBalance?: number;
    companyVoucherCurrency?: string;
    companyBio?: string;
    companyLinks?: Array<{url: string, text: string}>;
    companyStatus?: 'none' | 'story' | 'live';
    isOwnProfile?: boolean;
    onFollowClick?: () => void;
    onEditProfileClick?: () => void;
    onShareProfileClick?: () => void;
    onEditAvatarClick?: () => void;

    // Other props
    avatarUrl: string;
    points: number;
    searchValue?: string;
    promoTitle: string;
    promoSubtitle?: string;
    promoImageUrl: string;
    tabs: Array<{
      id: string;
      label: string;
      icon?: string;
    }>;
    activeTab: string;
    filters: Array<{
      id: string;
      label: string;
    }>;
    activeFilter: string;
    products: Array<{
      id: string;
      title: string;
      imageUrl: string;
      price: number;
      points: number;
      tag?: string;
      tagVariant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
      isFavorite?: boolean;
    }>;
    navigationItems: Array<{
      id: string;
      label: string;
      icon: string;
    }>;
    activeNavigationItem: string;
    onAvatarClick?: () => void;
    onSearchClick?: () => void;
    onSearchInput?: (value: string) => void;
    onSearchSubmit?: (value: string) => void;
    onNotificationsClick?: () => void;
    onFavoritesClick?: () => void;
    onHomeClick?: () => void;
    onExploreClick?: () => void;
    onReelsClick?: () => void;
    onMessagesClick?: () => void;
    onCreateClick?: () => void;
    onPromoClick?: () => void;
    onTabChange?: (tabId: string) => void;
    onFilterChange?: (filterId: string) => void;
    onFavoriteToggle?: (productId: string) => void;
    onSpend?: (productId: string) => void;
    onNavigationItemClick?: (itemId: string) => void;
  }>();
</script>

<div class="h-full flex flex-col bg-slate-100 dark:bg-gray-900 font-sans">
  <div class="flex-1 overflow-auto px-3 sm:px-4 pt-0 pb-0">
    <!-- Removido o header daqui, agora está no AppLayout -->
    <div class="max-w-screen-md mx-auto w-full pt-4">

      <!-- Profile Header -->
      <ProfileHeader
        name={companyName}
        username={companyUsername}
        avatarUrl={companyAvatarUrl}
        isVerified={companyIsVerified}
        postsCount={companyPostsCount}
        followersCount={companyFollowersCount}
        followingCount={companyFollowingCount}
        voucherBalance={companyVoucherBalance}
        voucherCurrency={companyVoucherCurrency}
        bio={companyBio}
        links={companyLinks}
        status={companyStatus}
        isOwnProfile={isOwnProfile}
        onFollowClick={onFollowClick}
        onEditProfileClick={onEditProfileClick}
        onShareProfileClick={onShareProfileClick}
        onEditAvatarClick={onEditAvatarClick}
      />

      <!-- Balance Card foi movido para dentro do ProfileHeader -->

      <!-- Promo Banner -->
      <PromoBanner
        title={promoTitle}
        subtitle={promoSubtitle}
        imageUrl={promoImageUrl}
        onClick={onPromoClick}
      />

      <!-- Tabs -->
      <TabNavigation
        {tabs}
        {activeTab}
        onTabChange={onTabChange}
      />

      <!-- Filters -->
      <FilterBar
        {filters}
        {activeFilter}
        onFilterChange={onFilterChange}
      />

      <!-- Products -->
      <ProductList
        {products}
        {onFavoriteToggle}
        {onSpend}
      />
    </div>
  </div>

  <!-- Bottom Navigation -->
  <BottomNavigation
    items={navigationItems}
    activeItem={activeNavigationItem}
    onItemClick={onNavigationItemClick}
  />
</div>
