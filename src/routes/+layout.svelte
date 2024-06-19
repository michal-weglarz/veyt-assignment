<script lang="ts">
	import '../app.css';
	import Search from '$lib/components/Search.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Moon, Sun } from 'lucide-svelte';
</script>

<header class="flex flex-col gap-4 pt-6">
	<div class="flex flex-row justify-between">
		<div>
			<h1 class="text-4xl font-bold"><a href="/">Veyt Assignment</a></h1>
			<p class="font-extralight">by Michał Węglarz</p>
		</div>
		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
	<Search />
</header>

<main class="mb-6 mt-6 w-[1000px]">
	<Toaster />
	<ModeWatcher />
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
