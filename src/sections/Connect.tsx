import { Link } from 'react-router-dom'
import { connectLinks } from '../data/connect'
import ContactIcon from '../components/ContactIcon'
import type { ContactIconName } from '../components/ContactIcon'
import './Connect.css'

const options: readonly { source: string; title: string; description: string; icon: ContactIconName; accessibleLabel: string }[] = [
  { source: 'LinkedIn', title: 'LinkedIn', description: 'Professional profile', icon: 'linkedin', accessibleLabel: 'Visit Anthony Vargas on LinkedIn' },
  { source: 'GitHub', title: 'GitHub', description: 'Projects & code', icon: 'github', accessibleLabel: 'Visit Anthony Vargas on GitHub' },
  { source: 'Email', title: 'Email', description: 'Get in touch', icon: 'email', accessibleLabel: 'Email Anthony Vargas' },
  { source: 'Resume', title: 'CV', description: 'View resume', icon: 'document', accessibleLabel: "View Anthony Vargas's CV" },
]

function Connect({ description = 'Explore my work, view my professional profile and resume, or contact me directly.' }: { description?: string }) {
  return (
    <section id="connect" className="connect" aria-labelledby="connect-title">
      <div className="connect__introduction">
        <h2 id="connect-title">Let’s Connect</h2>
        <p>{description}</p>
      </div>
      <nav aria-label="Connect">
        <ul className="connect__links">
          {options.map((option) => {
            const destination = connectLinks.find(({ label }) => label === option.source)
            if (!destination) return null
            const { href } = destination
            const external = href.startsWith('https://')
            const content = <><span className="connect__icon"><ContactIcon name={option.icon} /></span><span className="connect__title">{option.title}</span><span className="connect__description">{option.description}</span></>
            return <li key={option.source}>
              {href.startsWith('/') ? (
                <Link className="connect__link" to={href} aria-label={option.accessibleLabel}>{content}</Link>
              ) : (
                <a className="connect__link" href={href} aria-label={option.accessibleLabel}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}>
                  {content}
                </a>
              )}
            </li>
          })}
        </ul>
      </nav>
    </section>
  )
}

export default Connect
