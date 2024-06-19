<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import type { DataTableContent, Quote } from '$lib/types';
	import DataTable from './data-table.svelte';

	export let data: PageData;

	let query = '';
	$: query = $page.url.searchParams.get('q') ?? '';
	// let content: Array<DataTableContent> = [];
	// $: content = data.searchResults;

	function transformData(quote: Quote): DataTableContent {
		console.log(quote);
		const raw = quote.at(0);
		if (!raw) {
			throw Error('error');
		}
		return {
			symbol: raw.symbol,
			name: raw.name,
			price: raw.price,
			change: raw.change,
			changePercentage: raw.changesPercentage
		};
	}

	console.log('data', data.quotes);
</script>

<div>search: {query}</div>
<DataTable content={data.quotes} />

<!--{#await data.quotes}-->
<!--	Loading...-->
<!--{:then quotes}-->
<!--	&lt;!&ndash;	<DataTable content={transformData(quotes)} />&ndash;&gt;-->
<!--	{JSON.stringify(quotes)}-->
<!--&lt;!&ndash;	<DataTable&ndash;&gt;-->
<!--&lt;!&ndash;		content={quotes.map((quote) => {&ndash;&gt;-->
<!--&lt;!&ndash;			console.log('quote', quote);&ndash;&gt;-->
<!--&lt;!&ndash;			if (quote.status === 'fulfilled') {&ndash;&gt;-->
<!--&lt;!&ndash;				return {&ndash;&gt;-->
<!--&lt;!&ndash;					symbol: quote.value.at(0).symbol,&ndash;&gt;-->
<!--&lt;!&ndash;					name: raw.name,&ndash;&gt;-->
<!--&lt;!&ndash;					price: raw.price,&ndash;&gt;-->
<!--&lt;!&ndash;					change: raw.change,&ndash;&gt;-->
<!--&lt;!&ndash;					changePercentage: raw.changesPercentage&ndash;&gt;-->
<!--&lt;!&ndash;				};&ndash;&gt;-->
<!--&lt;!&ndash;			}&ndash;&gt;-->
<!--&lt;!&ndash;		})}&ndash;&gt;-->
<!--&lt;!&ndash;	/>&ndash;&gt;-->
<!--	{#each quotes as quoteItem}-->
<!--		<li>{quoteItem.value.symbol}</li>-->
<!--	{/each}-->
<!--{:catch error}-->
<!--	Error {JSON.stringify(error)}-->
<!--{/await}-->
