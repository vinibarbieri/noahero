<script lang="ts">
  // Props
  let { label, isActive = false, onClick } = $props<{
    label: string;
    isActive?: boolean;
    onClick?: () => void;
  }>();

  function handleClick() {
    if (onClick) onClick();
  }
</script>

<button
  class="px-3 py-1 h-8 rounded-full text-sm font-medium focus:outline-none transition-colors whitespace-nowrap flex-shrink-0"
  class:bg-primary-700={isActive}
  class:dark:bg-primary-600={isActive}
  class:text-white={isActive}
  class:bg-primary-100={!isActive}
  class:dark:bg-gray-700={!isActive}
  class:text-primary-800={!isActive}
  class:dark:text-primary-200={!isActive}
  onclick={handleClick}
  role="tab"
  aria-selected={isActive}
>
  {label}
</button>
