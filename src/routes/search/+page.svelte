<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './data-table.svelte';
	import { ArchiveXIcon } from 'lucide-svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';

	export let data: PageData;
</script>

{#await data.quotes}
	<div class="space-y-4">
		<Skeleton class="h-32 w-full" />
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
