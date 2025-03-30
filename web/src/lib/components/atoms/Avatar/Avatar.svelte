<script lang="ts">
  type Size = 'sm' | 'md' | 'lg';
  type Status = 'none' | 'story' | 'live';

  export let name: string;
  export let icon: string | undefined = undefined;
  export let href: string | undefined = undefined;
  export let isActive = false;
  export let size: Size = 'md';
  export let status: Status = 'none';

  const sizeClasses: Record<Size, string> = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const statusClasses: Record<Status, string> = {
    none: '',
    story: 'ring-2 ring-emerald-500 ring-offset-2',
    live: 'ring-2 ring-red-500 ring-offset-2'
  };

  $: initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  $: classes = `
    ${sizeClasses[size]}
    rounded-full
    flex
    items-center
    justify-center
    bg-primary-100 dark:bg-primary-700
    text-primary-700 dark:text-primary-100
    hover:bg-primary-200 dark:hover:bg-primary-600
    transition-all
    overflow-hidden
    ${isActive ? 'outline outline-2 outline-primary-500 dark:outline-primary-300 outline-offset-2' : ''}
    ${statusClasses[status]}
  `;
</script>

{#if href}
  <a {href} class="block" title={name}>
    <div class={classes} data-testid="avatar">
      {#if icon}
        <div class="w-full h-full relative">
          <img
            src={icon}
            alt={name}
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      {:else}
        {initials}
      {/if}
      {#if status === 'live'}
        <span class="absolute -bottom-1 right-0 w-3 h-3 bg-red-500 dark:bg-red-400 rounded-full animate-pulse"></span>
      {/if}
    </div>
  </a>
{:else}
  <div class={classes} data-testid="avatar">
    {#if icon}
      <div class="w-full h-full relative">
        <img
          src={icon}
          alt={name}
          class="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    {:else}
      {initials}
    {/if}
    {#if status === 'live'}
      <span class="absolute -bottom-1 right-0 w-3 h-3 bg-red-500 dark:bg-red-400 rounded-full animate-pulse"></span>
    {/if}
  </div>
{/if}