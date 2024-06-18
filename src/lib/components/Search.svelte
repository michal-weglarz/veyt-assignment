<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	let value = '';
</script>

<form class="flex w-full flex-row gap-2" action="/search" method="GET">
	<Input name="q" type="search" placeholder="Search for a stock by name or symbol..." bind:value />
	<Button type="submit">Search</Button>
</form>
