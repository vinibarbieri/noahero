<script lang="ts">
  import { NFTMarketplaceMiniApp } from '$lib/components/miniapps/NFTMarketplaceMiniApp';
  import { mockMiniApps } from '$lib/utils/mock';
  
  // Get the marketplace mini-app
  const marketplaceMiniApp = mockMiniApps.find(app => app.id === 'nft-marketplace');
</script>

{#if marketplaceMiniApp}
  <NFTMarketplaceMiniApp miniApp={marketplaceMiniApp} />
{:else}
  <div class="flex items-center justify-center h-screen">
    <p class="text-gray-500 dark:text-gray-400">Marketplace não encontrado</p>
  </div>
{/if}
