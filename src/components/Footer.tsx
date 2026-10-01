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
              <a className="footer__link" href={href} target="_blank" rel="noopener noreferrer">{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}

export default Footer
