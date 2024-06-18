import { z } from 'zod';

export interface StockData {
	symbol: string;
	name: string;
	currency: string;
	stockExchange: string;
	exchangeShortName: string;
}

export const stockDataSchema = z.array(
	z.object({
		symbol: z.string(),
		name: z.string(),
		currency: z.string(),
		stockExchange: z.string(),
		exchangeShortName: z.string()
	})
);
