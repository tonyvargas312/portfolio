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

// Seeded variation avoids repeated patterns and stays stable across renders.
function variation(index: number, salt: number) {
  const value = Math.sin((index + 1) * 127.1 + salt * 311.7) * 43758.5453
  return value - Math.floor(value)
}
const activeParticles = Array.from({ length: 24 }, (_, index) => ({
  left: `${5 + variation(index, 1) * 90}%`,
  top: `${10 + variation(index, 2) * 85}%`,
  '--active-size': `${2 + variation(index, 3) * 4}px`,
  '--active-duration': `${6 + variation(index, 4) * 6 + (index % 7 === 0 ? 3 : 0)}s`,
  '--active-delay': `${-variation(index, 5) * 15}s`,
  '--active-opacity': `${0.65 + variation(index, 6) * 0.35}`,
  '--float-x': `${20 + variation(index, 7) * 15}px`,
  '--float-y': `${-(30 + variation(index, 8) * 15)}px`,
  '--late-x': `${-(12 + variation(index, 9) * 10)}px`,
  '--late-y': `${-(65 + variation(index, 10) * 15)}px`,
}) as CSSProperties)

function BackgroundParticles() {
  return (
    <div className="background-particles" aria-hidden="true">
      {particles.map((style, index) => (
        <span className="background-particles__particle" key={index} style={style} />
      ))}
      <div className="background-particles__active-layer">
        {activeParticles.map((style, index) => <span key={index} className="background-particles__active" data-accent={index % 5 === 0} data-type={index % 8 === 6 ? 'vertical' : index % 2 ? 'square' : 'circle'} style={style} />)}
      </div>
    </div>
  )
}

export default BackgroundParticles
