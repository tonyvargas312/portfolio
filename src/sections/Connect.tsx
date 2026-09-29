import { Link } from 'react-router-dom'
import { connectLinks } from '../data/connect'
import './Connect.css'

function Connect() {
  return (
    <section className="connect" aria-labelledby="connect-title">
      <div className="connect__introduction">
        <h2 id="connect-title">Let’s connect</h2>
        <p>
          Explore my work, view my professional profile and resume, or contact me
          directly.
        </p>
      </div>
      <nav aria-label="Connect">
        <ul className="connect__links">
          {connectLinks.map(({ label, href }) => (
            <li key={label}>
              {href ? (
                href.startsWith('/') ? <Link className="connect__link" to={href}>{label}</Link>
                  : <a className="connect__link" href={href}>{label}</a>
              ) : (
                <span className="connect__placeholder" role="link" aria-disabled="true"
                  aria-label={`${label} — coming soon`}>
                  {label}
                  <span className="connect__soon">Coming soon</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

export default Connect
