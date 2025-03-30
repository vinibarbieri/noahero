<script lang="ts">
  import { onMount } from "svelte";
  
  let isDark = false;

  onMount(() => {
    isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  })

  function toggleTheme() {
    isDark = !isDark
    document.documentElement.classList.toggle('dark', !isDark)
    localStorage.theme = isDark ? 'dark' : 'light'
  }
</script>

<button
  class="p-2 rounded-lg transition-colors bg-surface border-border text-text"
  on:click={toggleTheme}
>
  {#if !isDark}
    🌞
  {:else}
    🌙
  {/if}
</button> 