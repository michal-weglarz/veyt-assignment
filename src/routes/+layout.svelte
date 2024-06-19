<script lang="ts">
	import '../app.css';
	import Search from '$lib/components/Search.svelte';
	import { Link } from 'lucide-svelte';
</script>

<header class="flex flex-col gap-4 pt-6">
	<div>
		<h1 class="text-4xl font-bold"><a href="/">Veyt Assignment</a></h1>
		<p class="font-extralight">by Michał Węglarz</p>
	</div>
	<Search />
</header>

<main class="mb-6 mt-6 w-[1000px]">
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
