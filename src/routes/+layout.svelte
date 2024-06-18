<script lang="ts">
	import '../app.css';
	import Search from '$lib/components/Search.svelte';
</script>

<header class="flex flex-col gap-4">
	<h1 class="text-4xl">Veyt Assignment</h1>
	<Search />
</header>

<main class="mt-6 w-[1000px]">
	<slot></slot>
</main>

<style>
	:root {
		margin: 0;
		display: flex;
		justify-content: center;
		justify-items: center;
	}
</style>
