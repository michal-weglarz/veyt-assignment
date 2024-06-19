<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import type { PageData } from './$types';
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

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
	export let data: PageData;

	let chartData: ChartData<'line', (number | Point)[], unknown> = { labels: [], datasets: [] };
	$: {
		chartData.labels = data.historical.map((item) => item.date);
		chartData.datasets = [
			{
				label: 'Price',
				data: data.historical.map((item) => item.close)
			}
		];
	}
</script>

<div>history: {data.symbol}</div>
<div>
	<Line data={chartData} options={{ responsive: true }} />
</div>
