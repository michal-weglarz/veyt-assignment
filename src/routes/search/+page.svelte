<script lang="ts">
	import { page } from '$app/stores';
	import type { StockData } from '$lib/types';

	let query = '';
	let searchResults: Array<StockData> = [];
	$: query = $page.url.searchParams.get('q') ?? '';
	$: searchResults = $page.data.searchResults;
</script>

<div>search: {query}</div>

{#each searchResults as result}
	<li>{result.name}</li>
{/each}
