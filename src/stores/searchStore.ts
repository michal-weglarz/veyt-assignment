import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedSearches: string[] = browser
	? JSON.parse(localStorage.getItem('searches') ?? '[]')
	: [];

export const searches = writable(storedSearches);

searches.subscribe((value) => {
	if (browser) {
		localStorage.setItem('searches', JSON.stringify(value));
	}
});
