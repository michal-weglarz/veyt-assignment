import { historicalDataSchema } from '$lib/types';
import { error, type ServerLoad } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

export const load: ServerLoad = async ({ params, fetch }) => {
	const symbol = params.symbol;

	function formatDate(date: Date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}
	function getDates() {
		const today = new Date();
		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(today.getMonth() - 1);
		const formattedToday = formatDate(today);
		const formattedOneMonthAgo = formatDate(oneMonthAgo);

		return {
			today: formattedToday,
			oneMonthAgo: formattedOneMonthAgo
		};
	}
	const { today, oneMonthAgo } = getDates();

	const fetchHistoricalData = async () => {
		try {
			const response = await fetch(
				`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${oneMonthAgo}&to=${today}&apikey=${API_KEY}`
			);
			if (!response.ok) {
				error(500, `Failed to fetch historical data for ${symbol}`);
			}
			const data = await response.json();
			const result = historicalDataSchema.safeParse(data);
			if (!result.success) {
				error(404, {
					message: `Could not find historical data for ${symbol}`
				});
			}
			return result.data?.historical;
		} catch {
			error(500, `Failed to fetch historical data for ${symbol}`);
		}
	};

	return {
		symbol,
		historical: fetchHistoricalData()
	};
};
