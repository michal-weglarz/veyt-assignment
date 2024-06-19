<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import DataTable from './data-table.svelte';
	import { ArchiveXIcon, Loader2, LoaderIcon } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';

	export let data: PageData;

	let query = '';
	$: query = $page.url.searchParams.get('q') ?? '';
</script>

<div class="flex flex-col gap-2">
	<div>
		Search result(s) for: <span class="font-bold">{query}</span>
	</div>

	{#await data.quotes}
		<div class="flex flex-col items-center justify-center">
			<LoaderIcon class="animate-spin" />
			<span>Loading data...</span>
		</div>
	{:then quotes}
		{#if quotes.length > 0}
			<DataTable content={quotes} />
		{:else}
			<div class="mt-12 flex flex-col items-center justify-center gap-2">
				<ArchiveXIcon class="h-8 w-8" />
				<span>No stocks found. Please try a different search.</span>
			</div>
		{/if}
	{:catch error}
		<ErrorMessage content={JSON.parse(error).message} />
	{/await}
</div>
