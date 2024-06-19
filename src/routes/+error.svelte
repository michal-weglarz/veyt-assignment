<script>
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import { page } from '$app/stores';
</script>

<ErrorMessage content={$page.error?.message ?? ''} />
