import './Hero.css'

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__heading">
        <h1 id="hero-title">Anthony Vargas</h1>
        <p className="hero__role">Computer Engineering Student</p>
      </div>
      <div className="hero__introduction">
        <p className="hero__statement">
          I build software, explore data-driven systems, and develop technical
          projects that turn ideas into practical solutions.
        </p>
        <div className="hero__actions">
          <a className="hero__primary" href="/projects">View Projects</a>
          <a className="hero__secondary" href="/resume">Resume</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
