<script lang="ts">
  import { TabButton } from '$lib/components/molecules/TabButton';

  // Props
  let { tabs, activeTab, onTabChange } = $props<{
    tabs: Array<{
      id: string;
      label: string;
      icon?: string;
    }>;
    activeTab: string;
    onTabChange?: (tabId: string) => void;
  }>();

  function handleTabClick(tabId: string) {
    if (onTabChange) onTabChange(tabId);
  }
</script>

<div class="border-b border-border dark:border-gray-700 mb-4 relative">
  <div class="flex space-x-1">
    {#each tabs as tab}
      <div class="relative">
        <TabButton
          label={tab.label}
          icon={tab.icon}
          isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
        />
        {#if activeTab === tab.id}
          <div class="absolute bottom-0 left-0 w-full h-0.5 bg-primary-800 dark:bg-primary-300"></div>
        {/if}
      </div>
    {/each}
  </div>
</div>
