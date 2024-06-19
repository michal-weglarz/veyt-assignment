import type { PageLoad } from './$types';
import { historicalDataSchema } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
	const symbol = params.symbol;

	const fetchHistoricalData = async () => {
		const response = await fetch(`/api/history/${symbol}`);
		const data = await response.json();
		const result = historicalDataSchema.safeParse(data);
		if (!result.success) {
			throw error(404, {
				message: 'Could not find historical data'
			});
		}
		return result.data?.historical;
	};

	return {
		symbol,
		historical: fetchHistoricalData()
	};
};
