<script lang="ts">
  // Props
  let { text, variant = 'default', size = 'sm', icon } = $props<{
    text: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    size?: 'xs' | 'sm' | 'md';
    icon?: () => any;
  }>();

  // Classes
  const variantClasses = {
    default: 'bg-primary-100 text-primary-800',
    primary: 'bg-primary-200 text-primary-800',
    success: 'bg-primary-200 text-primary-800',
    warning: 'bg-primary-300 text-primary-800',
    danger: 'bg-primary-300 text-white'
  };

  const sizeClasses = {
    xs: 'text-xs px-1.5 py-0.5',
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1'
  };
</script>

<span class="inline-flex items-center rounded-full font-medium {variantClasses[variant]} {sizeClasses[size]}">
  {#if icon}
    <span class="mr-1">
      {@render icon()}
    </span>
  {/if}
  <span>
    {text}
  </span>
</span>
