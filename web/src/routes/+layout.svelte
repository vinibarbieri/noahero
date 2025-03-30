<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import AppLayout from '$lib/components/templates/AppLayout/AppLayout.svelte';
	import { DefaultContent } from '$lib/components/templates/DefaultContent';
	import type { MiniApp } from '$lib/types';
	import { mockCompanies, mockMiniApps } from '$lib/utils/mock';
	import { page } from '$app/stores';
	
	// Determinar se estamos em uma página de empresa
	$: isCompanyPage = $page.url.pathname.startsWith('/company/');
	
	// Se estivermos em uma página de empresa, encontrar o miniApp correspondente
	$: currentSlug = isCompanyPage ? $page.url.pathname.split('/').pop() : null;
	$: currentCompany = currentSlug 
		? mockCompanies.find(c => c.href === `/company/${currentSlug}`) 
		: null;
	$: currentMiniApp = currentCompany 
		? mockMiniApps.find(app => app.companyId === currentCompany?.id) || null 
		: null;
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@100..900&display=swap" rel="stylesheet">
</svelte:head>

<ParaglideJS {i18n}>
	<div style="background-color: var(--color-background);" class="min-h-screen antialiased">
		{#snippet miniappContent(miniApp: MiniApp | null)}
			<slot />
		{/snippet}
		
		{#snippet defaultContent()}
			<DefaultContent />
		{/snippet}
		
		<div class="h-screen">
			<AppLayout
				companies={mockCompanies}
				miniApps={mockMiniApps}
				children={{
					miniapp: isCompanyPage ? miniappContent : undefined,
					default: isCompanyPage ? undefined : defaultContent
				}}
			/>
		</div>
	</div>
</ParaglideJS>
