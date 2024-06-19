import { json, error } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

export async function GET({ params }) {
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

	try {
		const response = await fetch(
			`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${oneMonthAgo}&to=${today}&apikey=${API_KEY}`
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
