"use client"

import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui/button"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CRYPTO_SYMBOLS,
  formatAxisDate,
  formatChartDate,
  formatPrice,
  getPriceChange,
  type Timeframe,
  timeframeSchema,
} from "@/lib/crypto"
import { getKlines } from "@/server/crypto"

const chartConfig = {
  close: {
    label: "Price",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const TIMEFRAMES: { value: Timeframe; label: string }[] = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "monthly", label: "Monthly" },
]

export default function CryptoPriceChart() {
  const [symbol, setSymbol] = useState(CRYPTO_SYMBOLS[0].symbol)
  const [timeframe, setTimeframe] = useState<Timeframe>("daily")

  const selectedSymbol = CRYPTO_SYMBOLS.find((item) => item.symbol === symbol)

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["klines", symbol, timeframe],
    queryFn: () => getKlines({ data: { symbol, timeframe } }),
    refetchInterval: timeframe === "hourly" ? 60_000 : false,
  })

  const chartData = useMemo(
    () =>
      (data ?? []).map((point) => ({
        time: point.time,
        close: point.close,
      })),
    [data],
  )

  const { change, percent } = getPriceChange(data ?? [])
  const latestPrice = data?.[data.length - 1]?.close
  const isPositive = change >= 0

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="island-kicker mb-2">Crypto Prices</p>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="display-title text-2xl font-bold text-[var(--sea-ink)] sm:text-3xl">
              {selectedSymbol?.label ?? symbol}
              <span className="ml-2 text-base font-medium text-[var(--sea-ink-soft)]">
                / USDT
              </span>
            </h2>
            {latestPrice != null && (
              <span className="text-xl font-semibold text-[var(--sea-ink)]">
                {formatPrice(latestPrice)}
              </span>
            )}
            {data && data.length > 1 && (
              <span
                className={
                  isPositive
                    ? "text-sm font-semibold text-[var(--palm)]"
                    : "text-sm font-semibold text-destructive"
                }
              >
                {isPositive ? "+" : ""}
                {percent.toFixed(2)}%
              </span>
            )}
          </div>
        </div>

        <Tabs
          value={timeframe}
          onValueChange={(value) => {
            const parsed = timeframeSchema.safeParse(value)
            if (parsed.success) {
              setTimeframe(parsed.data)
            }
          }}
        >
          <TabsList>
            {TIMEFRAMES.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-wrap gap-2">
        {CRYPTO_SYMBOLS.map((item) => (
          <Button
            key={item.symbol}
            type="button"
            size="sm"
            variant={symbol === item.symbol ? "default" : "outline"}
            onClick={() => setSymbol(item.symbol)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {isPending && (
        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-[var(--line)] bg-[var(--chip-bg)]/50">
          <p className="text-sm text-[var(--sea-ink-soft)]">Loading chart…</p>
        </div>
      )}

      {isError && (
        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-destructive/30 bg-destructive/10 px-4">
          <p className="text-sm text-destructive">
            {error instanceof Error
              ? error.message
              : "Failed to load chart data"}
          </p>
        </div>
      )}

      {!isPending && !isError && chartData.length > 0 && (
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              minTickGap={24}
              tickFormatter={(value) => formatAxisDate(value, timeframe)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={72}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(value)
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) => {
                    const time = payload?.[0]?.payload?.time
                    return typeof time === "number"
                      ? formatChartDate(time, timeframe)
                      : ""
                  }}
                  formatter={(value) => formatPrice(Number(value))}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke="var(--color-chart-1)"
              fill="url(#priceFill)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ChartContainer>
      )}
    </div>
  )
}
