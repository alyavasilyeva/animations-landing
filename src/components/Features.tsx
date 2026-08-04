import {
  ChevronRight,
  Globe,
  Layers,
  RefreshCw,
  TrendingUp,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1] as const

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
  const shouldReduceMotion = useReducedMotion()

  const headerTransition = shouldReduceMotion
    ? { duration: 0.2, ease: "easeOut" as const }
    : { duration: 0.5, ease: EASE_OUT_EXPO }

  const cardTransition = (index: number) =>
    shouldReduceMotion
      ? { duration: 0.2, ease: "easeOut" as const }
      : {
          duration: 0.45,
          ease: EASE_OUT_EXPO,
          delay: index * 0.05,
        }

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-5 py-24 lg:py-32">
      <motion.div
        className="text-center mb-16"
        initial={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, transform: "translate3d(0, 12px, 0)" }
        }
        whileInView={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 1, transform: "translate3d(0, 0, 0)" }
        }
        viewport={{ once: true, amount: 0.35 }}
        transition={headerTransition}
      >
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
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((feature, index) => {
          const { icon: Icon, title, label, desc, stat, statLabel } = feature
          return (
            <motion.div
              key={title}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, transform: "translate3d(0, 16px, 0)" }
              }
              whileInView={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, transform: "translate3d(0, 0, 0)" }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={cardTransition(index)}
            >
              {/* Inner shell keeps CSS press/hover transforms off Motion's inline transform */}
              <div className="group relative rounded-2xl p-6 border border-border bg-card text-card-foreground hover:border-primary/40 transition-[border-color,transform] duration-150 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer overflow-hidden shadow-sm dark:shadow-none active:scale-[0.97] motion-reduce:transition-[border-color] motion-reduce:active:scale-100">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease pointer-events-none bg-[radial-gradient(circle_at_30%_50%,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_70%)]" />

                <div className="relative flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-primary/12 border border-primary/20 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] motion-safe:group-hover:scale-[1.02]">
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
                  <ChevronRight className="w-3.5 h-3.5 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-[cubic-bezier(0.19,1,0.22,1)] motion-safe:group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
