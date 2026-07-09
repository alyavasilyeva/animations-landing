import { Menu, Wallet, X } from "lucide-react"
import { useState } from "react"
import ThemeToggle from "./ThemeToggle"
import { Button } from "./ui/button"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    // <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
    //   <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
    //     <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
    //       <Link
    //         to="/"
    //         className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline chip-shadow sm:px-4 sm:py-2"
    //       >
    //         <span className="brand-dot h-2 w-2 rounded-full" />
    //         TanStack Start
    //       </Link>
    //     </h2>

    //     <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0">
    //       <Link
    //         to="/"
    //         className="nav-link"
    //         activeProps={{ className: "nav-link is-active" }}
    //       >
    //         Home
    //       </Link>
    //       <Link
    //         to="/about"
    //         className="nav-link"
    //         activeProps={{ className: "nav-link is-active" }}
    //       >
    //         About
    //       </Link>
    //       <a
    //         href="https://tanstack.com/start/latest/docs/framework/react/overview"
    //         className="nav-link"
    //         target="_blank"
    //         rel="noreferrer"
    //       >
    //         Docs
    //       </a>
    //     </div>

    //     <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
    //       <a
    //         href="https://x.com/tan_stack"
    //         target="_blank"
    //         rel="noreferrer"
    //         className="hidden rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] sm:block"
    //       >
    //         <span className="sr-only">Follow TanStack on X</span>
    //         <svg viewBox="0 0 16 16" aria-hidden="true" width="24" height="24">
    //           <path
    //             fill="currentColor"
    //             d="M12.6 1h2.2L10 6.48 15.64 15h-4.41L7.78 9.82 3.23 15H1l5.14-5.84L.72 1h4.52l3.12 4.73L12.6 1zm-.77 12.67h1.22L4.57 2.26H3.26l8.57 11.41z"
    //           />
    //         </svg>
    //       </a>
    //       <a
    //         href="https://github.com/TanStack"
    //         target="_blank"
    //         rel="noreferrer"
    //         className="hidden rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] sm:block"
    //       >
    //         <span className="sr-only">Go to TanStack GitHub</span>
    //         <svg viewBox="0 0 16 16" aria-hidden="true" width="24" height="24">
    //           <path
    //             fill="currentColor"
    //             d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
    //           />
    //         </svg>
    //       </a>

    //       <ThemeToggle />
    //     </div>
    //   </nav>
    // </header>
    <header className="relative z-50 border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6d28d9)" }}
          >
            <Wallet className="w-4 h-4 text-white" />
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            // style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            WALLET
            <span style={{ color: "#8b5cf6" }}>.</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
            Features
          </p>
          <p className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
            Learn
          </p>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button
            variant={"outline"}
            className="text-sm px-4 py-2 rounded-xl text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign in
          </Button>
          <Button
            className="text-sm px-5 py-2 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] hover:cursor-pointer"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}
          >
            Get wallet
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-card py-4 px-5">
          <p className="block py-2.5 text-sm text-muted-foreground hover:text-foreground">
            Features
          </p>
          <p className="block py-2.5 text-sm text-muted-foreground hover:text-foreground">
            Learn
          </p>
          <div className="flex gap-3 mt-4">
            <Button
              variant={"outline"}
              className="flex-1 text-sm py-2.5 rounded-xl text-muted-foreground border border-border"
            >
              Sign in
            </Button>
            <Button
              className="flex-1 text-sm py-2.5 rounded-xl font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
              }}
            >
              Get wallet
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
