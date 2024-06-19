<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';

	export let value: string | number | undefined;
</script>

<div class="bg-red flex items-center">
	{#if value === undefined}
		<Badge variant="secondary">N/A</Badge>
	{:else}
		<span>{value}</span>
	{/if}
</div>
