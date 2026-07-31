const chains = [
  { name: "Ethereum", color: "#627eea" },
  { name: "Solana", color: "#9945ff" },
  { name: "Bitcoin", color: "#f7931a" },
  { name: "Polygon", color: "#8247e5" },
  { name: "Avalanche", color: "#e84142" },
  { name: "BNB Chain", color: "#f3ba2f" },
  { name: "Arbitrum", color: "#2d374b" },
  { name: "Optimism", color: "#ff0420" },
  { name: "Cosmos", color: "#2e3148" },
  { name: "Base", color: "#0052ff" },
  { name: "Fantom", color: "#1969ff" },
  { name: "Near", color: "#00c08b" },
]

export default function SupportedChains() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-5 py-24 lg:py-28">
      <div className="text-center mb-12">
        <h2
          className="text-3xl lg:text-4xl font-black tracking-tight mb-3"
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
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border hover:border-primary/40 transition-all cursor-pointer"
            style={{
              background: "rgba(13,13,26,0.8)",
              borderColor: "rgba(139,92,246,0.12)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: color }}
            />
            {name}
          </div>
        ))}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
          style={{
            background: "rgba(139,92,246,0.08)",
            borderColor: "rgba(139,92,246,0.3)",
            color: "#a78bfa",
          }}
        >
          +28 more
        </div>
      </div>
    </section>
  )
}
