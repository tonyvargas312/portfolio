import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import heroTechOrbit from '../assets/hero-tech-orbit.png'
import TypewriterTitle from '../components/TypewriterTitle'
import './Hero.css'

function Hero() {
  const artwork = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    function update() {
      frame = 0
      if (!artwork.current) return
      const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
      artwork.current.style.setProperty('--orbit-rotation', `${motion.matches ? 0 : progress * 12}deg`)
    }
    function schedule() { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    motion.addEventListener('change', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      motion.removeEventListener('change', schedule)
    }
  }, [])
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__introduction">
        <TypewriterTitle />
        <p className="hero__statement">
          I build software, explore data-driven systems, and develop technical
          projects that turn ideas into practical solutions.
        </p>
        <div className="hero__actions">
          <a className="hero__primary" href="/#connect">Connect</a>
          <Link className="hero__secondary" to="/resume">Resume</Link>
        </div>
      </div>
      <div className="hero__visual">
        <img
          className="hero__artwork"
          ref={artwork}
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
