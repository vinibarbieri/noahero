<script lang="ts">
  // Props
  let {
    showRadialGradient = true,
    className = '',
    children = {},
    forceLightMode = false
  } = $props<{
    showRadialGradient?: boolean;
    className?: string;
    forceLightMode?: boolean;
    children?: {
      default?: () => any;
    };
  }>();
</script>

<main>
  <div
    class="relative flex flex-col min-h-[80vh] items-center justify-center bg-zinc-50 {forceLightMode ? '' : 'dark:bg-zinc-900'} text-slate-950 transition-bg {className}"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="
          [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
          [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
          [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
          [background-image:var(--white-gradient),var(--aurora)]
          {forceLightMode ? '' : 'dark:[background-image:var(--dark-gradient),var(--aurora)]'}
          [background-size:300%,_200%]
          [background-position:50%_50%,50%_50%]
          filter blur-[10px] invert {forceLightMode ? '' : 'dark:invert-0'}
          after:content-[''] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
          {forceLightMode ? '' : 'after:dark:[background-image:var(--dark-gradient),var(--aurora)]'}
          after:[background-size:200%,_100%]
          after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
          pointer-events-none
          absolute -inset-[10px] opacity-50 will-change-transform
          {showRadialGradient ? '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]' : ''}
        "
      ></div>
    </div>
    {#if children.default}
      {@render children.default()}
    {/if}
  </div>
</main>

<style>
  :global(:root) {
    --white: rgba(255, 255, 255, 1);
    --black: rgba(0, 0, 0, 1);
    --transparent: rgba(0, 0, 0, 0);
    --blue-300: rgba(147, 197, 253, 1);
    --blue-400: rgba(96, 165, 250, 1);
    --blue-500: rgba(59, 130, 246, 1);
    --indigo-300: rgba(165, 180, 252, 1);
    --violet-200: rgba(221, 214, 254, 1);
  }

  @keyframes aurora {
    0% {
      background-position: 0% 0%, 0% 0%;
    }
    50% {
      background-position: 100% 100%, 100% 100%;
    }
    100% {
      background-position: 0% 0%, 0% 0%;
    }
  }

  :global(.animate-aurora) {
    animation: aurora 10s linear infinite;
  }
</style>
