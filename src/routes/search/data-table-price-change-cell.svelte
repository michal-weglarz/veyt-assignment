<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';

	export let value: number | undefined;
</script>

<div class="bg-red flex items-center">
	{#if value === undefined}
		<Badge variant="secondary">N/A</Badge>
	{:else if value < 0}
		<span class="font-bold text-red-500">{value}</span>
	{:else if value > 0}
		<span class="font-bold text-green-500">{value}</span>
	{:else}
		<span>{value}</span>
	{/if}
</div>
