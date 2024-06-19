<script lang="ts">
	import { type DataTableContent } from '$lib/types';
	import { writable } from 'svelte/store';
	import { createRender, createTable, Render, Subscribe } from 'svelte-headless-table';
	import DataTablePagination from './data-table-pagination.svelte';
	import { addPagination } from 'svelte-headless-table/plugins';
	import * as Table from '$lib/components/ui/table';
	import { goto } from '$app/navigation';
	import DataTablePriceChangeCell from './data-table-price-change-cell.svelte';
	import DataTableCell from './data-table-cell.svelte';

	export let content: Array<DataTableContent>;
	const tableData = writable(content);
	$: tableData.set(content);

	const table = createTable(tableData, {
		page: addPagination()
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'symbol',
			header: 'Symbol'
		}),
		table.column({
			accessor: 'name',
			header: 'Name',
			cell: ({ value }) => {
				return createRender(DataTableCell, {
					value
				});
			}
		}),
		table.column({
			accessor: 'price',
			header: 'Price',
			cell: ({ value }) => {
				return createRender(DataTableCell, {
					value
				});
			}
		}),
		table.column({
			accessor: 'change',
			header: 'Change',
			cell: ({ value }) => {
				return createRender(DataTablePriceChangeCell, {
					value
				});
			}
		}),
		table.column({
			accessor: 'changesPercentage',
			header: 'Change %',
			cell: ({ value }) => {
				return createRender(DataTablePriceChangeCell, {
					value
				});
			}
		})
	]);
	const tableModel = table.createViewModel(columns);
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = tableModel;
</script>

<div class="flex flex-col gap-2">
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
						<Table.Row
							{...rowAttrs}
							class="hover:cursor-pointer"
							on:click={() => {
								const symbol = row.original.symbol ?? '';
								goto(`/history/${symbol}`);
							}}
						>
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
	<DataTablePagination {tableModel} />
</div>
