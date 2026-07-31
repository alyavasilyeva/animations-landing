import { Moon, Sun } from "lucide-react"
import { useEffect, useState, type MouseEvent } from "react"
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

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function setThemeVars(mode: ThemeMode) {
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(mode)
  root.setAttribute("data-theme", mode)
  root.style.colorScheme = mode
}

function setRevealOrigin(fromEl?: HTMLElement | null) {
  const root = document.documentElement
  const rect = fromEl?.getBoundingClientRect()
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
  const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  root.style.setProperty("--theme-x", `${x}px`)
  root.style.setProperty("--theme-y", `${y}px`)
  root.style.setProperty("--theme-r", `${endRadius}px`)
}

function applyThemeMode(
  mode: ThemeMode,
  options?: { animate?: boolean; fromEl?: HTMLElement | null },
) {
  const animate = options?.animate ?? false

  if (
    !animate ||
    prefersReducedMotion() ||
    typeof document.startViewTransition !== "function"
  ) {
    setThemeVars(mode)
    return
  }

  setRevealOrigin(options?.fromEl)
  document.documentElement.dataset.themeTransition = "reveal"
  const transition = document.startViewTransition(() => {
    setThemeVars(mode)
  })

  void transition.finished.finally(() => {
    delete document.documentElement.dataset.themeTransition
  })
}

function readDocumentTheme(): ThemeMode | null {
  if (typeof document === "undefined") {
    return null
  }
  const attr = document.documentElement.getAttribute("data-theme")
  if (attr === "light" || attr === "dark") {
    return attr
  }
  return null
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(
    () => readDocumentTheme() ?? "light",
  )

  useEffect(() => {
    const initialMode = readDocumentTheme() ?? getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  function toggleMode(event: MouseEvent<HTMLButtonElement>) {
    const nextMode: ThemeMode = mode === "light" ? "dark" : "light"
    setMode(nextMode)
    applyThemeMode(nextMode, { animate: true, fromEl: event.currentTarget })
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
