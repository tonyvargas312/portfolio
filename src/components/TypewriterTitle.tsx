import { useEffect, useState, useSyncExternalStore } from 'react'

const roles = [['Computer', 'Engineer'], ['Software', 'Developer'], ['Data', 'Engineer']] as const
const motionQuery = '(prefers-reduced-motion: reduce)'

function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

function TypewriterTitle() {
  const reducedMotion = useSyncExternalStore(subscribeToMotion, () => window.matchMedia(motionQuery).matches, () => true)
  const [frame, setFrame] = useState({ roleIndex: 0, length: 0 })

  useEffect(() => {
    if (reducedMotion) return
    let roleIndex = 0
    let length = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>
    function tick() {
      const roleLength = roles[roleIndex].join('').length
      length += deleting ? -1 : 1
      setFrame({ roleIndex, length })
      let delay = deleting ? 45 : 80
      if (!deleting && length === roleLength) {
        deleting = true
        delay = 1800
      } else if (deleting && length === 0) {
        deleting = false
        roleIndex = (roleIndex + 1) % roles.length
        delay = 350
      }
      timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, 350)
    return () => clearTimeout(timer)
  }, [reducedMotion])

  const role = reducedMotion ? roles[0] : roles[frame.roleIndex]
  const length = reducedMotion ? role.join('').length : frame.length

  return (
    <h1 id="hero-title" className="hero__title">
      <span className="hero__accessible-title">Computer Engineer, Software Developer, and Data Engineer</span>
      <span className="hero__title-layout" aria-hidden="true">
          {role.map((word, index) => {
            const start = index === 0 ? 0 : role[0].length
            const typedWord = word.slice(0, Math.max(0, length - start))
            const cursorHere = index === 0 ? length <= role[0].length : length > role[0].length
            return <span className="hero__title-line" key={index}>{typedWord}{cursorHere && <span className="hero__cursor">|</span>}</span>
          })}
      </span>
    </h1>
  )
}

export default TypewriterTitle
