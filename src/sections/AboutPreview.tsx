import { Link } from 'react-router-dom'
import PortfolioPhoto from '../components/PortfolioPhoto'
import './AboutPreview.css'

function AboutPreview() {
  return (
    <section className="about-preview" aria-labelledby="about-preview-title">
      <div className="about-preview__layout">
        <h2 id="about-preview-title" className="section-title about-preview__title">About Me</h2>
        <div className="about-preview__photo">
          <PortfolioPhoto filename="profile.jpeg" alt="Anthony Vargas portrait" />
        </div>
        <div className="about-preview__content stack">
          <p>
            Hi, I’m Anthony Vargas, but most people call me <strong>Tony</strong>. I’m a{' '}
            <strong>Computer Engineering</strong> student focused on <strong>Data Engineering</strong>,
            software development, and building systems that connect technology with real-world problems.
          </p>
          <p>
            I’m especially interested in how data can be structured, connected, and made more useful.
            Most of what I learn comes from building projects, experimenting with new technologies,
            and following ideas until I can turn them into something tangible.
          </p>
          <p>
            Long term, I want to grow toward <strong>Data Architecture</strong> and explore the
            intersection of data, <strong>artificial intelligence</strong>, neural networks,
            and the way humans process information.
          </p>
          <Link className="about-preview__link" to="/about">More about me</Link>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
