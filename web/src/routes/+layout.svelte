<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@100..900&display=swap" rel="stylesheet">
</svelte:head>

<ParaglideJS {i18n}>
	<div style="background-color: var(--color-background);" class="min-h-screen antialiased">
		{@render children()}
	</div>
</ParaglideJS>
