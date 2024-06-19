import { z } from 'zod';

export const stockDataSchema = z.array(
	z.object({
		symbol: z.string(),
		name: z.string(),
		currency: z.string(),
		stockExchange: z.string(),
		exchangeShortName: z.string()
	})
);

export type StockData = z.infer<typeof stockDataSchema>;

export const historicalDataSchema = z.object({
	symbol: z.string(),
	historical: z.array(
		z.object({
			date: z.string(),
			open: z.number(),
			high: z.number(),
			low: z.number(),
			close: z.number(),
			adjClose: z.number(),
			volume: z.number(),
			unadjustedVolume: z.number(),
			change: z.number(),
			changePercent: z.number(),
			vwap: z.number(),
			label: z.string(),
			changeOverTime: z.number()
		})
	)
});

export type HistoricalData = z.infer<typeof historicalDataSchema>;
