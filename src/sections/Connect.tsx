import { Link } from 'react-router-dom'
import { connectLinks } from '../data/connect'
import './Connect.css'

function Connect({ description = 'Explore my work, view my professional profile and resume, or contact me directly.' }: { description?: string }) {
  return (
    <section id="connect" className="connect" aria-labelledby="connect-title">
      <div className="connect__introduction">
        <h2 id="connect-title">Let’s connect</h2>
        <p>{description}</p>
      </div>
      <nav aria-label="Connect">
        <ul className="connect__links">
          {connectLinks.map(({ label, href }) => (
            <li key={label}>
              {href.startsWith('/') ? (
                <Link className="connect__link" to={href}>{label}</Link>
              ) : (
                <a className="connect__link" href={href}
                  target={href.startsWith('https://') ? '_blank' : undefined}
                  rel={href.startsWith('https://') ? 'noopener noreferrer' : undefined}>
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}

export default Connect
