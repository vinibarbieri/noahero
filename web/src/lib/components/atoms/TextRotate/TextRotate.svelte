<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';

  // Props
  let {
    texts = [],
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    className = ''
  } = $props<{
    texts: string[];
    rotationInterval?: number;
    staggerDuration?: number;
    staggerFrom?: 'first' | 'last' | 'center' | 'random';
    loop?: boolean;
    auto?: boolean;
    splitBy?: 'words' | 'characters' | 'lines' | string;
    className?: string;
  }>();

  // State
  let currentTextIndex = $state(0);
  let elements = $state<string[]>([]);
  let intervalId: number | undefined;

  // Computed
  $effect(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === 'characters') {
      elements = currentText.split('');
    } else if (splitBy === 'words') {
      elements = currentText.split(' ');
    } else if (splitBy === 'lines') {
      elements = currentText.split('\n');
    } else {
      elements = currentText.split(splitBy);
    }
  });

  // Methods
  function getStaggerDelay(index: number, totalChars: number): number {
    if (staggerFrom === 'first') return index * staggerDuration;
    if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration;
    if (staggerFrom === 'center') {
      const center = Math.floor(totalChars / 2);
      return Math.abs(center - index) * staggerDuration;
    }
    if (staggerFrom === 'random') {
      const randomIndex = Math.floor(Math.random() * totalChars);
      return Math.abs(randomIndex - index) * staggerDuration;
    }
    return 0;
  }

  function next() {
    currentTextIndex = currentTextIndex === texts.length - 1
      ? (loop ? 0 : currentTextIndex)
      : currentTextIndex + 1;

    // Dispatch event using CustomEvent
    const nextEvent = new CustomEvent('next', { detail: { index: currentTextIndex } });
    document.dispatchEvent(nextEvent);
  }

  // Lifecycle
  onMount(() => {
    if (auto) {
      intervalId = window.setInterval(next, rotationInterval);
    }
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<span class="flex flex-wrap whitespace-pre-wrap {className}">
  <span class="sr-only">{texts[currentTextIndex]}</span>

  {#key currentTextIndex}
    <span class="flex flex-wrap">
      {#each elements as element, i}
        <span
          in:fly={{
            y: 20,
            delay: getStaggerDelay(i, elements.length),
            duration: 400,
            easing: cubicOut
          }}
          out:fly={{
            y: -20,
            duration: 200
          }}
          class="inline-block"
        >
          {element}
        </span>
      {/each}
    </span>
  {/key}
</span>
