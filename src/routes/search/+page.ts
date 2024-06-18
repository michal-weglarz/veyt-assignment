import type { PageLoad } from './$types';
import { stockDataSchema } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('q');
	const response = await fetch(`/api/search?q=${query}`);
	const data = await response.json();

	const result = stockDataSchema.safeParse(data);

	if (!result.success) {
		error(404, {
			message: 'Not found'
		});
	}

	return {
		searchResults: result.data
	};
};
