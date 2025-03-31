<script lang="ts">
  import { UserWalletMiniApp } from '$lib/components/miniapps/UserWalletMiniApp';
  import { mockMiniApps } from '$lib/utils/mock';
  
  // Get the wallet mini-app
  const walletMiniApp = mockMiniApps.find(app => app.id === 'user-wallet');
</script>

{#if walletMiniApp}
  <UserWalletMiniApp miniApp={walletMiniApp} />
{:else}
  <div class="flex items-center justify-center h-screen">
    <p class="text-gray-500 dark:text-gray-400">Carteira não encontrada</p>
  </div>
{/if}
