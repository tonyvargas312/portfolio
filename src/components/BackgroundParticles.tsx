import type { CSSProperties } from 'react'
import './BackgroundParticles.css'

// Fixed distribution keeps rendering deterministic without timers or random state.
const particles = Array.from({ length: 256 }, (_, index) => ({
  left: `${(index * 37 + 7) % 100}%`,
  top: `${(index * 23 + 3) % 100}%`,
  '--particle-size': index % 3 === 0 ? '2px' : '1px',
  '--drift-duration': `${80 + (index % 5) * 10}s`,
  '--drift-delay': `${-index * 7}s`,
  '--twinkle-duration': `${7 + (index % 4) * 2}s`,
  '--twinkle-delay': `${-index * 3}s`,
}) as CSSProperties)

function BackgroundParticles() {
  return (
    <div className="background-particles" aria-hidden="true">
      {particles.map((style, index) => (
        <span className="background-particles__particle" key={index} style={style} />
      ))}
    </div>
  )
}

export default BackgroundParticles
