import { Link } from 'react-router-dom'
import heroTechOrbit from '../assets/hero-tech-orbit.png'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__introduction">
        <h1 id="hero-title">Computer Engineering Student</h1>
        <p className="hero__statement">
          I build software, explore data-driven systems, and develop technical
          projects that turn ideas into practical solutions.
        </p>
        <div className="hero__actions">
          <Link className="hero__primary" to="/projects">View Projects</Link>
          <Link className="hero__secondary" to="/resume">Resume</Link>
        </div>
      </div>
      <div className="hero__visual">
        <img
          className="hero__artwork"
          src={heroTechOrbit}
          width={1254}
          height={1254}
          alt="Pixel-art technical illustration representing software, data, and personal projects."
        />
      </div>
    </section>
  )
}

export default Hero
