import type { ProjectPreviewData } from '../data/projects'
import './ProjectPreview.css'

type ProjectPreviewProps = {
  project: ProjectPreviewData
}

function ProjectPreview({ project }: ProjectPreviewProps) {
  const titleId = `${project.id}-title`

  return (
    <article
      className="project-preview"
      aria-labelledby={titleId}
    >
      <div className="project-preview__image" aria-hidden="true">
        <span>Project image coming soon</span>
      </div>
      <div className="project-preview__content">
        <p className="project-preview__category">{project.category}</p>
        <h3 id={titleId}>{project.title}</h3>
        <p className="project-preview__description">{project.description}</p>
        <dl className="project-preview__details">
          <div>
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
          <div>
            <dt>Technologies</dt>
            <dd>{project.technologies?.length ? project.technologies.join(' · ') : 'To be confirmed'}</dd>
          </div>
        </dl>
        <span
          className="project-preview__link"
          role="link"
          aria-disabled="true"
          aria-label={`View project: ${project.title} (coming soon)`}
        >
          View project <span className="project-preview__soon">Coming soon</span>
        </span>
      </div>
    </article>
  )
}

export default ProjectPreview
