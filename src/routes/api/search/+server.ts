import { json, error } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

export async function GET({ url, setHeaders }) {
	const query = url.searchParams.get('q');

	try {
		const response = await fetch(
			`https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=${API_KEY}`
		);
		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
		const data = await response.json();
		setHeaders({ 'cache-control': 'max-age=3600' });
		return json(data);
	} catch (err) {
		throw error(500, {
			message: (err as Error).message || 'An unexpected error occurred'
		});
	}
}
