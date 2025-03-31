<script lang="ts">
import { page } from '$app/stores'; // Using deprecated import for compatibility
import AppLayout from '$lib/components/templates/AppLayout/AppLayout.svelte';
import { i18n } from '$lib/i18n';
import type { MiniApp } from '$lib/types';
import { mockCompanies, mockMiniApps } from '$lib/utils/mock';
import { ParaglideJS } from '@inlang/paraglide-sveltekit';
import '../app.css';
// Import VoucherProvider and context
import DefaultContent from '$lib/components/templates/DefaultContent/DefaultContent.svelte';
import VoucherProvider from '$lib/providers/VoucherProvider.svelte';

// Determinar se estamos em uma página de empresa, marketplace ou carteira
$: isCompanyPage = $page.url.pathname.startsWith('/company/');
$: isMarketplacePage = $page.url.pathname.startsWith('/marketplace');
$: isWalletPage = $page.url.pathname.startsWith('/wallet');
</script>

<svelte:head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@100..900&display=swap" rel="stylesheet">
</svelte:head>

<ParaglideJS {i18n}>
  <VoucherProvider>
    <div style="background-color: var(--color-background);" class="min-h-screen antialiased">
      <div class="h-screen">
        {#if ($page.url.pathname === '/landing')}
          <slot />
        {:else}
          <AppLayout
            companies={mockCompanies}
            miniApps={mockMiniApps}
          >
          {#snippet miniapp(_miniApp: MiniApp | null)}
            <slot />
          {/snippet}

          {#snippet defaultMiniapp()}
            <DefaultContent />
          {/snippet}
        </AppLayout>
        {/if}
      </div>
    </div>
  </VoucherProvider>
</ParaglideJS>
