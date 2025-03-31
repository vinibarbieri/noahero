<script lang="ts">
	import { page } from '$app/stores';
	import { NoahLogo } from '$lib/components/atoms/NoahLogo';
	import { SearchFieldCompact } from '$lib/components/atoms/SearchField';
	import { UserMenu } from '$lib/components/molecules/UserMenu';
	import { Sidebar } from '$lib/components/organisms/Sidebar';
	import type { Company, MiniApp } from '$lib/types';
	import { onMount } from 'svelte';

  // Props
  let { companies = [], miniApps = [], miniapp, defaultMiniapp } = $props<{
    companies: Company[];
    miniApps: MiniApp[];
    defaultMiniapp?: () => any;
    miniapp?: (miniApp: MiniApp) => any;
  }>();

  // State
  let isMobile = $state(false);
  let isSidebarOpen = $state(false);
  let selectedCompanyId = $state<string | null>(null);
  let currentMiniApp = $state<MiniApp | null>(null);
  let searchValue = $state('');
  let showSearch = $state(false);
  let isDarkMode = $state(false);

  // Lifecycle
  onMount(() => {
    isMobile = window.innerWidth < 768;
    window.addEventListener('resize', handleResize);

    // Check dark mode
    isDarkMode = document.documentElement.classList.contains('dark');

    // Set up MutationObserver to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          isDarkMode = document.documentElement.classList.contains('dark');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  });

 $effect(() => {
    const currentPath = $page.url.pathname;
  
    currentMiniApp = miniApps.find((app: MiniApp) => app.path === currentPath) || null;
  });

  // Functions
  function handleResize() {
    isMobile = window.innerWidth < 768;
  }

  function handleCompanySelect(company: Company) {
    selectedCompanyId = company.id;
    currentMiniApp = miniApps.find((app: MiniApp) => app.companyId === company.id) || null;

    if (isMobile) {
      isSidebarOpen = false;
    }
  }

  function toggleSidebar(isOpen?: boolean) {
    if (typeof isOpen === 'boolean') {
      isSidebarOpen = isOpen;
    } else {
      isSidebarOpen = !isSidebarOpen;
    }
  }
</script>

<div class="h-screen grid grid-template-app">
  <!-- Header -->
  <header class="bg-surface dark:bg-gray-800 border-b border-border dark:border-gray-700 z-40 flex items-center px-1 sm:px-4 py-1 sm:py-2">
    <div class="flex items-center justify-between w-full max-w-screen-xl mx-auto">
      <div class="flex items-center">
        <!-- Mobile Toggle -->
        <button
          class="mr-1 xs:mr-2 sm:mr-3 p-1 xs:p-1.5 rounded-lg text-primary-800 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-gray-700 lg:hidden"
          onclick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 xs:h-6 xs:w-6 text-primary-800 dark:text-primary-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="{isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}"
            />
          </svg>
        </button>

        <!-- Logo -->
        <div class="flex-shrink-0">
          {#if isMobile}
            <NoahLogo width="80" height="24" color="var(--color-primary-800)" darkMode={isDarkMode} />
          {:else}
            <NoahLogo width="120" height="32" color="var(--color-primary-800)" darkMode={isDarkMode} />
          {/if}
        </div>
      </div>

      <!-- Mobile Search Icon (when search is hidden) -->
      {#if isMobile && !showSearch}
        <div class="flex-1"></div>
        <button
          class="p-1 xs:p-1.5 rounded-lg text-primary-800 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-gray-700"
          onclick={() => showSearch = !showSearch}
          aria-label="Toggle search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 xs:h-6 xs:w-6 text-primary-800 dark:text-primary-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      {:else}
        <!-- Search Field -->
        <div class="flex-1 max-w-xs mx-1 xs:mx-2 sm:mx-4 flex items-center text-primary-800 dark:text-primary-200">
          <div class="flex-1">
            <SearchFieldCompact
              value={searchValue}
              placeholder="Search..."
              onInput={(value) => { searchValue = value; }}
              onSearch={() => { if (isMobile) showSearch = false; }}
            />
          </div>

          <!-- Close button (mobile only) -->
          {#if isMobile}
            <button
              class="ml-1 p-0.5 xs:p-1 rounded-full text-primary-800 hover:bg-primary-50"
              onclick={() => showSearch = false}
              aria-label="Close search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 xs:h-5 xs:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          {/if}
        </div>
      {/if}

      <!-- User Menu -->
      <div class="ml-1 xs:ml-2">
        <UserMenu username="John Doe" avatarText="J" />
      </div>
    </div>
  </header>

  <!-- Sidebar -->
  <aside class="sidebar-container {isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}">
    <Sidebar
      {companies}
      {selectedCompanyId}
      isOpen={!isMobile || isSidebarOpen}
      {isMobile}
      select={handleCompanySelect}
      toggle={toggleSidebar}
    />
  </aside>

  <!-- Overlay (Mobile only) -->
  {#if isMobile && isSidebarOpen}
    <div
      class="fixed inset-0 bg-black bg-opacity-50 z-20"
      onclick={() => toggleSidebar(false)}
      onkeydown={(e: KeyboardEvent) => e.key === 'Escape' && toggleSidebar(false)}
      role="button"
      tabindex="0"
      aria-label="Close sidebar"
    ></div>
  {/if}

  <!-- Main Content -->
  <main class="main-content overflow-auto bg-background dark:bg-gray-900">
    {#if currentMiniApp && miniapp}
      {@render miniapp()}
    {:else if defaultMiniapp}
      {@render defaultMiniapp()}
    {:else}
      <div class="flex items-center justify-center h-full">
        <p class="text-gray-500 dark:text-gray-400">Selecione uma empresa para começar</p>
      </div>
    {/if}
  </main>
</div>

<style>
  /* Grid Layout */
  .grid-template-app {
    display: grid;
    grid-template-areas:
      "header header"
      "sidebar main";
    grid-template-rows: 48px 1fr; /* Fixed header height */
    grid-template-columns: auto 1fr;
  }

  /* Header */
  header {
    grid-area: header;
    height: 48px;
    overflow: visible; /* Changed from hidden to visible to allow dropdown menus */
    z-index: 50;
  }

  /* Sidebar */
  .sidebar-container {
    grid-area: sidebar;
    position: relative;
    z-index: 25;
  }

  /* Main Content */
  .main-content {
    grid-area: main;
  }

  /* Responsive Sidebar */
  @media (max-width: 1023px) {
    .grid-template-app {
      grid-template-columns: 0 1fr;
    }

    .sidebar-closed {
      transform: translateX(-100%);
    }

    .sidebar-open {
      transform: translateX(0);
    }

    .sidebar-container {
      position: fixed;
      height: calc(100% - 48px); /* Altura total menos a altura do header */
      top: 48px;
      left: 0;
      transition: transform 0.3s ease-in-out;
      z-index: 25;
      width: 64px; /* Largura fixa do sidebar */
    }
  }
</style>