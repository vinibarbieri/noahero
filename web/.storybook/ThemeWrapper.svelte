<script lang="ts">
  let { children, isDark = false } = $props();

  $effect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });
</script>

<div class:dark={isDark}>
  {@render children()}
</div> 