<script lang="ts">
  import { Badge } from '$lib/components/atoms/Badge';
  import { Tag } from '$lib/components/atoms/Tag';

  // Props
  let {
    title,
    imageUrl,
    price,
    points,
    tag,
    tagVariant = 'success',
    isFavorite = false,
    onFavoriteToggle,
    onSpend
  } = $props<{
    title: string;
    imageUrl: string;
    price: number;
    points: number;
    tag?: string;
    tagVariant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    isFavorite?: boolean;
    onFavoriteToggle?: () => void;
    onSpend?: () => void;
  }>();

  function handleFavoriteToggle() {
    if (onFavoriteToggle) onFavoriteToggle();
  }

  function handleSpend() {
    if (onSpend) onSpend();
  }

  // Icon render function
  function renderBellIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>`;
  }
</script>

<div class="bg-white rounded-xl p-3 sm:p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
  <div class="flex items-start">
    <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 mr-3 bg-primary-50">
      <img src={imageUrl} alt={title} class="w-full h-full object-cover" />
    </div>

    <div class="flex-1">
      <div class="flex justify-between items-start mb-2">
        <div>
          {#if tag}
            <div class="mb-1"><Tag text={tag} variant={tagVariant} size="xs" /></div>
          {/if}
          <h3 class="font-medium text-sm sm:text-base text-primary-900">{title}</h3>
        </div>

        <button
          class="focus:outline-none hover:scale-110 transition-transform"
          style="color: {isFavorite ? 'var(--color-primary-800)' : 'var(--color-primary-300)'};"
          onclick={handleFavoriteToggle}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div class="flex justify-between items-center">
        <button
          class="text-xs sm:text-sm font-medium px-2 py-1 rounded-full bg-primary-200 text-primary-800 hover:bg-primary-300 transition-colors"
          onclick={handleSpend}
        >
          Spend ${price}
        </button>

        <Badge count={points} variant="primary" size="sm" icon={renderBellIcon} />
      </div>
    </div>
  </div>
</div>
