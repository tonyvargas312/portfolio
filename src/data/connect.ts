type ConnectLink = {
  label: string
  href: string | null
}

// Replace null placeholders with profile URLs or a mailto: URL when available.
export const connectLinks: ConnectLink[] = [
  { label: 'LinkedIn', href: null },
  { label: 'Email', href: null },
  { label: 'GitHub', href: null },
  { label: 'Resume', href: '/resume' },
]
