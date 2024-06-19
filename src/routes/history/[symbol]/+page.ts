import type { PageLoad } from './$types';
import { historicalDataSchema } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, fetch }) => {
	const symbol = params.symbol;

	const response = await fetch(`/api/history/${symbol}`);
	const data = await response.json();
	const result = historicalDataSchema.safeParse(data);
	if (!result.success) {
		error(404, {
			message: 'Not found'
		});
	}

	return {
		symbol: result.data?.symbol,
		historical: result.data?.historical
	};
};
