<script lang="ts">
  import { Dialog } from '$lib/components/molecules/Dialog';
  
  // Props
  let {
    isOpen = false,
    title = 'Compartilhar',
    profileName = '',
    profileUsername = '',
    profileUrl = '',
    onClose
  } = $props<{
    isOpen: boolean;
    title?: string;
    profileName: string;
    profileUsername: string;
    profileUrl: string;
    onClose?: () => void;
  }>();
  
  // Gerar URL de compartilhamento
  function getShareUrl(): string {
    // Se profileUrl já é uma URL completa, use-a
    if (profileUrl.startsWith('http')) {
      return profileUrl;
    }
    
    // Caso contrário, construa a URL completa
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}${profileUrl.startsWith('/') ? '' : '/'}${profileUrl}`;
  }
  
  // Funções de compartilhamento
  function shareViaFacebook() {
    const url = encodeURIComponent(getShareUrl());
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, '_blank');
  }
  
  function shareViaTwitter() {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Confira o perfil de ${profileName} (@${profileUsername})`);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(shareUrl, '_blank');
  }
  
  function shareViaLinkedIn() {
    const url = encodeURIComponent(getShareUrl());
    const title = encodeURIComponent(`Perfil de ${profileName}`);
    const summary = encodeURIComponent(`Confira o perfil de ${profileName} (@${profileUsername})`);
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`;
    window.open(shareUrl, '_blank');
  }
  
  function shareViaWhatsApp() {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Confira o perfil de ${profileName} (@${profileUsername}): ${getShareUrl()}`);
    const shareUrl = `https://wa.me/?text=${text}`;
    window.open(shareUrl, '_blank');
  }
  
  function shareViaTelegram() {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Confira o perfil de ${profileName} (@${profileUsername})`);
    const shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    window.open(shareUrl, '_blank');
  }
  
  function shareViaEmail() {
    const subject = encodeURIComponent(`Perfil de ${profileName} (@${profileUsername})`);
    const body = encodeURIComponent(`Confira o perfil de ${profileName} (@${profileUsername}): ${getShareUrl()}`);
    const shareUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(shareUrl);
  }
  
  function copyToClipboard() {
    navigator.clipboard.writeText(getShareUrl())
      .then(() => {
        showCopiedMessage = true;
        setTimeout(() => {
          showCopiedMessage = false;
        }, 2000);
      })
      .catch(err => {
        console.error('Erro ao copiar URL: ', err);
      });
  }
  
  // Estado para mensagem de copiado
  let showCopiedMessage = $state(false);
</script>

<Dialog 
  isOpen={isOpen} 
  title={title} 
  onClose={onClose}
>
  <div class="space-y-6">
    <!-- Mensagem introdutória -->
    <p class="text-sm text-gray-600 dark:text-gray-300">
      Compartilhe o perfil de <span class="font-semibold">{profileName}</span> (@{profileUsername}) com seus amigos e contatos.
    </p>
    
    <!-- Botões de compartilhamento -->
    <div class="grid grid-cols-3 gap-4">
      <!-- Facebook -->
      <button
        onclick={shareViaFacebook}
        class="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Compartilhar no Facebook"
      >
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
          </svg>
        </div>
        <span class="text-xs text-center dark:text-white">Facebook</span>
      </button>
      
      <!-- Twitter/X -->
      <button
        onclick={shareViaTwitter}
        class="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Compartilhar no Twitter/X"
      >
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
        <span class="text-xs text-center dark:text-white">Twitter/X</span>
      </button>
      
      <!-- LinkedIn -->
      <button
        onclick={shareViaLinkedIn}
        class="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Compartilhar no LinkedIn"
      >
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-700 text-white mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" />
            <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" />
            <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" />
          </svg>
        </div>
        <span class="text-xs text-center dark:text-white">LinkedIn</span>
      </button>
      
      <!-- WhatsApp -->
      <button
        onclick={shareViaWhatsApp}
        class="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Compartilhar no WhatsApp"
      >
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.415 14.382C17.117 14.233 15.656 13.515 15.384 13.415C15.112 13.316 14.914 13.267 14.715 13.565C14.517 13.861 13.948 14.531 13.775 14.729C13.601 14.928 13.428 14.952 13.131 14.804C12.834 14.654 11.876 14.341 10.741 13.329C9.858 12.541 9.261 11.568 9.088 11.27C8.915 10.973 9.069 10.812 9.218 10.664C9.352 10.531 9.516 10.317 9.664 10.144C9.813 9.97 9.862 9.846 9.961 9.647C10.061 9.449 10.012 9.275 9.937 9.126C9.862 8.978 9.268 7.515 9.02 6.92C8.779 6.341 8.534 6.419 8.352 6.41C8.178 6.402 7.98 6.4 7.782 6.4C7.584 6.4 7.262 6.474 6.99 6.772C6.717 7.07 5.95 7.788 5.95 9.251C5.95 10.714 7.014 12.127 7.163 12.325C7.312 12.523 9.258 15.525 12.239 16.812C12.949 17.118 13.502 17.301 13.933 17.437C14.645 17.664 15.293 17.632 15.805 17.555C16.376 17.47 17.563 16.836 17.811 16.142C18.059 15.448 18.059 14.853 17.984 14.729C17.91 14.605 17.712 14.531 17.415 14.382Z" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 21.25L3.6 16.3C2.775 14.8 2.334 13.136 2.334 11.417C2.334 6.25 6.5 2.084 11.667 2.084C16.834 2.084 21 6.25 21 11.417C21 16.584 16.834 20.75 11.667 20.75C9.948 20.75 8.284 20.309 6.784 19.484L2.5 21.25ZM7.184 17.9L7.584 18.15C8.834 18.9 10.234 19.334 11.667 19.334C16.05 19.334 19.584 15.8 19.584 11.417C19.584 7.034 16.05 3.5 11.667 3.5C7.284 3.5 3.75 7.034 3.75 11.417C3.75 12.85 4.184 14.25 4.934 15.5L5.184 15.9L4.55 18.534L7.184 17.9Z" />
          </svg>
        </div>
        <span class="text-xs text-center dark:text-white">WhatsApp</span>
      </button>
      
      <!-- Telegram -->
      <button
        onclick={shareViaTelegram}
        class="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Compartilhar no Telegram"
      >
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
        </div>
        <span class="text-xs text-center dark:text-white">Telegram</span>
      </button>
      
      <!-- Email -->
      <button
        onclick={shareViaEmail}
        class="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Compartilhar por Email"
      >
        <div class="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <span class="text-xs text-center dark:text-white">Email</span>
      </button>
    </div>
    
    <!-- Copiar link -->
    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center">
        <div class="flex-1 bg-gray-100 dark:bg-gray-700 rounded-l-md p-2 truncate text-sm">
          {getShareUrl()}
        </div>
        <button
          onclick={copyToClipboard}
          class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition-colors"
          aria-label="Copiar link"
        >
          {#if showCopiedMessage}
            <span class="text-sm">Copiado!</span>
          {:else}
            <span class="text-sm">Copiar</span>
          {/if}
        </button>
      </div>
    </div>
  </div>
</Dialog>
