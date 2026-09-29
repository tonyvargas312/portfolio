import { useEffect, useState } from 'react'
import ResumeLink from '../components/ResumeLink'
import { resumeDocument } from '../data/resume'
import './Resume.css'

const locations = ['Train Station', 'Data Center', 'Workshop'] as const
type Location = typeof locations[number]

function Resume() {
  const [searching, setSearching] = useState<Location | null>(null)
  const [results, setResults] = useState<Partial<Record<Location, string>>>({})
  const [message, setMessage] = useState('Choose a location to search.')
  const found = results.Workshop === 'You found it!'

  useEffect(() => {
    if (!searching) return
    const timer = window.setTimeout(() => {
      const result = searching === 'Workshop' ? 'You found it!' : 'Not here.'
      setResults((current) => ({ ...current, [searching]: result }))
      setMessage(`${searching}: ${result}`)
      setSearching(null)
    }, 650)
    return () => window.clearTimeout(timer)
  }, [searching])

  function search(location: Location) {
    if (searching) return
    setSearching(location)
    setMessage(`Searching ${location}…`)
  }

  return (
    <div className="resume-page">
      <header className="stack">
        <h1>Resume</h1>
        <p className="resume-page__intro">I seem to have misplaced my resume. Can you find it?</p>
      </header>
      <section className="resume-map" aria-label="Find the resume" aria-describedby="resume-map-description">
        <p id="resume-map-description" className="resume-map__legend">A fictional map. Three places to look.</p>
        <div className="resume-map__locations">
          {locations.map((location, index) => (
            <button key={location} type="button" className="resume-map__location"
              data-searching={searching === location} data-found={location === 'Workshop' && found}
              aria-disabled={searching !== null} onClick={() => search(location)}>
              <span className="resume-map__marker" aria-hidden="true">0{index + 1}</span>
              <span>{location}</span>
              <span className="resume-map__result" aria-hidden="true">
                {searching === location ? 'Searching…' : results[location] || 'Search here'}
              </span>
            </button>
          ))}
        </div>
        <p className="resume-map__status" role="status" aria-live="polite" aria-atomic="true">{message}</p>
      </section>
      {found && (
        <section className="resume-page__discovery" aria-labelledby="resume-found-title">
          <h2 id="resume-found-title">You found it!</h2>
          <div className="resume-page__actions"><ResumeLink>View Resume</ResumeLink><ResumeLink download>Download PDF</ResumeLink></div>
        </section>
      )}
      <div className="resume-page__direct">
        <p>In a hurry? <ResumeLink download>Download resume directly.</ResumeLink></p>
        {!resumeDocument.url && <p id="resume-file-status" className="resume-page__note">The resume PDF has not been added yet. View and download links will be available once it is ready.</p>}
      </div>
    </div>
  )
}

export default Resume
