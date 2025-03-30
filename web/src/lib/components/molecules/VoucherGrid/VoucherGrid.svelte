<script lang="ts">
  import { VoucherCard } from '$lib/components/molecules/VoucherCard';

  // Props
  let {
    vouchers = [],
    title = 'NFTs Disponíveis',
    columns = 3,
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
    columns?: 2 | 3 | 4 | 5;
    onSeeMore?: () => void;
    onVoucherClick?: (id: string) => void;
  }>();

  // Manipular clique em um voucher
  function handleVoucherClick(id: string) {
    if (onVoucherClick) onVoucherClick(id);
  }

  // Manipular clique em "Ver mais"
  function handleSeeMore() {
    if (onSeeMore) onSeeMore();
  }

  // Determinar as classes de grid com base no número de colunas
  function getGridClasses(): string {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 5:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
      default:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    }
  }
</script>

<div>
  <!-- Cabeçalho -->
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
    {#if onSeeMore}
      <button
        class="text-sm text-primary-600 dark:text-primary-400 flex items-center"
        onclick={handleSeeMore}
        aria-label="Ver mais NFTs"
      >
        Ver mais
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    {/if}
  </div>

  <!-- Grid de vouchers -->
  <div class="grid {getGridClasses()} gap-4">
    {#each vouchers as voucher (voucher.id)}
      <div>
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
      <div class="col-span-full py-8 text-center text-gray-500 dark:text-gray-400">
        Nenhum NFT disponível no momento.
      </div>
    {/if}
  </div>
</div>
