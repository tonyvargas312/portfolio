import { useState } from 'react'
import EducationCard from '../components/EducationCard'
import ArrowIcon from '../components/ArrowIcon'
import { credentialPreviews, featuredEducation } from '../data/education'
import './EducationPreview.css'

const primaryCredentials = [
  credentialPreviews.find((item) => item.category === 'Certification'),
  credentialPreviews.find((item) => item.category === 'Microcredential'),
].filter((item) => item !== undefined)

const additionalCredentials = credentialPreviews.filter(
  (item) => !primaryCredentials.includes(item),
)

function EducationPreview() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="education-preview" aria-labelledby="education-preview-title">
      <header className="section-heading">
        <h2 className="section-title" id="education-preview-title">Education &amp; certifications</h2>
        <p>Formal study and continued learning, put into practice.</p>
      </header>
      <EducationCard item={featuredEducation} featured />
      <div className="education-preview__grid">
        {primaryCredentials.map((item) => <EducationCard key={item.id} item={item} />)}
      </div>
      {additionalCredentials.length > 0 && (
        <>
          <div
            className="education-preview__grid"
            id="additional-credentials"
            hidden={!expanded}
          >
            {additionalCredentials.map((item) => <EducationCard key={item.id} item={item} />)}
          </div>
          <div className="education-preview__controls">
            <button
              className="education-preview__toggle"
              type="button"
              aria-expanded={expanded}
              aria-controls="additional-credentials"
              aria-label={expanded
                ? 'Hide additional education and certifications'
                : 'Show more education and certifications'}
              onClick={() => setExpanded((current) => !current)}
            >
              <ArrowIcon direction={expanded ? 'up' : 'down'} />
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default EducationPreview
