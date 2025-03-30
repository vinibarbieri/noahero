<script lang="ts">
  // Props
  let { count, variant = 'primary', size = 'md', icon } = $props<{
    count: number;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: () => any;
  }>();

  // Computed
  $effect(() => {
    // Format count if it's a large number (e.g., 1200 -> 1.2k)
    formattedCount = count > 999 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  });

  let formattedCount = $state('');

  // Classes
  const variantClasses = {
    primary: 'bg-primary-200 text-primary-800',
    secondary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800'
  };

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-2.5 py-1.5'
  };
</script>

<span class="inline-flex items-center rounded-full font-medium {variantClasses[variant]} {sizeClasses[size]}">
  {#if icon}
    <span class="mr-1">
      {@render icon()}
    </span>
  {/if}
  <span>
    {formattedCount}
  </span>
</span>
