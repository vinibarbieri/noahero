<script lang="ts">
  // Props
  let { items, activeItem, onItemClick } = $props<{
    items: Array<{
      id: string;
      label: string;
      icon: string;
    }>;
    activeItem: string;
    onItemClick?: (itemId: string) => void;
  }>();

  function handleItemClick(itemId: string) {
    if (onItemClick) onItemClick(itemId);
  }
</script>

<div class="fixed bottom-0 left-0 right-0 bg-white border-t px-2 sm:px-4 py-2 shadow-md border-primary-100">
  <div class="max-w-screen-md mx-auto w-full">
    <div class="flex justify-around">
      {#each items as item}
        <button
          class="flex flex-col items-center justify-center px-2 py-1 transition-colors"
          style="color: {activeItem === item.id ? 'var(--color-primary-800)' : 'var(--color-primary-300)'}"
          onclick={() => handleItemClick(item.id)}
          aria-label={item.label}
          aria-current={activeItem === item.id ? 'page' : undefined}
        >
          {@html item.icon}
          <span class="text-xs mt-1 font-medium">{item.label}</span>
        </button>
      {/each}
    </div>
  </div>
</div>

<!-- Spacer to prevent content from being hidden behind the bottom navigation -->
<div class="h-16 sm:h-20"></div>
