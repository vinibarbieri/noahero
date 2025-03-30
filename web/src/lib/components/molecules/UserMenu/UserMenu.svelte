<script lang="ts">
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import { onDestroy, onMount } from 'svelte';

  // Props
  let {
    username = 'Usuário',
    avatarText = 'U'
  } = $props<{
    username?: string;
    avatarText?: string;
  }>();

  // State
  let isOpen = $state(false);
  let menuRef = $state<HTMLDivElement | null>(null);
  let buttonRef = $state<HTMLButtonElement | null>(null);
  let isBrowser = $state(false);

  // Lifecycle
  onMount(() => {
    isBrowser = true;
    if (isBrowser) {
      document.addEventListener('click', handleClickOutside);
    }
  });

  onDestroy(() => {
    if (isBrowser) {
      document.removeEventListener('click', handleClickOutside);
    }
  });

  // Functions
  function toggleMenu() {
    isOpen = !isOpen;
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      isBrowser &&
      isOpen &&
      menuRef &&
      buttonRef &&
      !menuRef.contains(event.target as Node) &&
      !buttonRef.contains(event.target as Node)
    ) {
      isOpen = false;
    }
  }
</script>

<div class="relative">
  <!-- Avatar Button -->
  <button
    bind:this={buttonRef}
    class="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-primary-800 dark:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-700"
    aria-label="Menu do usuário"
    aria-expanded={isOpen}
    aria-controls="user-menu"
    onclick={toggleMenu}
  >
    <div class="w-full h-full bg-primary-200 dark:bg-primary-700 flex items-center justify-center text-primary-800 dark:text-primary-50 font-bold text-xs xs:text-sm sm:text-base">
      {avatarText}
    </div>
  </button>

  <!-- Dropdown Menu -->
  {#if isOpen}
    <div
      id="user-menu"
      bind:this={menuRef}
      class="absolute right-0 mt-2 w-48 bg-surface dark:bg-gray-800 rounded-md shadow-lg py-1 z-[100] border border-border dark:border-gray-700"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      <!-- User Info -->
      <div class="px-4 py-2 border-b border-border dark:border-gray-700">
        <p class="text-sm font-medium text-text dark:text-white">{username}</p>
        <p class="text-xs text-text-secondary dark:text-gray-400">Configurações</p>
      </div>

      <!-- Menu Items -->
      <div class="py-1">
        <!-- Aparência -->
        <div class="px-4 py-2 flex items-center justify-between">
          <span class="text-sm text-text dark:text-gray-300">Aparência</span>
          <ThemeToggle />
        </div>

        <!-- Preferências -->
        <a
          href="#preferences"
          class="block px-4 py-2 text-sm text-text dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-gray-700"
          role="menuitem"
        >
          Preferências
        </a>

        <!-- Configurações -->
        <a
          href="#settings"
          class="block px-4 py-2 text-sm text-text dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-gray-700"
          role="menuitem"
        >
          Configurações
        </a>

        <!-- Divider -->
        <div class="border-t border-border dark:border-gray-700 my-1"></div>

        <!-- Sair -->
        <a
          href="#logout"
          class="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-gray-700"
          role="menuitem"
        >
          Sair
        </a>
      </div>
    </div>
  {/if}
</div>
