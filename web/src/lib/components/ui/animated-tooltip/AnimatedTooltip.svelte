<script lang="ts">
  import { cn } from "$lib/utils";
  import { backOut, cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";
  import { fade, scale } from "svelte/transition";

  // Props
  let {
    items = [],
    className = "",
    maxItems = 3
  } = $props<{
    items: {
      id: number;
      name: string;
      designation: string;
      image: string;
    }[];
    className?: string;
    maxItems?: number;
  }>();

  // Estado
  let hoveredIndex = $state<number | null>(null);
  let x = $state(0);
  let tooltipElements: HTMLDivElement[] = [];

  // Limitar o número de itens exibidos
  let displayedItems = $derived(items.slice(0, maxItems));

  // Valores de movimento
  const rotateSpring = tweened(0, {
    duration: 300,
    easing: cubicOut
  });

  const translateXSpring = tweened(0, {
    duration: 300,
    easing: cubicOut
  });

  // Atualizar springs quando x muda
  $effect(() => {
    const rotateValue = (x / 100) * 45;
    const translateValue = (x / 100) * 50;

    rotateSpring.set(rotateValue);
    translateXSpring.set(translateValue);
  });

  // Manipulador de movimento do mouse
  function handleMouseMove(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const halfWidth = target.offsetWidth / 2;
    x = event.offsetX - halfWidth;
  }

  // Manipuladores de hover
  function handleMouseEnter(id: number) {
    hoveredIndex = id;
  }

  function handleMouseLeave() {
    hoveredIndex = null;
  }
</script>

<div class={cn("flex items-center gap-2", className)}>
  {#each displayedItems as item, index (item.id)}
    <div
      class="-mr-4 relative group"
      onmouseenter={() => handleMouseEnter(item.id)}
      onmouseleave={handleMouseLeave}
      role="button"
      tabindex="0"
      aria-label={`Ver detalhes de ${item.name}`}
      onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && handleMouseEnter(item.id)}
    >
      {#if hoveredIndex === item.id}
        <div
          bind:this={tooltipElements[index]}
          class="absolute -top-12 sm:-top-14 md:-top-16 -left-1/2 translate-x-1/2 flex text-[10px] sm:text-xs flex-col items-center justify-center rounded-md bg-foreground z-50 shadow-xl px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2"
          style="transform: translateX({$translateXSpring}px) rotate({$rotateSpring}deg); white-space: nowrap;"
          in:scale={{
            start: 0.6,
            opacity: 0,
            duration: 300,
            easing: backOut
          }}
          out:fade={{ duration: 200 }}
        >
          <div class="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px"></div>
          <div class="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px"></div>
          <div class="font-bold text-background relative z-30 text-xs sm:text-sm md:text-base">
            {item.name}
          </div>
          <div class="text-muted-foreground text-[8px] sm:text-[10px] md:text-xs">
            {item.designation}
          </div>
        </div>
      {/if}

      <img
        onmousemove={handleMouseMove}
        src={item.image}
        alt={item.name}
        class="object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 border-2 group-hover:scale-105 group-hover:z-30 border-background relative transition duration-500"
      />
    </div>
  {/each}

  {#if items.length > maxItems}
    <div class="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-xs md:text-sm font-medium">
      +{items.length - maxItems}
    </div>
  {/if}
</div>
