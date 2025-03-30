<script lang="ts">
  import { FilterChip } from '$lib/components/molecules/FilterChip';
  import { onMount } from 'svelte';

  // Props
  let { filters, activeFilter, onFilterChange } = $props<{
    filters: Array<{
      id: string;
      label: string;
    }>;
    activeFilter: string;
    onFilterChange?: (filterId: string) => void;
  }>();

  // State
  let scrollContainer: HTMLElement;
  let showLeftArrow = $state(false);
  let showRightArrow = $state(true);
  let containerElement: HTMLElement;

  // Lifecycle
  onMount(() => {
    checkArrows();
    scrollToActiveFilter();

    // Initialize gradient classes
    if (containerElement) {
      containerElement.classList.toggle('show-left-gradient', showLeftArrow);
      containerElement.classList.toggle('show-right-gradient', showRightArrow);
    }
  });

  // Functions
  function handleFilterClick(filterId: string) {
    if (onFilterChange) onFilterChange(filterId);
    // After a short delay, scroll to make the active filter visible
    setTimeout(scrollToActiveFilter, 100);
  }

  function checkArrows() {
    if (!scrollContainer) return;

    const wasLeftVisible = showLeftArrow;
    const wasRightVisible = showRightArrow;

    showLeftArrow = scrollContainer.scrollLeft > 0;
    showRightArrow = scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 10;

    // Update gradient classes when arrow visibility changes
    if (containerElement) {
      if (wasLeftVisible !== showLeftArrow) {
        containerElement.classList.toggle('show-left-gradient', showLeftArrow);
      }

      if (wasRightVisible !== showRightArrow) {
        containerElement.classList.toggle('show-right-gradient', showRightArrow);
      }
    }
  }

  function scrollLeftHandler() {
    if (!scrollContainer) return;
    scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
  }

  function scrollRight() {
    if (!scrollContainer) return;
    scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
  }

  function scrollToActiveFilter() {
    if (!scrollContainer) return;

    const activeElement = scrollContainer.querySelector('[aria-pressed="true"]');
    if (activeElement) {
      const containerWidth = scrollContainer.clientWidth;
      const activeElementLeft = activeElement.getBoundingClientRect().left;
      const containerLeft = scrollContainer.getBoundingClientRect().left;
      const activeElementRelativeLeft = activeElementLeft - containerLeft;

      // Center the active element
      const targetScroll = scrollContainer.scrollLeft + activeElementRelativeLeft - containerWidth / 2 + activeElement.clientWidth / 2;

      scrollContainer.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  }

  function handleScroll() {
    checkArrows();
  }

  // Keyboard navigation
  function handleKeyDown(e: KeyboardEvent) {
    if (!scrollContainer) return;

    switch (e.key) {
      case 'ArrowLeft':
        scrollLeftHandler();
        e.preventDefault();
        break;
      case 'ArrowRight':
        scrollRight();
        e.preventDefault();
        break;
      case 'Home':
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        e.preventDefault();
        break;
      case 'End':
        scrollContainer.scrollTo({ left: scrollContainer.scrollWidth, behavior: 'smooth' });
        e.preventDefault();
        break;
    }
  }

  $effect(() => {
    // When activeFilter changes, scroll to make it visible
    if (activeFilter) {
      setTimeout(scrollToActiveFilter, 100);
    }
  });
</script>

<div class="w-full overflow-x-hidden relative mb-4" bind:this={containerElement}>
  <!-- Left Arrow (desktop only) -->
  {#if showLeftArrow}
    <button
      class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 rounded-full p-1 shadow-md text-primary-800 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all h-7 w-7 hidden sm:flex items-center justify-center"
      onclick={scrollLeftHandler}
      aria-label="Scroll left"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  {/if}

  <!-- Filter Chips Container -->
  <div
    class="flex space-x-2 py-1 px-2 overflow-x-auto scrollbar-hide scroll-smooth flex-nowrap"
    bind:this={scrollContainer}
    onscroll={handleScroll}
    tabindex="0"
    role="tablist"
    aria-label="Filter options"
    onkeydown={handleKeyDown}
  >
    {#each filters as filter}
      <FilterChip
        label={filter.label}
        isActive={activeFilter === filter.id}
        onClick={() => handleFilterClick(filter.id)}
      />
    {/each}
  </div>

  <!-- Right Arrow (desktop only) -->
  {#if showRightArrow}
    <button
      class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 rounded-full p-1 shadow-md text-primary-800 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all h-7 w-7 hidden sm:flex items-center justify-center"
      onclick={scrollRight}
      aria-label="Scroll right"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  {/if}
</div>

<style>
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }

  /* Add gradient fade effect to indicate more content (desktop only) */
  @media (min-width: 640px) {
    .relative::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 24px;
      z-index: 5;
      pointer-events: none;
      background: linear-gradient(to right, var(--color-primary-50) 30%, transparent);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .relative::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 24px;
      z-index: 5;
      pointer-events: none;
      background: linear-gradient(to left, var(--color-primary-50) 30%, transparent);
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    /* Show gradients based on classes added via JavaScript */
    :global(.show-left-gradient)::before {
      opacity: 1 !important;
    }

    :global(.show-right-gradient)::after {
      opacity: 1 !important;
    }
  }
</style>
