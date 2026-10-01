import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Link, NavLink } from 'react-router-dom'
import slothLogo from '../assets/logo-sloth.png'
import moonIcon from '../assets/theme-moon.png'
import sunIcon from '../assets/theme-sun.png'
import './Navbar.css'

type Theme = 'system' | 'light' | 'dark'
function subscribeToSystemTheme(onChange: () => void) {
  const preference = window.matchMedia('(prefers-color-scheme: dark)')
  preference.addEventListener('change', onChange)
  return () => preference.removeEventListener('change', onChange)
}
const systemIsDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches
const primaryLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => {
    const current = document.documentElement.dataset.theme
    if (current === 'light' || current === 'dark') return current
    try {
      const saved = localStorage.getItem('portfolio-theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch { /* Fall back to the system theme when storage is unavailable. */ }
    return 'system'
  })
  const toggleRef = useRef<HTMLButtonElement>(null)
  const prefersDark = useSyncExternalStore(subscribeToSystemTheme, systemIsDark, () => false)
  const isDark = theme === 'dark' || (theme === 'system' && prefersDark)
  const close = () => setOpen(false)

  useEffect(() => {
    if (theme === 'system') delete document.documentElement.dataset.theme
    else document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    if (!open) return
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', escape)
    const desktop = window.matchMedia('(min-width: 64rem)')
    function resize() { if (desktop.matches) setOpen(false) }
    desktop.addEventListener('change', resize)
    return () => {
      document.removeEventListener('keydown', escape)
      desktop.removeEventListener('change', resize)
    }
  }, [open])

  function selectTheme(value: Theme) {
    setTheme(value)
    if (value === 'system') delete document.documentElement.dataset.theme
    else document.documentElement.dataset.theme = value
    try {
      if (value === 'system') localStorage.removeItem('portfolio-theme')
      else localStorage.setItem('portfolio-theme', value)
    } catch { /* Persistence is optional when browser storage is restricted. */ }
  }

  const mainLinks = primaryLinks.map(({ label, href }) => (
    <li key={href}><NavLink className="navbar__link" to={href} onClick={close}>{label}</NavLink></li>
  ))

  return (
    <header className="navbar">
      <a className="navbar__skip" href="#main-content" onClick={close}>Skip to content</a>
      <div className="navbar__inner">
        <Link className="navbar__brand" to="/" aria-label="Anthony Vargas, home" onClick={close}>Anthony Vargas</Link>
        <nav className="navbar__desktop" aria-label="Primary"><ul className="navbar__links">{mainLinks}</ul></nav>
        <div className="navbar__controls">
          <button className="navbar__theme-icon" type="button"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={() => selectTheme(isDark ? 'light' : 'dark')}>
            <img src={isDark ? moonIcon : sunIcon} alt="" />
          </button>
          <Link className="navbar__logo" to="/" aria-label="Anthony Vargas, home" onClick={close}>
            <img src={slothLogo} alt="" />
          </Link>
        </div>
        <button ref={toggleRef} className="navbar__toggle" type="button" aria-expanded={open}
          aria-controls="navbar-mobile-menu" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen((current) => !current)}>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d={open ? 'M5 5l14 14M19 5 5 19' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>
      <div className="container navbar__dropdown" id="navbar-mobile-menu" hidden={!open}>
        <nav aria-label="Mobile primary"><ul className="navbar__links">{mainLinks}</ul></nav>
        <div className="navbar__theme">
          <button className="navbar__theme-switch" type="button" role="switch" aria-checked={isDark}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => selectTheme(isDark ? 'light' : 'dark')}>
            <span className="navbar__theme-thumb" aria-hidden="true" />
            <img src={sunIcon} alt="" /><img src={moonIcon} alt="" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
