<script lang="ts">
  import '$lib/styles/animations.css';

  // Props
  let {
    isOpen = false,
    title = '',
    onClose,
    children,
    isMobileFullPage = true
  } = $props<{
    isOpen: boolean;
    title?: string;
    onClose?: () => void;
    children?: any;
    isMobileFullPage?: boolean;
  }>();

  // Estado interno
  let startY = $state(0);
  let currentY = $state(0);
  let isDragging = $state(false);
  let translateY = $state(0);
  let dialogOpacity = $state(1);
  let backdropOpacity = $state(1);
  let isMobile = $state(false);
  let isClosing = $state(false);
  let showHint = $state(false);

  // Verificar se é dispositivo móvel
  function checkMobile() {
    isMobile = window.innerWidth < 640;
  }

  // Adicionar uma dica visual para o usuário quando o dialog é aberto em dispositivos móveis
  function showSwipeHint() {
    if (!isMobile) return;

    // Mostrar a dica textual
    showHint = true;

    // Esconder a dica após 3 segundos
    setTimeout(() => {
      showHint = false;
    }, 3000);

    const indicator = document.querySelector('.drag-indicator') as HTMLElement;
    if (indicator) {
      // Animar o indicador para cima e para baixo brevemente
      indicator.classList.add('animate-pulse');

      // Remover a animação após 2 segundos
      setTimeout(() => {
        indicator.classList.remove('animate-pulse');
      }, 2000);
    }
  }

  // Funções para o gesto de arrastar
  function handleTouchStart(event: TouchEvent) {
    if (!isMobile) return;

    const touch = event.touches[0];
    startY = touch.clientY;
    currentY = startY;
    isDragging = true;
    translateY = 0;
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isDragging || !isMobile) return;

    const touch = event.touches[0];
    currentY = touch.clientY;

    // Só permitir arrastar para baixo
    if (currentY > startY) {
      // Aplicar o deslocamento diretamente para seguir o dedo
      // Adicionar um fator de resistência para tornar o movimento mais natural
      const delta = currentY - startY;
      translateY = delta * 0.8; // Fator de resistência de 0.8

      // Calcular a opacidade com base no deslocamento
      const threshold = Math.min(300, window.innerHeight * 0.5);
      dialogOpacity = Math.max(0.5, 1 - (translateY / threshold) * 0.5);
      backdropOpacity = Math.max(0.1, 1 - (translateY / threshold) * 0.9);

      event.preventDefault();
    }
  }

  function handleTouchEnd() {
    if (!isDragging || !isMobile) return;

    // Se arrastou mais de 100px ou mais de 30% da altura do dialog, fechar o dialog
    const threshold = Math.min(100, window.innerHeight * 0.3);

    if (translateY > threshold) {
      // Aplicar a animação de saída a partir da posição atual
      const currentPosition = translateY;

      // Manipular diretamente o DOM para animação contínua
      const dialogElement = document.querySelector('.dialog-content') as HTMLElement;
      if (dialogElement) {
        dialogElement.style.transition = 'none';
        dialogElement.style.transform = `translateY(${currentPosition}px)`;

        // Forçar um reflow para aplicar as mudanças imediatamente
        dialogElement.offsetHeight;

        // Reativar a transição e animar para a posição final
        dialogElement.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        dialogElement.style.transform = `translateY(${window.innerHeight}px)`;
        dialogElement.style.opacity = '0';
      }

      // Animar o backdrop
      const backdropElement = document.querySelector('.dialog-backdrop') as HTMLElement;
      if (backdropElement) {
        backdropElement.style.opacity = '0';
      }

      // Marcar como fechando
      isDragging = false;
      isClosing = true;

      // Dar tempo para a animação de saída ser executada antes de fechar o dialog
      setTimeout(() => {
        isClosing = false;
        translateY = 0;
        dialogOpacity = 1;
        backdropOpacity = 1;
        if (onClose) onClose();
      }, 300);
    } else {
      // Resetar a posição e opacidade com animação
      isDragging = false;
      translateY = 0;
      dialogOpacity = 1;
      backdropOpacity = 1;
    }
  }

  function closeDialog() {
    if (onClose) {
      // Animar saída
      isClosing = true;
      translateY = window.innerHeight;
      dialogOpacity = 0;
      backdropOpacity = 0;

      // Dar tempo para a animação de saída ser executada antes de fechar o dialog
      setTimeout(() => {
        isClosing = false;
        translateY = 0;
        dialogOpacity = 1;
        backdropOpacity = 1;
        onClose();
      }, 300);
    }
  }

  // Lifecycle
  $effect(() => {
    // Verificar se é dispositivo móvel quando o componente é montado
    if (typeof window !== 'undefined') {
      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  });

  // Animar entrada quando o dialog é aberto
  $effect(() => {
    if (isOpen) {
      if (isMobile) {
        // Iniciar fora da tela
        translateY = window.innerHeight;

        // Animar entrada com um pequeno atraso para garantir que o valor inicial seja aplicado
        setTimeout(() => {
          translateY = 0;

          // Mostrar dica visual após a animação de entrada
          setTimeout(showSwipeHint, 500);
        }, 50);
      }
    }
  });
</script>

<svelte:window onkeydown={(e: KeyboardEvent) => e.key === 'Escape' && closeDialog()} />

{#if isOpen}
  <!-- Backdrop with blur -->
  <div
    class="dialog-backdrop fixed inset-0 z-50 flex items-end sm:items-center justify-center {isMobile && isMobileFullPage ? 'p-0' : 'p-4'} backdrop-blur-md bg-black/30 dark:bg-black/40 {!isDragging && (isClosing ? 'animate-fade-out' : 'animate-fade-in')}"
    style="opacity: {backdropOpacity}; transition: opacity 0.3s ease-out;"
    role="presentation"
  >
    <!-- Invisible backdrop for click handling -->
    <button
      class="fixed inset-0 w-full h-full cursor-default"
      onclick={closeDialog}
      aria-label="Close dialog"
    ></button>

    <!-- Dialog content -->
    <div
      class="dialog-content bg-white/95 dark:bg-gray-800/95 {isMobile && isMobileFullPage ? 'fixed inset-0 rounded-none' : 'rounded-t-lg sm:rounded-lg max-w-md max-h-[90vh]'} shadow-xl w-full overflow-hidden flex flex-col relative z-10 {!isDragging && (isClosing ? 'animate-slide-down' : 'animate-slide-up')}"
      style="transform: translateY({translateY}px); opacity: {dialogOpacity}; transition: {isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out'}; {isMobile && isMobileFullPage ? 'height: 100dvh; max-height: 100dvh;' : ''}"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <!-- Eventos de toque são gerenciados no cabeçalho -->
      <!-- Header (com suporte a arrastar para fechar em dispositivos móveis) -->
      <div
        class="flex items-center justify-between p-4 border-b border-gray-200/70 dark:border-gray-700/70"
        ontouchstart={handleTouchStart}
        ontouchmove={handleTouchMove}
        ontouchend={handleTouchEnd}
      >
        <!-- Drag indicator for mobile -->
        {#if isMobile}
          <div class="absolute top-0 left-0 right-0 h-10 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing">
            <div class="drag-indicator w-16 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            {#if showHint}
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 animate-fade-in">Arraste para fechar</div>
            {/if}
          </div>
        {/if}

        <div class={isMobile ? "mt-4 w-full" : ""}>
          {#if title}
            <h2 id="dialog-title" class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          {:else}
            <div></div>
          {/if}
        </div>

        <!-- Close button (only on desktop) -->
        {#if !isMobile}
          <button
            class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onclick={closeDialog}
            aria-label="Close dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
      </div>

      <!-- Content -->
      <div class="p-4 overflow-y-auto flex-1 {isMobile && isMobileFullPage ? 'pb-safe' : ''}">
        {#if typeof children === 'string'}
          {@html children}
        {:else if typeof children === 'function'}
          {@render children()}
        {:else}
          {children}
        {/if}
      </div>
    </div>
  </div>
{/if}
