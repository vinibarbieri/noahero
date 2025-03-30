<script lang="ts">
  import { Avatar } from '$lib/components/atoms/Avatar';
  import { BalanceCard } from '$lib/components/molecules/BalanceCard';
  import { Dialog } from '$lib/components/molecules/Dialog';
  
  // Props
  let {
    name = '',
    username = '',
    avatarUrl = '',
    isVerified = false,
    postsCount = 0,
    followersCount = 0,
    followingCount = 0,
    voucherBalance = 0,
    voucherCurrency = 'R$',
    bio = '',
    links = [],
    status = 'none',
    isOwnProfile = false,
    onFollowClick,
    onEditProfileClick,
    onShareProfileClick,
    onEditAvatarClick
  } = $props<{
    name: string;
    username: string;
    avatarUrl?: string;
    isVerified?: boolean;
    postsCount?: number;
    followersCount?: number;
    followingCount?: number;
    voucherBalance?: number;
    voucherCurrency?: string;
    bio?: string;
    links?: Array<{url: string, text: string}>;
    status?: 'none' | 'story' | 'live';
    isOwnProfile?: boolean;
    onFollowClick?: () => void;
    onEditProfileClick?: () => void;
    onShareProfileClick?: () => void;
    onEditAvatarClick?: () => void;
  }>();

  // Format numbers for display (e.g., 1500 -> 1.5 mil)
  function formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace('.0', '') + ' mi';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + ' mil';
    } else {
      return num.toString();
    }
  }

  function handleFollowClick() {
    if (onFollowClick) onFollowClick();
  }

  function handleEditProfileClick() {
    if (onEditProfileClick) onEditProfileClick();
  }

  function handleShareProfileClick() {
    if (onShareProfileClick) onShareProfileClick();
  }

  function handleEditAvatarClick(event: MouseEvent) {
    // Prevent the click from propagating to the avatar
    event.stopPropagation();
    if (onEditAvatarClick) onEditAvatarClick();
  }
  
  // Dialog state
  let isProfileDialogOpen = $state(false);
  
  function openProfileDialog() {
    isProfileDialogOpen = true;
  }
  
  function closeProfileDialog() {
    isProfileDialogOpen = false;
  }
  
  // Dialog content
  function getDialogContent() {
    return `
      <div class="text-sm">
        <!-- Username -->
        <div class="flex items-center gap-2 mb-3">
          <p class="text-lg font-semibold text-text dark:text-white">@${username}</p>
          ${isVerified ? `
            <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          ` : ''}
        </div>
        
        <!-- Bio -->
        ${bio ? `
          <div class="mb-4">
            <h3 class="font-medium text-gray-900 dark:text-white mb-1">Bio</h3>
            <p class="text-text dark:text-gray-300 whitespace-pre-line">${bio}</p>
          </div>
        ` : ''}

        <!-- Links -->
        ${links.length > 0 ? `
          <div class="mb-4">
            <h3 class="font-medium text-gray-900 dark:text-white mb-1">Links</h3>
            <div class="text-blue-600 dark:text-blue-400 flex flex-wrap gap-2">
              ${links.map(link => `
                <a 
                  href="${link.url}" 
                  class="hover:underline flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                  </svg>
                  ${link.text}
                </a>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Stats -->
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 class="font-medium text-gray-900 dark:text-white mb-2">Estatísticas</h3>
          <div class="flex gap-6 text-sm">
            <div>
              <span class="font-semibold text-text dark:text-white">${formatNumber(postsCount)}</span>
              <span class="text-text-secondary dark:text-gray-400"> posts</span>
            </div>
            <div>
              <span class="font-semibold text-text dark:text-white">${formatNumber(followersCount)}</span>
              <span class="text-text-secondary dark:text-gray-400"> seguidores</span>
            </div>
            <div>
              <span class="font-semibold text-text dark:text-white">${formatNumber(followingCount)}</span>
              <span class="text-text-secondary dark:text-gray-400"> seguindo</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
</script>

<div class="mb-6">
  <!-- Profile Header -->
  <div class="flex flex-col mb-4">
    <!-- Top Row: Avatar, Username, Balance Card -->
    <div class="flex items-start justify-between gap-2 mb-3">
      <!-- Left: Avatar and Username layout -->
      <div class="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 flex-grow sm:flex-grow-0 min-w-0">
        <!-- Avatar -->
        <div class="relative">
          <Avatar
            name={name}
            icon={avatarUrl}
            size="lg"
            status={status}
          />
          
          <!-- Edit Avatar Icon (only shown when isOwnProfile is true) -->
          {#if isOwnProfile}
            <button
              class="absolute bottom-0 right-0 bg-primary-700 dark:bg-primary-600 text-white rounded-full p-1 shadow-md hover:bg-primary-800 dark:hover:bg-primary-700 transition-colors"
              onclick={handleEditAvatarClick}
              aria-label="Edit profile picture"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          {/if}
        </div>

        <!-- Username and Verified Badge (mobile only) -->
        <div class="flex items-center gap-2 sm:hidden">
          <button 
            class="text-lg font-semibold text-text dark:text-white truncate hover:underline focus:outline-none"
            onclick={openProfileDialog}
          >
            {username}
          </button>
          {#if isVerified}
            <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          {/if}
        </div>
      </div>
      
      <!-- Balance Card (only shown when there's a balance) -->
      {#if voucherBalance > 0}
        <div class="w-24 xs:w-28 sm:w-32 md:w-40 shrink-0">
          <BalanceCard
            balance={voucherBalance}
            currency={voucherCurrency}
            title={isOwnProfile ? "Your Balance" : "Available"}
          />
        </div>
      {/if}
    </div>
    
    <!-- Middle Row: Username (desktop), Stats -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
      <!-- Username and Verified Badge (desktop only) -->
      <div class="hidden sm:flex items-center gap-2 min-w-0">
        <button 
          class="text-lg font-semibold text-text dark:text-white truncate hover:underline focus:outline-none"
          onclick={openProfileDialog}
        >
          {username}
        </button>
        {#if isVerified}
          <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        {/if}
      </div>
      
      <!-- Stats -->
      <div class="flex gap-4 text-sm">
        <div>
          <span class="font-semibold text-text dark:text-white">{formatNumber(postsCount)}</span>
          <span class="text-text-secondary dark:text-gray-400">posts</span>
        </div>
        <div>
          <span class="font-semibold text-text dark:text-white">{formatNumber(followersCount)}</span>
          <span class="text-text-secondary dark:text-gray-400">seguidores</span>
        </div>
        <div>
          <span class="font-semibold text-text dark:text-white">{formatNumber(followingCount)}</span>
          <span class="text-text-secondary dark:text-gray-400">seguindo</span>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Action Buttons -->
    <div class="flex gap-2 sm:ml-0">
      {#if isOwnProfile}
        <!-- Own Profile Actions -->
        <button
          class="px-4 py-1.5 bg-neutral-100 dark:bg-gray-700 text-text dark:text-white rounded-md text-sm font-medium hover:bg-neutral-200 dark:hover:bg-gray-600 transition-colors flex-1 sm:flex-none"
          onclick={handleEditProfileClick}
        >
          Editar perfil
        </button>
        <button
          class="px-4 py-1.5 bg-neutral-100 dark:bg-gray-700 text-text dark:text-white rounded-md text-sm font-medium hover:bg-neutral-200 dark:hover:bg-gray-600 transition-colors"
          onclick={handleShareProfileClick}
          aria-label="Compartilhar perfil"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
        </button>
      {:else}
        <!-- Other User Profile Actions -->
        <button
          class="px-4 py-1.5 bg-primary-700 dark:bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-800 dark:hover:bg-primary-700 transition-colors"
          onclick={handleFollowClick}
        >
          Seguir
        </button>
        <button class="px-4 py-1.5 bg-neutral-100 dark:bg-gray-700 text-text dark:text-white rounded-md text-sm font-medium hover:bg-neutral-200 dark:hover:bg-gray-600 transition-colors">
          Mensagem
        </button>
      {/if}
    </div>
  </div>
</div>

<!-- Profile Dialog -->
<Dialog 
  isOpen={isProfileDialogOpen} 
  title={name} 
  onClose={closeProfileDialog}
  children={getDialogContent()}
/>
