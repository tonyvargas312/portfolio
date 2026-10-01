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
      <p className="footer__copyright">© 2026 Anthony Vargas</p>
      <button className="footer__back-to-top" type="button" onClick={backToTop}>Back to top</button>
      <nav className="footer__navigation" aria-label="Footer social profiles">
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
