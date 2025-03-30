<script lang="ts">
  // Props
  let {
    value = '',
    placeholder = 'Search...',
    disabled = false,
    className = '',
    onClick,
    onSearch,
    onClear,
    onInput
  } = $props<{
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    onSearch?: (value: string) => void;
    onClear?: () => void;
    onInput?: (value: string) => void;
  }>();

  // State
  let focused = $state(false);
  let inputElement = $state<HTMLInputElement | null>(null);

  // Computed
  $effect(() => {
    // Ensure the input element value is synced with the component value
    if (inputElement && inputElement.value !== value) {
      inputElement.value = value;
    }
  });

  // Functions
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    if (onInput) onInput(value);
  }

  function handleClear() {
    value = '';
    if (onClear) onClear();
    inputElement?.focus();
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    if (onSearch) onSearch(value);
  }

  function handleFocus() {
    focused = true;
  }

  function handleBlur() {
    focused = false;
  }

  function handleClick() {
    if (onClick) onClick();
  }

  // Render functions
  function renderSearchIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3 xs:size-4 text-primary-800">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>`;
  }

  function renderClearIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </svg>`;
  }
</script>

<div class="group {className}">
  <form
    onsubmit={handleSubmit}
    class="relative"
  >
    {#if onClick}
      <button
        type="button"
        class="flex h-10 w-full items-center overflow-hidden rounded-full bg-primary-50 px-3 py-2 text-sm text-primary-800
          {focused ? 'ring-2 ring-primary-300 outline-none' : ''}
          {disabled ? 'opacity-50 cursor-not-allowed' : ''}
          cursor-pointer"
        onclick={handleClick}
        disabled={disabled}
      >
        <span class="mr-2" aria-hidden="true">
          {@html renderSearchIcon()}
        </span>
        <span class="flex-1 text-left">{placeholder}</span>
      </button>
    {:else}
      <div
        class="flex h-8 xs:h-9 sm:h-10 w-full items-center overflow-hidden rounded-full bg-primary-50 px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 sm:py-2 text-xs xs:text-sm text-primary-800
          {focused ? 'ring-1 xs:ring-2 ring-primary-300 outline-none' : ''}
          {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
      >
        <span class="mr-0.5 xs:mr-1 sm:mr-2" aria-hidden="true">
          {@html renderSearchIcon()}
        </span>

        <input
          bind:this={inputElement}
          type="search"
          class="min-w-0 flex-1 bg-transparent px-0 py-0 text-xs xs:text-sm outline-none focus:outline-none border-none focus:border-none focus:ring-0 appearance-none placeholder:text-primary-400 [&::-webkit-search-cancel-button]:hidden"
          placeholder={placeholder}
          bind:value
          disabled={disabled}
          oninput={handleInput}
          onfocus={handleFocus}
          onblur={handleBlur}
        />

        {#if value}
          <button
            type="button"
            class="ml-1 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-300"
            onclick={handleClear}
            aria-label="Clear search"
            disabled={disabled}
          >
            {@html renderClearIcon()}
          </button>
        {/if}
      </div>
    {/if}
  </form>
</div>
