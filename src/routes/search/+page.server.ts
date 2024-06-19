import { type DataTableContent, quoteSchema, stockDataSchema } from '$lib/types';
import { error, type ServerLoad } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';

export const load: ServerLoad = async ({ url, fetch, setHeaders }) => {
	const query = url.searchParams.get('q');
	// stock info
	const stockResponse = await fetch(`/api/search?q=${query}`);
	const stockData = await stockResponse.json();
	const stockResult = stockDataSchema.safeParse(stockData);
	if (!stockResult.success) {
		error(404, {
			message: 'Could not find stock data'
		});
	}

	// quote info
	const symbols = stockResult.data?.map((item) => ({
		symbol: item.symbol,
		name: item.name
	}));
	async function fetchQuoteData(symbol: string, name: string) {
		const response = await fetch(`/api/quote/${symbol}`);
		const data = await response.json();
		const result = quoteSchema.safeParse(data);
		return { symbol, name, value: result.data };
	}
	const results = symbols.map(({ symbol, name }) => fetchQuoteData(symbol, name));

	setHeaders({ 'cache-control': 'max-age=3600' });
	return {
		quotes: Promise.allSettled(results).then((settledResults) => {
			const resolvedResults = settledResults.map((result) => {
				if (result.status === 'fulfilled') {
					return result.value;
				} else {
					return { symbol: undefined, name: undefined, error: result.reason, value: undefined };
				}
			});
			return resolvedResults.map((item): DataTableContent => {
				const value = item.value?.at(0);
				return {
					symbol: value ? value.symbol : item.symbol ?? '',
					name: value ? value.name : item.name ?? '',
					price: value ? value.price : undefined,
					change: value ? value.change : undefined,
					changesPercentage: value ? value.changesPercentage : undefined
				};
			});
		})
	};
};
