import { quoteSchema, stockDataSchema } from '$lib/types';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('q');

	const stockResponse = await fetch(`/api/search?q=${query}`);
	const stockData = await stockResponse.json();
	const stockResult = stockDataSchema.safeParse(stockData);
	if (!stockResult.success) {
		error(404, {
			message: 'Not found'
		});
	}
	const symbols = stockResult.data?.map((item) => item.symbol);
	async function fetchData(symbol: string) {
		const response = await fetch(`/api/quote/${symbol}`);
		if (!response.ok) {
			return { symbol, error: `Failed to fetch data for ${symbol}: ${response.statusText}` };
		}
		const data = await response.json();
		const result = quoteSchema.safeParse(data);
		if (!result.success) {
			error(404, {
				message: 'Not found'
			});
		}
		return { symbol, value: result.data };
	}

	const results = await Promise.allSettled(symbols.map(fetchData));

	const quotes = results.flatMap((result) => {
		if (result.status === 'fulfilled') {
			return result.value.value ?? [];
		} else {
			return [];
		}
	});

	console.log('results', results);

	// const test = Promise.allSettled(fetchQuotesPromises);

	return {
		searchResults: stockResult.data,
		quotes
	};
};
