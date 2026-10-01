import type { CSSProperties } from 'react'
import './BackgroundParticles.css'

// Fixed distribution keeps rendering deterministic without timers or random state.
const particles = Array.from({ length: 256 }, (_, index) => ({
  left: `${(index * 37 + 7) % 100}%`,
  top: `${(index * 23 + 3) % 100}%`,
  '--particle-size': index % 29 === 0 ? '3px' : index % 3 === 0 ? '2px' : '1px',
  '--drift-duration': `${80 + (index % 5) * 10}s`,
  '--drift-delay': `${-index * 7}s`,
  '--twinkle-duration': `${7 + (index % 4) * 2}s`,
  '--twinkle-delay': `${-index * 3}s`,
}) as CSSProperties)

const activeParticles = Array.from({ length: 16 }, (_, index) => ({
  left: `${(index * 43 + 11) % 100}%`,
  '--active-size': `${3 + index % 3}px`,
  '--active-duration': `${38 + index % 7 * 5}s`,
  '--active-delay': `${-index * 13}s`,
  '--active-travel': `${(index % 2 ? -1 : 1) * (8 + index % 5 * 3)}vw`,
}) as CSSProperties)

function BackgroundParticles() {
  return (
    <div className="background-particles" aria-hidden="true">
      {particles.map((style, index) => (
        <span className="background-particles__particle" key={index} style={style} />
      ))}
      <div className="background-particles__active-layer">
        {activeParticles.map((style, index) => <span key={index} className="background-particles__active" data-accent={index % 5 === 0} data-square={index % 4 === 0} style={style} />)}
      </div>
    </div>
  )
}

export default BackgroundParticles
