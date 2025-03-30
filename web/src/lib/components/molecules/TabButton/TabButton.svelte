<script lang="ts">
  // Props
  let { label, icon, isActive = false, onClick } = $props<{
    label: string;
    icon?: string;
    isActive?: boolean;
    onClick?: () => void;
  }>();

  function handleClick() {
    if (onClick) onClick();
  }
</script>

<button
  class="flex items-center px-4 py-2 focus:outline-none font-medium relative {isActive ? 'text-primary-800 dark:text-primary-200' : 'text-primary-300 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300'}"
  onclick={handleClick}
  aria-selected={isActive}
  role="tab"
>
  {#if icon}
    <span class="mr-2">
      {@html icon}
    </span>
  {/if}
  <span>{label}</span>
  {#if isActive}
    <div class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-800 dark:bg-primary-300"></div>
  {/if}
</button>
