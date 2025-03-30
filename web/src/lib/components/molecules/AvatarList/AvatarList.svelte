<script lang="ts">
  import { Avatar } from '$lib/components/atoms/Avatar';
  import { createEventDispatcher } from 'svelte';

  interface AvatarItem {
    id: string;
    name: string;
    icon?: string;
    href: string;
    isActive?: boolean;
    status?: 'none' | 'story' | 'live';
  }

  export let items: AvatarItem[] = [];
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let gap: 'sm' | 'md' | 'lg' = 'md';
  export let selectedId: string | null = null;

  const dispatch = createEventDispatcher<{
    select: { item: AvatarItem };
  }>();

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  };

  function handleClick(item: AvatarItem) {
    dispatch('select', { item });
  }
</script>

<div
  class="flex flex-col items-center {gapClasses[gap]}"
  data-testid="avatar-list"
>
  {#each items as item (item.id)}
    <div class="cursor-pointer">
      <Avatar {...item} {size} on:click={() => handleClick(item)} />
    </div>
  {/each}
</div>