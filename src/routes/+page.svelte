<script lang="ts">
	import { searches } from '../stores/searchStore';
	import * as Card from '$lib/components/ui/card';
	import { SearchIcon, SearchXIcon } from 'lucide-svelte';
</script>

<div class="mt-12 flex flex-col items-center justify-center gap-6">
	<h2 class="text-2xl font-semibold">Your recent searches:</h2>
	<div class="space-y-2">
		{#if $searches.length > 0}
			{#each $searches as search}
				<Card.Root class="w-[380px] hover:drop-shadow">
					<a href={`/search?q=${search}`}>
						<Card.Header>
							<Card.Title>
								<div class="flex flex-row items-center gap-2">
									<SearchIcon class="h-5 w-5" />
									<p>{search}</p>
								</div>
							</Card.Title>
						</Card.Header>
					</a>
				</Card.Root>
			{/each}
		{:else}
			<Card.Root class="w-[380px]">
				<Card.Header>
					<Card.Title>
						<div class="flex flex-row items-center gap-2">
							<SearchXIcon class="fil h-5 w-5" />
							<p class="text-slate-500">You haven't searched anything yet.</p>
						</div>
					</Card.Title>
				</Card.Header>
			</Card.Root>
		{/if}
	</div>
</div>
