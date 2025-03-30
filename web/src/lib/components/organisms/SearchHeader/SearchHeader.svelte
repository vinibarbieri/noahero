<script lang="ts">
  import { NoahLogo } from '$lib/components/atoms/NoahLogo';
  import { SearchFieldCompact } from '$lib/components/atoms/SearchField';

  // Props
  let {
    avatarUrl,
    points = 0,
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
    searchValue = ''
  } = $props<{
    avatarUrl: string;
    points?: number;
    searchValue?: string;
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
  }>();

  // State
  let isMobile = $state(false);
  let showSearch = $state(false);

  // Lifecycle
  $effect(() => {
    // Check if mobile on mount and on resize
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  });

  // Functions
  function checkMobile() {
    isMobile = window.innerWidth < 768;
  }

  function handleAvatarClick() {
    if (onAvatarClick) onAvatarClick();
  }

  function handleSearchClick() {
    if (isMobile) {
      showSearch = !showSearch;
    }
    if (onSearchClick) onSearchClick();
  }

  function handleSearchInput(value: string) {
    if (onSearchInput) onSearchInput(value);
  }

  function handleSearchSubmit(value: string) {
    if (onSearchSubmit) onSearchSubmit(value);
  }

  function handleNotificationsClick() {
    if (onNotificationsClick) onNotificationsClick();
  }

  function handleFavoritesClick() {
    if (onFavoritesClick) onFavoritesClick();
  }

  function handleHomeClick() {
    if (onHomeClick) onHomeClick();
  }

  function handleExploreClick() {
    if (onExploreClick) onExploreClick();
  }

  function handleReelsClick() {
    if (onReelsClick) onReelsClick();
  }

  function handleMessagesClick() {
    if (onMessagesClick) onMessagesClick();
  }

  function handleCreateClick() {
    if (onCreateClick) onCreateClick();
  }

  // Icon render functions
  function renderBellIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>`;
  }
</script>

<header class="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
  <div class="max-w-screen-lg mx-auto px-4 py-3">
    <div class="flex items-center justify-between h-16">
      <!-- Logo (Left) -->
      <div class="flex-shrink-0">
        <NoahLogo width="150" height="50" color="var(--color-primary-800)" className="logo-header" />
      </div>

      <!-- Search (Center) - Hidden on mobile unless showSearch is true -->
      <div class="{isMobile && !showSearch ? 'hidden' : 'flex'} flex-1 max-w-xs mx-4">
        <SearchFieldCompact
          value={searchValue}
          placeholder="Search..."
          onInput={handleSearchInput}
          onSearch={handleSearchSubmit}
        />
      </div>

      <!-- Navigation Icons (Right) -->
      <div class="flex items-center space-x-4">
        <!-- Mobile Search Icon (only visible on mobile when search is hidden) -->
        {#if isMobile && !showSearch}
          <button
            class="text-primary-800"
            onclick={handleSearchClick}
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        {/if}

        <!-- Home -->
        <button
          class="text-primary-800 hidden md:block"
          onclick={handleHomeClick}
          aria-label="Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>

        <!-- Messages -->
        <button
          class="text-primary-800"
          onclick={handleMessagesClick}
          aria-label="Messages"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>

        <!-- Create -->
        <button
          class="text-primary-800 hidden md:block"
          onclick={handleCreateClick}
          aria-label="Create"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>

        <!-- Explore -->
        <button
          class="text-primary-800 hidden md:block"
          onclick={handleExploreClick}
          aria-label="Explore"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </button>

        <!-- Notifications -->
        <button
          class="text-primary-800 relative"
          onclick={handleNotificationsClick}
          aria-label="Notifications"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {#if points > 0}
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {points > 9 ? '9+' : points}
            </span>
          {/if}
        </button>

        <!-- Avatar -->
        <button
          class="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-800"
          onclick={handleAvatarClick}
          aria-label="User profile"
        >
          <img src={avatarUrl} alt="User avatar" class="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  </div>
</header>

<!-- Spacer to prevent content from being hidden behind the fixed header -->
<div class="h-20"></div>
