<script lang="ts">
  // Props
  let {
    value = '',
    placeholder = 'Search...',
    label,
    description,
    errorMessage,
    disabled = false,
    className = '',
    onSearch,
    onClear,
    onInput
  } = $props<{
    value?: string;
    placeholder?: string;
    label?: string;
    description?: string;
    errorMessage?: string;
    disabled?: boolean;
    className?: string;
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

  // Render functions
  function renderSearchIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 text-muted-foreground">
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

<div class="group flex flex-col gap-2 {className}">
  {#if label}
    <label for="search-field" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </label>
  {/if}

  <form
    onsubmit={handleSubmit}
    class="relative"
  >
    <div
      class="flex h-10 w-full items-center overflow-hidden rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background
        {focused ? 'ring-2 ring-ring ring-offset-2 outline-none' : ''}
        {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
    >
      <span class="mr-2" aria-hidden="true">
        {@html renderSearchIcon()}
      </span>

      <input
        bind:this={inputElement}
        type="search"
        id="search-field"
        class="min-w-0 flex-1 bg-background px-2 py-1.5 outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
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
          class="mr-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onclick={handleClear}
          aria-label="Clear search"
          disabled={disabled}
        >
          {@html renderClearIcon()}
        </button>
      {/if}
    </div>
  </form>

  {#if description && !errorMessage}
    <p class="text-sm text-muted-foreground">
      {description}
    </p>
  {/if}

  {#if errorMessage}
    <p class="text-sm font-medium text-destructive">
      {errorMessage}
    </p>
  {/if}
</div>
