<script lang="ts">
	import { CircleXIcon } from 'lucide-svelte';

	export let content: string;
</script>

<div class="mt-12 flex h-full w-full flex-col items-center justify-center">
	<CircleXIcon class="h-12 w-12" />
	<h1 class="text-lg font-bold">Error</h1>
	<p class="font-light">{content}</p>
</div>
