import { createServerFn } from "@tanstack/react-start"

import { getTimeframeConfig, parseKlines } from "@/lib/crypto"
import { type KlinePoint, klinesInputSchema } from "@/lib/crypto.schemas"

const BINANCE_API = "https://data-api.binance.vision/api/v3/klines"

export const getKlines = createServerFn({ method: "GET" })
  .validator(klinesInputSchema)
  .handler(async ({ data }): Promise<KlinePoint[]> => {
    const { symbol, timeframe } = data
    const { interval, lookbackMs } = getTimeframeConfig(timeframe)
    const startTime = Date.now() - lookbackMs

    const url = new URL(BINANCE_API)
    url.searchParams.set("symbol", symbol)
    url.searchParams.set("interval", interval)
    url.searchParams.set("startTime", String(startTime))
    url.searchParams.set("limit", "1000")

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status}`)
    }

    const raw: unknown = await response.json()
    return parseKlines(raw)
  })
