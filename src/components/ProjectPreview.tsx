import type { Project } from '../types/project'
import './ProjectPreview.css'

type ProjectPreviewProps = {
  project: Project
  reversed?: boolean
  showLastUpdated?: boolean
  headingLevel?: 'h2' | 'h3'
}

function ProjectPreview({ project, reversed = false, showLastUpdated = false, headingLevel: Heading = 'h3' }: ProjectPreviewProps) {
  const titleId = `${project.id}-title`

  return (
    <article
      className={`project-preview${reversed ? ' project-preview--reversed' : ''}`}
      aria-labelledby={titleId}
    >
      {project.previewImage ? (
        <figure className="project-preview__media">
          <img className="project-preview__photo" src={project.previewImage.url} alt={project.previewImage.alt} loading="lazy" />
          {project.previewImage.caption && <figcaption>{project.previewImage.caption}</figcaption>}
        </figure>
      ) : (
        <div className="project-preview__image" aria-hidden="true">
          <span>Project image coming soon</span>
        </div>
      )}
      <div className="project-preview__content">
        <p className="project-preview__category">{project.category}</p>
        <Heading id={titleId}>{project.title}</Heading>
        <p className="project-preview__description">{project.shortDescription}</p>
        <dl className="project-preview__details">
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
          <div>
            <dt>Technologies</dt>
            <dd>{project.technologies?.length ? project.technologies.join(' · ') : 'To be confirmed'}</dd>
          </div>
          {showLastUpdated && (
            <div>
              <dt>Last updated</dt>
              <dd>{project.lastUpdated ? <time dateTime={project.lastUpdated}>{project.lastUpdated}</time> : 'To be confirmed'}</dd>
            </div>
          )}
        </dl>
        {project.projectUrl ? (
          <a className="project-preview__link" href={project.projectUrl} aria-label={`View project: ${project.title}`}>
            View project
          </a>
        ) : (
        <span
          className="project-preview__link"
          role="link"
          aria-disabled="true"
          aria-label={`View project: ${project.title} (not yet available)`}
        >
          View project
        </span>
        )}
      </div>
    </article>
  )
}

export default ProjectPreview
