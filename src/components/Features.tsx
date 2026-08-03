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
    <section className="relative z-10 max-w-6xl mx-auto px-5 py-24 lg:py-32">
      <div className="text-center mb-16">
        <div className="inline-block text-xs font-mono font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary">
          Everything in one wallet
        </div>
        <h2
          className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-foreground"
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
              className="group relative rounded-2xl p-6 border border-border bg-card text-card-foreground hover:border-primary/40 transition-[border-color] duration-300 cursor-pointer overflow-hidden shadow-sm dark:shadow-none"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_70%)]" />

              <div className="relative flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/12 border border-primary/20">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-right">
                  <div className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                    {stat}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {statLabel}
                  </div>
                </div>
              </div>

              <div className="relative text-[10px] font-mono font-semibold uppercase tracking-widest mb-1.5 text-primary">
                {label}
              </div>
              <h3
                className="relative text-xl font-bold mb-2.5 text-foreground"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {title}
              </h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>

              <div className="relative flex items-center gap-1 mt-5 text-xs font-semibold text-primary">
                Learn more{" "}
                <ChevronRight className="w-3.5 h-3.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5" />
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  )
}
