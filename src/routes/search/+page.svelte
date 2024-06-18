<script lang="ts">
	import { page } from '$app/stores';
	import { type StockData, stockDataSchema } from '$lib/types';
	import { readable, writable } from 'svelte/store';
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';

	let query = '';
	let searchResults = writable<StockData>([]);
	$: query = $page.url.searchParams.get('q') ?? '';
	$: searchResults.set($page.data.searchResults);

	const data = [{ symbol: 'test', name: 'test', currency: 'PLN', stockExchange: '123123' }];

	const table = createTable(searchResults);

	const columns = table.createColumns([
		table.column({
			accessor: 'symbol',
			header: 'Symbol'
		}),
		table.column({
			accessor: 'name',
			header: 'Name'
		}),
		table.column({
			accessor: 'currency',
			header: 'Currency'
		}),
		table.column({
			accessor: 'stockExchange',
			header: 'Stock Exchange'
		}),
		table.column({
			accessor: ({ name }) => name,
			header: ''
		})
	]);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<div>search: {query}</div>

<div class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
