<script lang="ts">
  // Props
  let { title, subtitle, imageUrl, actionText = 'Watch now', onClick } = $props<{
    title: string;
    subtitle?: string;
    imageUrl: string;
    actionText?: string;
    onClick?: () => void;
  }>();

  function handleClick() {
    if (onClick) onClick();
  }
</script>

<div class="rounded-xl p-3 sm:p-4 flex items-center justify-between mb-4 bg-primary-100 shadow-sm">
  <div class="flex-1 pr-3 sm:pr-4">
    <h3 class="font-medium text-sm sm:text-base mb-1 text-primary-800">{title}</h3>
    {#if subtitle}
      <p class="text-xs sm:text-sm mb-2 text-primary-800 opacity-90">{subtitle}</p>
    {/if}
    <button
      class="text-xs sm:text-sm font-medium flex items-center text-primary-800 hover:text-primary-700 transition-colors"
      onclick={handleClick}
    >
      {actionText}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
  <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-primary-200">
    <img src={imageUrl} alt={title} class="w-full h-full object-cover" />
  </div>
</div>
