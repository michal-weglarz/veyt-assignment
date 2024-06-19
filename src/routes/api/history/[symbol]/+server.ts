import { json, error } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

export async function GET({ params }) {
	const symbol = params.symbol;

	try {
		const response = await fetch(
			`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=2024-05-20&to=2024-06-19&apikey=${API_KEY}`
		);

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		const data = await response.json();
		return json(data);
	} catch (err) {
		throw error(500, {
			message: (err as Error).message || 'An unexpected error occurred'
		});
	}
}
