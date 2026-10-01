import { connectLinks } from '../data/connect'
import './Footer.css'

const socialLinks = connectLinks.filter(
  ({ label }) => label === 'GitHub' || label === 'LinkedIn',
)

function Footer() {
  function backToTop() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer__content">
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
      </div>
      <button className="footer__back-to-top" type="button" onClick={backToTop}>Back to top</button>
    </footer>
  )
}

export default Footer
