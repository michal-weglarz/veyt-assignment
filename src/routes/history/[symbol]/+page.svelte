<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import type { PageData } from './$types';
	import * as TooltipUI from '$lib/components/ui/tooltip';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		type ChartData,
		type Point
	} from 'chart.js';
	import { Button } from '$lib/components/ui/button';
	import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
	import type { HistoricalData } from '$lib/types';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';

	import { browser } from '$app/environment';
	import { Skeleton } from '$lib/components/ui/skeleton';
	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
	export let data: PageData;

	function transformHistoricalData(
		data: HistoricalData['historical']
	): ChartData<'line', (number | Point)[], unknown> {
		return {
			labels: data.map((item) => item.date).reverse(),
			datasets: [
				{
					label: 'Price',
					borderColor: 'rgba(75, 192, 192, 1)',
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					borderWidth: 2,
					data: data.map((item) => item.close).reverse()
				}
			]
		};
	}
</script>

<div class="flex flex-row items-center gap-2">
	<TooltipUI.Root>
		<TooltipUI.Trigger asChild let:builder>
			<Button
				variant="outline"
				size="icon"
				builders={[builder]}
				data-sveltekit-preload-data="hover"
				on:click={() => {
					if (browser) window.history.back();
				}}
			>
				<ChevronLeft class="h-4 w-4" />
			</Button>
			<!--			</a>-->
		</TooltipUI.Trigger>
		<TooltipUI.Content>
			<p>Go back</p>
		</TooltipUI.Content>
	</TooltipUI.Root>

	<div>Price history for: <span class="font-semibold">{data.symbol}</span></div>
</div>

{#await data.historical}
	<!--	<div class="flex flex-col items-center justify-center">-->
	<!--		<LoaderIcon class="animate-spin" />-->
	<!--		<span>Loading data...</span>-->
	<!--	</div>-->
	<div class="mt-4">
		<Skeleton class="h-32 w-full" />
	</div>
{:then historicalData}
	<div>
		<Line data={transformHistoricalData(historicalData)} options={{ responsive: true }} />
	</div>
{:catch error}
	<div>
		<Line
			data={{
				datasets: [
					{
						label: 'Price',
						borderColor: 'rgba(75, 192, 192, 1)',
						backgroundColor: 'rgba(75, 192, 192, 0.2)',
						borderWidth: 2,
						data: []
					}
				],
				labels: []
			}}
			options={{ responsive: true }}
		/>
		<ErrorMessage content={error.message} showToast />
	</div>
{/await}
