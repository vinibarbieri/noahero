<script lang="ts">
  import { VoucherCard } from '$lib/components/molecules/VoucherCard';

  // Props
  let {
    vouchers = [],
    title = 'NFTs Disponíveis',
    onSeeMore,
    onVoucherClick
  } = $props<{
    vouchers: Array<{
      id: string;
      name: string;
      image?: string;
      price?: number;
      timeRemaining?: string;
      notForSale?: boolean;
      owners?: Array<{
        id: number;
        name: string;
        designation: string;
        image: string;
      }>;
    }>;
    title?: string;
    onSeeMore?: () => void;
    onVoucherClick?: (id: string) => void;
  }>();

  // Estado local
  let scrollContainer = $state<HTMLDivElement | null>(null);
  let showLeftArrow = $state(false);
  let showRightArrow = $state(false);

  // Verificar se deve mostrar as setas de navegação
  function checkScrollPosition() {
    if (!scrollContainer) return;

    // Mostrar seta esquerda se não estiver no início
    showLeftArrow = scrollContainer.scrollLeft > 0;

    // Mostrar seta direita se não estiver no final
    showRightArrow = scrollContainer.scrollLeft < (scrollContainer.scrollWidth - scrollContainer.clientWidth - 10);
  }

  // Rolar para a esquerda
  function scrollLeft() {
    if (!scrollContainer) return;
    scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
  }

  // Rolar para a direita
  function scrollRight() {
    if (!scrollContainer) return;
    scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
  }

  // Manipular clique em um voucher
  function handleVoucherClick(id: string) {
    if (onVoucherClick) onVoucherClick(id);
  }

  // Manipular clique em "Ver mais"
  function handleSeeMore() {
    if (onSeeMore) onSeeMore();
  }

  // Efeito para verificar a posição de rolagem
  $effect(() => {
    if (scrollContainer) {
      checkScrollPosition();

      // Adicionar listener para eventos de rolagem
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);

      return () => {
        scrollContainer?.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  });
</script>

<div class="relative">
  <!-- Cabeçalho -->
  <div class="flex justify-between items-center mb-3">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
    <button
      class="text-sm text-primary-600 dark:text-primary-400 flex items-center"
      onclick={handleSeeMore}
    >
      Ver mais
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  <!-- Seta de navegação esquerda -->
  {#if showLeftArrow}
    <button
      class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full shadow-md p-1 flex items-center justify-center"
      onclick={scrollLeft}
      aria-label="Rolar para a esquerda"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  {/if}

  <!-- Seta de navegação direita -->
  {#if showRightArrow}
    <button
      class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full shadow-md p-1 flex items-center justify-center"
      onclick={scrollRight}
      aria-label="Rolar para a direita"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  {/if}

  <!-- Container de rolagem -->
  <div
    bind:this={scrollContainer}
    class="flex overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
    style="scroll-padding: 0 1rem;"
  >
    {#each vouchers as voucher (voucher.id)}
      <div class="flex-shrink-0 w-[180px] mr-3 snap-start">
        <VoucherCard
          id={voucher.id}
          name={voucher.name}
          image={voucher.image}
          price={voucher.price}
          timeRemaining={voucher.timeRemaining}
          notForSale={voucher.notForSale}
          owners={voucher.owners}
          onClick={() => handleVoucherClick(voucher.id)}
        />
      </div>
    {/each}

    {#if vouchers.length === 0}
      <div class="w-full py-8 text-center text-gray-500 dark:text-gray-400">
        Nenhum NFT disponível no momento.
      </div>
    {/if}
  </div>
</div>

<style>
  /* Esconder a barra de rolagem, mas manter a funcionalidade */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
</style>
