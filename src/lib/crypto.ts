import {
  binanceKlinesResponseSchema,
  type KlinePoint,
  type Timeframe,
} from "@/lib/crypto.schemas"

export type { KlinePoint, Timeframe } from "@/lib/crypto.schemas"
export {
  binanceKlinesResponseSchema,
  klinesInputSchema,
  timeframeSchema,
} from "@/lib/crypto.schemas"

export type CryptoSymbol = {
  symbol: string
  label: string
}

export const CRYPTO_SYMBOLS: CryptoSymbol[] = [
  { symbol: "BTCUSDT", label: "BTC" },
  { symbol: "ETHUSDT", label: "ETH" },
  { symbol: "SOLUSDT", label: "SOL" },
  { symbol: "BNBUSDT", label: "BNB" },
  { symbol: "XRPUSDT", label: "XRP" },
]

const TIMEFRAME_CONFIG: Record<
  Timeframe,
  { interval: string; lookbackMs: number }
> = {
  hourly: { interval: "1h", lookbackMs: 7 * 24 * 60 * 60 * 1000 },
  daily: { interval: "1d", lookbackMs: 365 * 24 * 60 * 60 * 1000 },
  monthly: { interval: "1mo", lookbackMs: 5 * 365 * 24 * 60 * 60 * 1000 },
}

export function getTimeframeConfig(timeframe: Timeframe) {
  return TIMEFRAME_CONFIG[timeframe]
}

export function parseKlines(raw: unknown): KlinePoint[] {
  const rows = binanceKlinesResponseSchema.parse(raw)

  return rows.map((kline) => ({
    time: kline[0],
    close: Number.parseFloat(kline[4]),
  }))
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : value >= 1 ? 2 : 4,
  }).format(value)
}

export function formatChartDate(time: number, timeframe: Timeframe) {
  const date = new Date(time)

  if (timeframe === "hourly") {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  if (timeframe === "daily") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

export function formatAxisDate(time: number, timeframe: Timeframe) {
  const date = new Date(time)

  if (timeframe === "hourly") {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
    })
  }

  if (timeframe === "daily") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  })
}

export function getPriceChange(points: KlinePoint[]) {
  if (points.length < 2) {
    return { change: 0, percent: 0 }
  }

  const first = points[0].close
  const last = points[points.length - 1].close
  const change = last - first
  const percent = first === 0 ? 0 : (change / first) * 100

  return { change, percent }
}
