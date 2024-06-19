import { json, error } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

export async function GET({ params }) {
	const symbol = params.symbol;

	try {
		const response = await fetch(
			`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY}`
		);
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		const data = await response.json();
		return json(data);
	} catch (err) {
		console.log('err', err);
		throw error(500, {
			message: (err as Error).message || 'An unexpected error occurred'
		});
	}
}
