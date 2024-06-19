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
	import { LucideArrowBigLeft } from 'lucide-svelte';
	import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
	export let data: PageData;

	let chartData: ChartData<'line', (number | Point)[], unknown> = { labels: [], datasets: [] };
	$: {
		chartData.labels = data.historical.map((item) => item.date).reverse();
		chartData.datasets = [
			{
				label: 'Price',
				data: data.historical.map((item) => item.close).reverse()
			}
		];
	}

	function handleBackButton() {
		window.history.back();
	}
</script>

<div class="flex flex-row items-center gap-2">
	<TooltipUI.Root>
		<TooltipUI.Trigger asChild let:builder>
			<Button variant="outline" size="icon" on:click={handleBackButton} builders={[builder]}>
				<ChevronLeft class="h-4 w-4" />
			</Button>
		</TooltipUI.Trigger>
		<TooltipUI.Content>
			<p>Go back</p>
		</TooltipUI.Content>
	</TooltipUI.Root>

	<div>Price history for: <span class="font-semibold">{data.symbol}</span></div>
</div>
<div>
	<Line data={chartData} options={{ responsive: true }} />
</div>
