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

export const quoteSchema = z.array(
	z.object({
		symbol: z.string(),
		name: z.string(),
		price: z.number(),
		changesPercentage: z.number(),
		change: z.number()
		// dayLow: z.number(),
		// dayHigh: z.number(),
		// yearHigh: z.number(),
		// yearLow: z.number(),
		// marketCap: z.number(),
		// priceAvg50: z.number(),
		// priceAvg200: z.number(),
		// exchange: z.string(),
		// volume: z.number(),
		// avgVolume: z.number(),
		// open: z.number(),
		// previousClose: z.number(),
		// eps: z.number(),
		// pe: z.number(),
		// earningsAnnouncement: z.string(),
		// sharesOutstanding: z.number(),
		// timestamp: z.number()
	})
);

export type Quote = z.infer<typeof quoteSchema>;

export interface DataTableContent {
	symbol: string;
	name?: string;
	price?: number;
	change?: number;
	changesPercentage?: number;
}
