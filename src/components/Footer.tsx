import { connectLinks } from '../data/connect'
import './Footer.css'

const socialLinks = connectLinks.filter(
  ({ label }) => label === 'GitHub' || label === 'LinkedIn',
)

function Footer() {
  return (
    <footer className="footer container">
      <p>© 2026 Anthony Vargas</p>
      <nav aria-label="Footer social profiles">
        <ul className="footer__links">
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              {href ? (
                <a className="footer__link" href={href}>{label}</a>
              ) : (
                <span className="footer__placeholder" role="link" aria-disabled="true"
                  aria-label={`${label} — coming soon`}>
                  {label} <span className="footer__soon">Coming soon</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}

export default Footer
