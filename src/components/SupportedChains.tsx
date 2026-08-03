const chains = [
  { name: "Ethereum", color: "#627eea" },
  { name: "Solana", color: "#9945ff" },
  { name: "Bitcoin", color: "#f7931a" },
  { name: "Polygon", color: "#8247e5" },
  { name: "Avalanche", color: "#e84142" },
  { name: "BNB Chain", color: "#f3ba2f" },
  { name: "Arbitrum", color: "#28a0f0" },
  { name: "Optimism", color: "#ff0420" },
  { name: "Cosmos", color: "#6b6ef9" },
  { name: "Base", color: "#0052ff" },
  { name: "Fantom", color: "#1969ff" },
  { name: "Near", color: "#00c08b" },
]

export default function SupportedChains() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-5 py-24 lg:py-28">
      <div className="text-center mb-12">
        <h2
          className="text-3xl lg:text-4xl font-black tracking-tight mb-3 text-foreground"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Every major chain. One wallet.
        </h2>
        <p className="text-muted-foreground">
          Connect to the entire multi-chain ecosystem without friction.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {chains.map(({ name, color }) => (
          <div
            key={name}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-border bg-card text-foreground hover:border-primary/40 transition-[border-color] cursor-pointer shadow-sm dark:shadow-none"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: color }}
            />
            {name}
          </div>
        ))}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-primary/30 bg-primary/8 text-primary">
          +28 more
        </div>
      </div>
    </section>
  )
}
