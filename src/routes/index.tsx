import { createFileRoute } from "@tanstack/react-router"
import Features from "#/components/Features"
import Hero from "#/components/Hero"
import Security from "#/components/Security"
import StatsBar from "#/components/StatsBar"
import SupportedChains from "#/components/SupportedChains"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <main className="pb-8 pt-14">
      <Hero />
      <StatsBar />
      <Features />
      <Security />
      <SupportedChains />
    </main>
  )
}
