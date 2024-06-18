<script lang="ts">
	import { page } from '$app/stores';
	import { type StockData } from '$lib/types';
	import DataTable from './data-table.svelte';

	let query = '';
	$: query = $page.url.searchParams.get('q') ?? '';
	let searchResults: StockData = [];
	$: searchResults = $page.data.searchResults;
</script>

<div>search: {query}</div>
<DataTable data={searchResults} />
