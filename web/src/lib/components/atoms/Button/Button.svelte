<script lang="ts">
  // Props
  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
    className = '',
    formaction = undefined,
    formmethod = undefined,
    formnovalidate = undefined,
    formtarget = undefined,
    name = undefined,
    value = undefined,
    children = {}
  } = $props<{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    formaction?: string;
    formmethod?: string;
    formnovalidate?: boolean;
    formtarget?: string;
    name?: string;
    value?: string;
    children?: {
      default?: () => any;
    };
  }>();

  // Computed classes
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white border-transparent',
    secondary: 'bg-zinc-200 hover:bg-zinc-300 text-zinc-900 border-transparent dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-100',
    outline: 'bg-transparent hover:bg-zinc-100 text-zinc-900 border-zinc-300 dark:text-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800',
    ghost: 'bg-transparent hover:bg-zinc-100 text-zinc-900 border-transparent dark:text-zinc-100 dark:hover:bg-zinc-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-transparent'
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-md',
    md: 'text-sm px-4 py-2 rounded-lg',
    lg: 'text-base px-6 py-3 rounded-lg'
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 disabled:opacity-50 disabled:pointer-events-none';

  // Use $derived instead of $: for reactive declarations in runes mode
  let buttonClasses = $derived(`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]} ${sizeClasses[size as keyof typeof sizeClasses]} ${className}`);

  // Event handler
  function handleClick(event: MouseEvent) {
    if (!disabled) {
      const clickEvent = new CustomEvent('click', { detail: event });
      event.target?.dispatchEvent(clickEvent);
    }
  }
</script>

<button
  {type}
  class={buttonClasses}
  {disabled}
  onclick={handleClick}
  {formaction}
  {formmethod}
  {formnovalidate}
  {formtarget}
  {name}
  {value}
>
  {#if children.default}
    {@render children.default()}
  {/if}
</button>
