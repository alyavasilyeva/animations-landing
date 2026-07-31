export type SiteLink = {
  label: string
  href: string
  /** Show as a primary nav item in the header (desktop + mobile). */
  inHeader?: boolean
}

/** Shared site links — footer shows all; header shows those marked `inHeader`. */
export const SITE_LINKS: SiteLink[] = [
  { label: "Developers", href: "/developers", inHeader: true },
  { label: "Blog", href: "/blog", inHeader: true },
  { label: "Status", href: "/status", inHeader: true },
  { label: "Bug Bounty", href: "/bug-bounty" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
]

export const HEADER_LINKS = SITE_LINKS.filter((link) => link.inHeader)
