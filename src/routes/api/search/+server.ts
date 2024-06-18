import { json } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

export async function GET({ url }) {
	const query = url.searchParams.get('q');

	// it runs only on the server, so api key is never exposed to the client
	const response = await fetch(
		`https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=${API_KEY}`
	);

	const data = await response.json();
	return json(data);
}
