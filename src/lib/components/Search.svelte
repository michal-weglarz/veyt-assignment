<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { searches } from '../../stores/searchStore';
	import { browser } from '$app/environment';

	let value = '';

	const addSearch = () => {
		if (browser) {
			searches.update((current) => {
				const newSearches = [value.trim(), ...current.slice(0, 4)];
				return [...new Set(newSearches)];
			});
		}
	};
</script>

<form class="flex w-full flex-row gap-2" action="/search" method="GET" on:submit={addSearch}>
	<Input name="q" type="search" placeholder="Search for a stock by name or symbol..." bind:value />
	<Button type="submit">Search</Button>
</form>
