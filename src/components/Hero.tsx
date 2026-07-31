import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  RefreshCw,
  Settings,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { useState } from "react"
import type { TooltipContentProps } from "recharts"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Button } from "@/components/ui/button"

// --- Data ---
const portfolioHistory = [
  { date: "Jun 1", value: 38200 },
  { date: "Jun 5", value: 41500 },
  { date: "Jun 9", value: 39800 },
  { date: "Jun 13", value: 44200 },
  { date: "Jun 17", value: 46100 },
  { date: "Jun 21", value: 43800 },
  { date: "Jun 25", value: 49300 },
  { date: "Jun 29", value: 51240 },
  { date: "Jul 1", value: 49800 },
  { date: "Jul 4", value: 53184 },
]

const totalValue = portfolioHistory[portfolioHistory.length - 1]?.value ?? 0

const address = "0x4A2F...d9C3"

const avatarColors = [
  { color: "#8b5cf6", label: "A" },
  { color: "#10b981", label: "B" },
  { color: "#06b6d4", label: "C" },
  { color: "#f59e0b", label: "D" },
  { color: "#e879f9", label: "E" },
] as const

const ratingStars = ["one", "two", "three", "four", "five"] as const

type Asset = {
  symbol: string
  name: string
  balance: string
  value: number
  change: number
  positive: boolean
  color: string
  bg: string
}

const assets: Asset[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "4.821",
    value: 18420.5,
    change: 3.24,
    positive: true,
    color: "#627eea",
    bg: "rgba(98,126,234,0.15)",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    balance: "0.214",
    value: 16280.0,
    change: 1.82,
    positive: true,
    color: "#f7931a",
    bg: "rgba(247,147,26,0.15)",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "8,420.00",
    value: 8420.0,
    change: 0.01,
    positive: true,
    color: "#2775ca",
    bg: "rgba(39,117,202,0.15)",
  },
  {
    symbol: "SOL",
    name: "Solana",
    balance: "62.4",
    value: 10063.5,
    change: 2.14,
    positive: false,
    color: "#9945ff",
    bg: "rgba(153,69,255,0.15)",
  },
]

function AssetIcon({
  color,
  bg,
  symbol,
}: {
  color: string
  bg: string
  symbol: string
}) {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold"
      style={{ background: bg, color }}
    >
      {symbol.slice(0, 2)}
    </div>
  )
}

function CustomTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  const value = payload[0]?.value
  if (typeof value !== "number") {
    return null
  }

  return (
    <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-xs shadow-md">
      <div className="text-muted-foreground mb-0.5">{label}</div>
      <div className="font-mono font-semibold">
        $
        {value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  )
}

