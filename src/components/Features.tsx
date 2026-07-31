import {
  ChevronRight,
  Globe,
  Layers,
  RefreshCw,
  TrendingUp,
} from "lucide-react"

const features = [
  {
    icon: RefreshCw,
    title: "Instant Swaps",
    label: "DEX Aggregator",
    desc: "Swap across 40+ chains with best-rate routing. No slippage surprises — live quotes before you confirm.",
    stat: "0.1% fee",
    statLabel: "industry low",
  },
  {
    icon: TrendingUp,
    title: "DeFi Yields",
    label: "Earn Protocol",
    desc: "Deploy idle assets into audited liquidity pools. Track APY, impermanent loss, and rewards in one view.",
    stat: "14.2% APY",
    statLabel: "top pool",
  },
  {
    icon: Globe,
    title: "Cross-Chain",
    label: "Bridge Layer",
    desc: "Move assets across EVM, Solana, Cosmos, and more. Unified address book, no chain juggling.",
    stat: "40+ chains",
    statLabel: "supported",
  },
  {
    icon: Layers,
    title: "NFT Gallery",
    label: "Collectibles",
    desc: "View, list, and transfer NFTs across marketplaces without leaving your wallet. Floor prices auto-updated.",
    stat: "1M+ items",
    statLabel: "indexed",
  },
]

export default function Features() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-5 py-24 lg:py-32">
      <div className="text-center mb-16">
        <div
          className="inline-block text-xs font-mono font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full border"
          style={{
            color: "#8b5cf6",
            borderColor: "rgba(139,92,246,0.3)",
            background: "rgba(139,92,246,0.08)",
          }}
        >
          Everything in one wallet
        </div>
        <h2
          className="text-4xl lg:text-5xl font-black tracking-tight mb-4"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Built for the DeFi era
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Every primitive you need to participate in on-chain finance —
          natively integrated, zero middlemen.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {features.map(
          ({ icon: Icon, title, label, desc, stat, statLabel }) => (
            <div
              key={title}
              className="group relative rounded-2xl p-6 border hover:border-primary/40 transition-all duration-300 cursor-pointer overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0d0d1a, #0a0a14)",
                borderColor: "rgba(139,92,246,0.12)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 30% 50%, rgba(139,92,246,0.06), transparent 70%)",
                }}
              />

              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.2)",
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#a78bfa" }} />
                </div>
                <div className="text-right">
                  <div
                    className="text-lg font-black font-mono"
                    style={{ color: "#10b981" }}
                  >
                    {stat}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {statLabel}
                  </div>
                </div>
              </div>

              <div
                className="text-[10px] font-mono font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: "#8b5cf6" }}
              >
                {label}
              </div>
              <h3
                className="text-xl font-bold mb-2.5"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>

              <div
                className="flex items-center gap-1 mt-5 text-xs font-semibold"
                style={{ color: "#a78bfa" }}
              >
                Learn more{" "}
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  )
}
