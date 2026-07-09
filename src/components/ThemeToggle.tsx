import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

type ThemeMode = "light" | "dark"

function getSystemTheme(): ThemeMode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function getInitialMode(): ThemeMode {
  const stored = window.localStorage.getItem("theme")
  if (stored === "light" || stored === "dark") {
    return stored
  }

  return getSystemTheme()
}

function applyThemeMode(mode: ThemeMode) {
  document.documentElement.classList.remove("light", "dark")
  document.documentElement.classList.add(mode)
  document.documentElement.setAttribute("data-theme", mode)
  document.documentElement.style.colorScheme = mode
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("light")

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  function toggleMode() {
    const nextMode: ThemeMode = mode === "light" ? "dark" : "light"
    setMode(nextMode)
    applyThemeMode(nextMode)
    window.localStorage.setItem("theme", nextMode)
  }

  const label =
    mode === "dark"
      ? "Theme mode: dark. Click to switch to light mode."
      : "Theme mode: light. Click to switch to dark mode."

  const Icon = mode === "dark" ? Moon : Sun

  return (
    <Button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      variant="outline"
      size="icon-sm"
      className="rounded-xl text-muted-foreground hover:text-foreground hover:scale-[1.02] active:scale-[0.98]"
    >
      <Icon className="size-5" />
      <span className="sr-only">{label}</span>
    </Button>
  )
}
