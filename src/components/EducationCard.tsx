import type { EducationPreviewItem } from '../data/education'
import './EducationCard.css'

type EducationCardProps = {
  item: EducationPreviewItem
  featured?: boolean
}

function EducationCard({ item, featured = false }: EducationCardProps) {
  return (
    <article
      className={`education-card${featured ? ' education-card--featured' : ''}`}
      aria-labelledby={`${item.id}-title`}
    >
      <div className="education-card__visual" aria-hidden="true">
        <span className="education-card__visual-label">{item.visualPlaceholder}</span>
      </div>
      <div className="education-card__content">
        <p className="education-card__category">{item.category}</p>
        <h3 id={`${item.id}-title`}>{item.title}</h3>
        <p className="education-card__provider">{item.provider}</p>
        <p className="education-card__description">{item.description}</p>
        {(item.date || item.status) && (
          <div className="education-card__metadata">
            {item.status && <span>{item.status}</span>}
            {item.date && <span>{item.date}</span>}
          </div>
        )}
        <div className="education-card__footer">
          {item.detailsUrl ? (
            <a className="education-card__link" href={item.detailsUrl}
              aria-label={`View details: ${item.title}`}>
              View details
            </a>
          ) : (
            <span className="education-card__pending" role="link" aria-disabled="true"
              aria-label={`View details: ${item.title} (coming soon)`}>
              View details <span className="education-card__soon">Coming soon</span>
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default EducationCard
