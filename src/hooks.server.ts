import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	console.log('error in handle error', error, event);

	return {
		message: 'Whoops!'
	};
};
