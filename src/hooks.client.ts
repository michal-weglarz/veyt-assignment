import type { HandleClientError, HandleServerError } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({ error, event, status, message }) => {
	console.log('error in client handle error', error, event);

	return {
		message: 'Whoops!'
	};
};
