import { type DataTableContent, quoteSchema, stockDataSchema } from '$lib/types';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ url, fetch, setHeaders }) => {
	const query = url.searchParams.get('q');
	// stock info
	const stockResponse = await fetch(`/api/search?q=${query}`);
	const stockData = await stockResponse.json();
	const stockResult = stockDataSchema.safeParse(stockData);
	if (!stockResult.success) {
		error(404, {
			message: 'Not found'
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
			const mappedData = resolvedResults.map((item) => {
				const value = item.value?.at(0);
				if (value) {
					return {
						symbol: value.symbol,
						name: value.name,
						price: value.price,
						change: value.change,
						changesPercentage: value.changesPercentage
					} satisfies DataTableContent;
				}
				return {
					symbol: item.symbol ?? '',
					name: item.name ?? '',
					price: undefined,
					change: undefined,
					changesPercentage: undefined
				} satisfies DataTableContent;
			});
			return mappedData;
		})
	};
};
