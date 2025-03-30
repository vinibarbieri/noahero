<script lang="ts">
  import { AvatarList } from '$lib/components/molecules/AvatarList';
  import type { Company } from '$lib/types';

  let { companies = [], selectedCompanyId = null, isOpen = true, select } = $props<{
    companies: Company[];
    selectedCompanyId: string | null;
    isOpen: boolean;
    isMobile?: boolean;
    select: (company: Company) => void;
    toggle?: (isOpen: boolean) => void;
  }>();

  function handleCompanySelect(event: CustomEvent<{ item: Company }>) {
    selectedCompanyId = event.detail.item.id;
    select(event.detail.item);
  }

  let avatarItems: Company[] = $state([]);

  $effect(() => {
    avatarItems = companies.map((company: Company) => ({
      ...company,
      isActive: company.id === selectedCompanyId
    }));
  });
</script>

<nav
  class="
    h-full
    bg-primary-700 dark:bg-gray-800
    flex flex-col
    transition-all duration-300 ease-in-out
    w-16
    shadow-lg
  "
  data-testid="sidebar"
>
  <!-- Removido o botão de toggle, agora está no header -->

  <!-- Container principal com padding para os indicadores de scroll -->
  <div class="relative flex-1 flex flex-col">
    <!-- Indicador de scroll superior -->
    <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-primary-700 dark:from-gray-800 to-transparent z-10"></div>

    <!-- Lista de Avatares com novo padding e mascara de scroll -->
    <div
      class="
        flex-1
        overflow-y-auto
        py-4
        px-2
        scrollbar-hide
        mask-fade-vertical
      "
    >
      <div class="h-2"></div>

      <AvatarList
        items={avatarItems}
        size="md"
        gap="md"
        on:select={handleCompanySelect}
      />

      <div class="h-2"></div>
    </div>

    <!-- Indicador de scroll inferior -->
    <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-primary-700 dark:from-gray-800 to-transparent z-10"></div>
  </div>
</nav>

<style>
  /* Esconde a scrollbar mas mantém a funcionalidade */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }

  /* Máscara de fade para os itens no topo e no fundo */
  .mask-fade-vertical {
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
    mask-image: linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%);
  }
</style>
