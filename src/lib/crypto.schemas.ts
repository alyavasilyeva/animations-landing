import { z } from "zod"

export const timeframeSchema = z.enum(["hourly", "daily", "monthly"])

export type Timeframe = z.infer<typeof timeframeSchema>

export const klinesInputSchema = z.object({
  symbol: z.string().min(1),
  timeframe: timeframeSchema,
})

export type KlinesInput = z.infer<typeof klinesInputSchema>

/** Binance kline row: [openTime, open, high, low, close, ...rest] */
export const binanceKlineRowSchema = z
  .tuple([z.number(), z.string(), z.string(), z.string(), z.string()])
  .rest(z.union([z.number(), z.string()]))

export const binanceKlinesResponseSchema = z.array(binanceKlineRowSchema)

export type BinanceKlineRow = z.infer<typeof binanceKlineRowSchema>

export const klinePointSchema = z.object({
  time: z.number(),
  close: z.number(),
})

export type KlinePoint = z.infer<typeof klinePointSchema>
