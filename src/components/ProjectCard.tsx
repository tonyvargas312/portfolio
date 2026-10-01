import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../types/project'

function ProjectCard({ project, headingLevel: Heading }: { project: Project; headingLevel: 'h2' | 'h3' }) {
  const [imageFailed, setImageFailed] = useState(false)
  const image = project.previewImage ?? project.screenshots[0]
  const hasImage = Boolean(image && !imageFailed)
  const categories = [...new Set([...project.category.split(' / '), ...project.tags])]
  const resources = project.details?.resources.filter((resource) => resource.url && (resource.kind === 'GitHub' || resource.kind === 'External link')) ?? []
  return (
    <article className="project-card" data-has-image={hasImage} aria-labelledby={`${project.id}-card-title`}>
      {hasImage && image && <img className="project-card__image" src={image.url} alt={image.alt} loading="lazy" onError={() => setImageFailed(true)} />}
      <div className="project-card__content">
        <header>
          <Heading id={`${project.id}-card-title`}>{project.title}</Heading>
          <ul className="project-card__badges project-card__categories" aria-label="Project categories">{categories.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </header>
        <p className="project-card__description">{project.shortDescription}</p>
        <div className="project-card__technologies">
          <p>Technologies{project.details?.technologiesNote && <span className="project-card__technology-note"> — {project.details.technologiesNote}</span>}</p>
          <ul className="project-card__badges" aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        </div>
        <p className="project-card__status">{project.status}{project.lastUpdated && project.lastUpdated !== 'To be confirmed' && <> · Updated <time dateTime={project.lastUpdated}>{project.lastUpdated}</time></>}</p>
        <div className="project-card__links">
          {project.projectUrl && <Link to={project.projectUrl} aria-label={`View project: ${project.title}`}>View project</Link>}
          {resources.map((resource) => <a key={resource.id} href={resource.url!} target="_blank" rel="noopener noreferrer" aria-label={`${resource.kind === 'GitHub' ? 'GitHub' : resource.title}: ${project.title}`}>{resource.kind === 'GitHub' ? 'GitHub' : resource.title}</a>)}
        </div>
      </div>
    </article>
  )
}
export default ProjectCard
