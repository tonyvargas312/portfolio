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
    return current === 'light' || current === 'dark' ? current : 'system'
  })
  const toggleRef = useRef<HTMLButtonElement>(null)
  const prefersDark = useSyncExternalStore(subscribeToSystemTheme, systemIsDark, () => false)
  const isDark = theme === 'dark' || (theme === 'system' && prefersDark)
  const close = () => setOpen(false)

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
          <span aria-hidden="true">{open ? '×' : '☰'}</span>
        </button>
      </div>
      <div className="container navbar__dropdown" id="navbar-mobile-menu" hidden={!open}>
        <nav aria-label="Mobile primary"><ul className="navbar__links">{mainLinks}</ul></nav>
        <div className="navbar__theme">
          <label htmlFor="navbar-theme">Theme</label>
          <select id="navbar-theme" value={theme} onChange={(event) => selectTheme(event.target.value as Theme)}>
            <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </header>
  )
}

export default Navbar
