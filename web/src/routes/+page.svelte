<script lang="ts">
  import { CompanyMiniApp } from '$lib/components/miniapps/CompanyMiniApp';
  import AppLayout from '$lib/components/templates/AppLayout/AppLayout.svelte';
  import { DefaultContent } from '$lib/components/templates/DefaultContent';
  import type { MiniApp } from '$lib/types';
  import { mockCompanies, mockMiniApps } from '$lib/utils/mock';
</script>

{#snippet miniappContent(currentMiniApp: MiniApp | null)}
  {#if currentMiniApp}
    <CompanyMiniApp
      miniApp={currentMiniApp}
      company={mockCompanies.find(c => c.id === currentMiniApp.companyId) || mockCompanies[0]}
    />
  {/if}
{/snippet}

{#snippet defaultContent()}
  <DefaultContent />
{/snippet}

<div class="h-screen">
  <AppLayout
    companies={mockCompanies}
    miniApps={mockMiniApps}
    children={{
      miniapp: miniappContent,
      default: defaultContent
    }}
  />
</div>


