import './Navbar.css'

type NavbarProps = {
  githubUrl?: string
  linkedinUrl?: string
}

const primaryLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
]

function Navbar({ githubUrl, linkedinUrl }: NavbarProps) {
  const profileLinks = [
    { label: 'GitHub', href: githubUrl },
    { label: 'LinkedIn', href: linkedinUrl },
  ]

  return (
    <header className="navbar">
      <a className="navbar__skip" href="#main-content">
        Skip to content
      </a>
      <div className="container navbar__inner">
        <a className="navbar__brand" href="/" aria-label="Anthony Vargas, home">
          Anthony Vargas
        </a>
        <nav aria-label="Primary">
          <ul className="navbar__links">
            {primaryLinks.map(({ label, href }) => (
              <li key={href}>
                <a className="navbar__link" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="navbar__utilities">
          <nav aria-label="Social profiles">
            <ul className="navbar__links">
              {profileLinks.map(({ label, href }) => (
                <li key={label}>
                  {href ? (
                    <a className="navbar__link" href={href}>{label}</a>
                  ) : (
                    <span
                      className="navbar__placeholder"
                      role="link"
                      aria-disabled="true"
                      aria-label={`${label} profile coming soon`}
                      title={`${label} profile coming soon`}
                    >
                      {label}
                      <span className="navbar__soon">Soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="navbar__theme"
            type="button"
            disabled
            aria-label="Theme toggle coming soon"
          >
            Theme <span className="navbar__soon">Soon</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
