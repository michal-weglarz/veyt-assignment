<script>
	import { page } from '$app/stores';

	$: query = $page.url.searchParams.get('q') ?? '';
</script>

<div class="flex flex-col gap-2">
	<div>
		Search result(s) for: <span class="font-bold">{query}</span>
	</div>
	<slot></slot>
</div>
