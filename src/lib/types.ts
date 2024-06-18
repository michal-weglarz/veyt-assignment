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
