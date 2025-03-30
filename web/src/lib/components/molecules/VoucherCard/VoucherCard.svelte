<script lang="ts">
  import { AnimatedTooltip } from "$lib/components/ui/animated-tooltip";

  // Props
  let {
    id = '',
    name = '',
    image = '',
    price = 0,
    notForSale = false,
    timeRemaining = '',
    owners = [],
    onClick
  } = $props<{
    id: string;
    name: string;
    image: string;
    price?: number;
    notForSale?: boolean;
    timeRemaining?: string;
    owners?: Array<{
      id: number;
      name: string;
      designation: string;
      image: string;
    }>;
    onClick?: () => void;
  }>();

  // Manipular clique no card
  function handleClick() {
    if (onClick) onClick();
  }

  // Formatar ID para exibição
  function formatId(id: string): string {
    return id.startsWith('#') ? id : `#${id}`;
  }
</script>

<button
  class="relative bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer w-full text-left block"
  onclick={handleClick}
  onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && handleClick()}
  aria-label={`Ver detalhes de ${name} ${formatId(id)}`}
>
  <!-- Imagem do NFT (proporção fixa 1:1, tamanho recomendado: 500x500px) -->
  <div class="aspect-square w-full overflow-hidden bg-gray-300 dark:bg-gray-700">
    {#if image}
      <img src={image} alt={name} class="w-full h-full object-cover" />
    {:else}
      <div class="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    {/if}
  </div>

  <!-- Informações do NFT -->
  <div class="p-2 sm:p-2.5 md:p-3 bg-white dark:bg-gray-900 relative">

    <div class="absolute -top-5 sm:-top-6 md:-top-7 flex justify-between w-full items-center">
      <!-- Owners na interseção -->
      {#if owners && owners.length > 0}
        <AnimatedTooltip items={owners} maxItems={3} />
      {/if}

      <!-- Preço na interseção -->
      {#if price !== undefined && price > 0}
      <div class=" bg-white dark:bg-gray-800 rounded-lg shadow-md px-1.5 py-0.5 sm:px-2 sm:py-1 flex items-center text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 text-gray-700 dark:text-gray-300 mr-0.5 sm:mr-1" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
        </svg>
        <span class="text-[10px] sm:text-xs font-medium text-gray-900 dark:text-white">{price}</span>
      </div>
      {/if}
    </div>

    <div class="flex justify-between items-start mt-3">
      <!-- Título e Status -->
      <div>
        <div class="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{name}</div>
        <div class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">{formatId(id)}</div>
        {#if notForSale}
          <div class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">not for sale</div>
        {/if}
      </div>

      <!-- Badge de tempo restante -->
      {#if timeRemaining}
        <div class="bg-gray-800 dark:bg-gray-900 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
          <div class="text-[8px] sm:text-[10px] text-gray-400">Ending in</div>
          <div class="font-medium text-[10px] sm:text-xs">{timeRemaining}</div>
        </div>
      {/if}
    </div>
  </div>
</button>
