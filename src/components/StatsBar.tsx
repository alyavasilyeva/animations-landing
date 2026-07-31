const stats = [
  { value: "$12.4B", label: "Total Value Locked" },
  { value: "3.2M", label: "Active Wallets" },
  { value: "99.98%", label: "Uptime SLA" },
  { value: "< 0.8s", label: "Avg. Transaction" },
]

export default function StatsBar() {
  return (
    <section className="relative z-10 border-y border-border/40 bg-muted/50 dark:bg-card/60">
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-3xl font-black mb-1 text-primary"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
