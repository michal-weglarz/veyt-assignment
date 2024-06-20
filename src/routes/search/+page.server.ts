import { type DataTableContent, quoteSchema, stockDataSchema } from '$lib/types';
import { error, type ServerLoad } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

export const load: ServerLoad = async ({ url, fetch, setHeaders }) => {
	setHeaders({ 'cache-control': 'max-age=3600' });
	const query = url.searchParams.get('q');
	try {
		const stockResponse = await fetch(
			`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=20&apikey=${API_KEY}`
		);
		if (!stockResponse.ok) {
			error(500, `HTTP error: ${stockResponse.status}`);
		}
		const stockData = await stockResponse.json();
		const stockResult = stockDataSchema.safeParse(stockData);
		if (!stockResult.success) {
			error(404, {
				message: 'Could not find stock data'
			});
		}
		const symbols = stockResult.data?.map((item) => ({
			symbol: item.symbol,
			name: item.name
		}));
		async function fetchQuoteData(symbol: string, name: string) {
			try {
				const response = await fetch(
					`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY}`
				);
				if (!response.ok) {
					error(500, `HTTP error: ${response.status}`);
				}
				const data = await response.json();
				const result = quoteSchema.safeParse(data);
				if (!result.success) {
					error(404, {
						message: 'Could not find stock data'
					});
				}
				return { symbol, name, value: result.data };
			} catch (error) {
				console.log(error);
			}
		}
		const results = symbols.map(({ symbol, name }) => fetchQuoteData(symbol, name));
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
					const value = item?.value?.at(0);
					return {
						symbol: value ? value.symbol : item?.symbol ?? '',
						name: value ? value.name : item?.name ?? '',
						price: value ? value.price : undefined,
						change: value ? value.change : undefined,
						changesPercentage: value ? value.changesPercentage : undefined
					};
				});
			})
		};
	} catch (err) {
		error(404, {
			message: 'Could not find stock data'
		});
	}
};
