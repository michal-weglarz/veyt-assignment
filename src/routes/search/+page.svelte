<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import DataTable from './data-table.svelte';

	export let data: PageData;

	let query = '';
	$: query = $page.url.searchParams.get('q') ?? '';

	$: count = data.quotes.length;
</script>

<div class="flex flex-col gap-2">
	<div>
		Search result(s) for: <span class="font-bold">{query}</span>
	</div>

	{#await data.quotes}
		Loading...
	{:then quotes}
		<DataTable content={quotes} />
	{:catch error}
		Error {JSON.stringify(error)}
	{/await}
</div>
