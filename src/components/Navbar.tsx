import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

type NavbarProps = { githubUrl?: string; linkedinUrl?: string }
type Theme = 'system' | 'light' | 'dark'
const primaryLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
]

function Navbar({ githubUrl, linkedinUrl }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => {
    const current = document.documentElement.dataset.theme
    return current === 'light' || current === 'dark' ? current : 'system'
  })
  const toggleRef = useRef<HTMLButtonElement>(null)
  const profileLinks = [{ label: 'GitHub', href: githubUrl }, { label: 'LinkedIn', href: linkedinUrl }]
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
  const socialLinks = profileLinks.map(({ label, href }) => (
    <li key={label}>{href ? <a className="navbar__link" href={href} onClick={close}>{label}</a> : (
      <span className="navbar__placeholder" role="link" aria-disabled="true" aria-label={`${label} profile coming soon`}>
        {label}<span className="navbar__soon">Soon</span>
      </span>
    )}</li>
  ))

  return (
    <header className="navbar">
      <a className="navbar__skip" href="#main-content" onClick={close}>Skip to content</a>
      <div className="container navbar__inner">
        <Link className="navbar__brand" to="/" aria-label="Anthony Vargas, home" onClick={close}>Anthony Vargas</Link>
        <nav className="navbar__desktop" aria-label="Primary"><ul className="navbar__links">{mainLinks}</ul></nav>
        <nav className="navbar__desktop navbar__social" aria-label="Social profiles"><ul className="navbar__links">{socialLinks}</ul></nav>
        <div className="navbar__theme navbar__theme--desktop">
          <select aria-label="Theme" value={theme} onChange={(event) => selectTheme(event.target.value as Theme)}>
            <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
          </select>
        </div>
        <Link className="navbar__logo" to="/" aria-label="Home — logo placeholder" onClick={close}><span aria-hidden="true">Logo</span></Link>
        <button ref={toggleRef} className="navbar__toggle" type="button" aria-expanded={open}
          aria-controls="navbar-mobile-menu" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen((current) => !current)}>
          <span aria-hidden="true">{open ? '×' : '☰'}</span>
        </button>
      </div>
      <div className="container navbar__dropdown" id="navbar-mobile-menu" hidden={!open}>
        <nav aria-label="Mobile primary"><ul className="navbar__links">{mainLinks}</ul></nav>
        <nav aria-label="Mobile social profiles"><ul className="navbar__links">{socialLinks}</ul></nav>
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