export default function Hero() {
  const [activeRange, setActiveRange] = useState<"1W" | "1M" | "3M" | "1Y">(
    "1M",
  )
  const [hidden, setHidden] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"portfolio" | "assets" | "defi">(
    "portfolio",
  )

  function handleCopy() {
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  const chartData =
    activeRange === "1W"
      ? portfolioHistory.slice(-4)
      : activeRange === "3M"
        ? portfolioHistory
        : activeRange === "1Y"
          ? [
              ...portfolioHistory,
              { date: "Aug", value: 58000 },
              { date: "Sep", value: 62400 },
            ]
          : portfolioHistory.slice(-6)

  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-0 sm:px-5 pt-16 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
      <div className="grid lg:grid-cols-[1fr_min(100%,480px)] gap-10 sm:gap-12 xl:gap-20 items-center">
        {/* Left copy */}
        <div className="min-w-0">
          <div
            className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium mb-6 sm:mb-8 border"
            style={{
              background: "rgba(139,92,246,0.1)",
              borderColor: "rgba(139,92,246,0.3)",
              color: "#a78bfa",
            }}
          >
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-green-400 animate-pulse" />
            <span className="truncate">Now supporting 40+ networks</span>
          </div>

          <h1
            className="text-4xl min-[390px]:text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-5 sm:mb-6 [overflow-wrap:normal]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Your keys.
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #a78bfa, #8b5cf6, #6d28d9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your crypto.
            </span>
            <br />
            Your rules.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mb-8 sm:mb-10">
            NOVA is a non-custodial Web3 wallet built for DeFi power users.
            Swap, bridge, earn, and collect — all from one beautifully designed
            interface.
          </p>

          <div className="flex flex-col min-[420px]:flex-row flex-wrap items-stretch min-[420px]:items-center gap-3 sm:gap-4">
            <Button
              type="button"
              size="lg"
              className="w-full min-[420px]:w-auto justify-center rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-lg h-auto px-6 py-3.5"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                boxShadow: "0 0 40px rgba(139,92,246,0.35)",
              }}
            >
              <Wallet className="w-4 h-4" />
              Create wallet — free
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full min-[420px]:w-auto justify-center rounded-xl font-semibold text-foreground/80 border-border bg-card/60 hover:border-primary/40 hover:text-foreground hover:bg-card h-auto px-6 py-3.5"
            >
              Watch demo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center min-[480px]:gap-x-5 min-[480px]:gap-y-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex shrink-0 -space-x-2">
                {avatarColors.map((avatar) => (
                  <div
                    key={avatar.color}
                    className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: avatar.color }}
                  >
                    {avatar.label}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground [overflow-wrap:normal] break-normal">
                <span className="text-foreground font-semibold">3.2M+</span>{" "}
                wallets created
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-sm [overflow-wrap:normal]">
              {ratingStars.map((star) => (
                <Star
                  key={star}
                  className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-muted-foreground ml-1 tabular-nums">
                4.9
              </span>
            </div>
          </div>
        </div>

        {/* Right: Wallet UI card */}
        <div className="relative w-full min-w-0 p-3 sm:p-4 lg:p-5">
          {/* Glow behind card — kept inside padding so it isn't clipped */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] blur-xl sm:blur-2xl opacity-50 dark:opacity-70"
            style={{
              background:
                "radial-gradient(ellipse at 30% 15%, rgba(167,139,250,0.7), transparent 52%), radial-gradient(ellipse at 75% 85%, rgba(16,185,129,0.45), transparent 48%), radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.25), transparent 70%)",
            }}
          />

          <div className="relative rounded-2xl border border-primary/35 dark:border-violet-400/45 bg-card text-card-foreground overflow-hidden ring-1 ring-black/5 dark:ring-violet-300/15 shadow-[0_12px_32px_-10px_rgba(88,28,135,0.35),0_8px_16px_-8px_rgba(0,0,0,0.18)] dark:shadow-[0_0_0_1px_rgba(167,139,250,0.28),0_16px_36px_-10px_rgba(0,0,0,0.95),0_0_20px_1px_rgba(139,92,246,0.55),0_0_40px_-2px_rgba(139,92,246,0.4),0_0_28px_-4px_rgba(16,185,129,0.3)]">
            {/* Card top bar */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
                  }}
                >
                  NV
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">
                    Main wallet
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    className="-ml-1.5 h-auto gap-1 rounded-md px-1.5 py-0.5 text-xs font-mono text-foreground/70 transition-colors duration-150 hover:bg-muted hover:text-foreground dark:hover:bg-white/8"
                    onClick={handleCopy}
                  >
                    {address}
                    {copied ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground dark:hover:bg-white/8"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground dark:hover:bg-white/8"
                  aria-label="Settings"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Balance */}
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                  Total Balance
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground dark:hover:bg-white/8"
                  aria-label={hidden ? "Show balance" : "Hide balance"}
                  onClick={() => setHidden(!hidden)}
                >
                  {hidden ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </Button>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <span
                  className="text-4xl font-black leading-none text-foreground"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {hidden
                    ? "••••••"
                    : `$${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-semibold whitespace-nowrap bg-emerald-500/12 text-emerald-600 dark:text-emerald-400">
                  <ArrowUpRight className="w-3 h-3 shrink-0" />
                  +$2,944.18
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  +5.86% this month
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex px-5 gap-1 border-b border-border">
              {(["portfolio", "assets", "defi"] as const).map((tab) => (
                <Button
                  key={tab}
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-none px-3 py-2.5 h-auto capitalize border-b-2 -mb-px transition-colors duration-150 hover:bg-transparent ${
                    activeTab === tab
                      ? "text-primary border-primary hover:text-primary"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>

            {/* Tab content */}
            <div className="min-h-[260px]">
              {activeTab === "portfolio" && (
                <div className="px-5 pt-4 pb-2">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1">
                      {(["1W", "1M", "3M", "1Y"] as const).map((r) => (
                        <Button
                          key={r}
                          type="button"
                          variant="ghost"
                          size="xs"
                          onClick={() => setActiveRange(r)}
                          className={`px-2 py-0.5 h-auto rounded font-mono transition-colors duration-150 ${
                            activeRange === r
                              ? "text-primary bg-primary/10 hover:bg-primary/10 hover:text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-white/8"
                          }`}
                        >
                          {r}
                        </Button>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      +5.86%
                    </span>
                  </div>
                  <ResponsiveContainer width="100%" height={160}>
                    <AreaChart
                      data={chartData}
                      margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
                    >
                      <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="var(--primary)"
                            stopOpacity={0.35}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--primary)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        tick={{
                          fill: "var(--muted-foreground)",
                          fontSize: 10,
                          fontFamily: "JetBrains Mono",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis domain={["auto", "auto"]} hide />
                      <Tooltip content={CustomTooltip} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        fill="url(#grad)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}

              {activeTab === "assets" && (
                <div className="divide-y divide-border">
                  {assets.map((asset) => (
                    <div
                      key={asset.symbol}
                      className="flex items-center justify-between px-5 py-3 hover:bg-muted/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <AssetIcon
                          color={asset.color}
                          bg={asset.bg}
                          symbol={asset.symbol}
                        />
                        <div>
                          <div className="text-sm font-semibold text-foreground">
                            {asset.name}
                          </div>
                          <div className="text-xs text-muted-foreground font-mono">
                            {asset.balance} {asset.symbol}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold font-mono text-foreground">
                          $
                          {asset.value.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                        <div
                          className={`text-xs font-mono font-medium flex items-center justify-end gap-0.5 ${
                            asset.positive
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {asset.positive ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {Math.abs(asset.change)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "defi" && (
                <div className="px-5 pt-5 space-y-3">
                  {[
                    {
                      protocol: "Aave v3",
                      type: "Lending",
                      apy: "6.8%",
                      deposited: "$8,420",
                      color: "#b6509e",
                    },
                    {
                      protocol: "Uniswap v3",
                      type: "LP ETH/USDC",
                      apy: "18.4%",
                      deposited: "$4,200",
                      color: "#ff007a",
                    },
                    {
                      protocol: "Lido Finance",
                      type: "stETH",
                      apy: "3.9%",
                      deposited: "$12,100",
                      color: "#00a3ff",
                    },
                  ].map((pos) => (
                    <div
                      key={pos.protocol}
                      className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/40 hover:border-primary/30 hover:bg-muted/70 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                          style={{ background: `${pos.color}22` }}
                        >
                          <TrendingUp
                            className="w-3.5 h-3.5"
                            style={{ color: pos.color }}
                          />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-foreground">
                            {pos.protocol}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {pos.type}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                          {pos.apy} APY
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {pos.deposited}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="flex border-t border-border">
              {[
                { icon: ArrowUpRight, label: "Send" },
                { icon: ArrowDownRight, label: "Receive" },
                { icon: RefreshCw, label: "Swap" },
                { icon: BarChart3, label: "Earn" },
              ].map(({ icon: Icon, label }) => (
                <Button
                  key={label}
                  type="button"
                  variant="ghost"
                  className="flex-1 flex-col h-auto gap-1 py-3 rounded-none text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground dark:hover:bg-white/8"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-medium">{label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
