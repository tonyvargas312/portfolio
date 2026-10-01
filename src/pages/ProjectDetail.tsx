import { Link } from 'react-router-dom'
import ProjectGallery from '../components/ProjectGallery'
import type { Project, ProjectDetails } from '../types/project'
import './ProjectDetail.css'

const optionalSections: readonly { field: keyof Pick<ProjectDetails,
  'architecture' | 'dataFlow' | 'aiDetails' | 'modelEvaluation' | 'qaValidation' | 'privacySecurity'>; title: string }[] = [
  { field: 'architecture', title: 'Architecture' },
  { field: 'dataFlow', title: 'Data / Realtime Flow' },
  { field: 'aiDetails', title: 'AI / Model Details' },
  { field: 'modelEvaluation', title: 'Model Evaluation' },
  { field: 'qaValidation', title: 'QA & Validation' },
  { field: 'privacySecurity', title: 'Privacy & Security' },
]

function ProjectDetail({ project, details }: { project: Project; details: ProjectDetails }) {
  return (
    <article className="project-detail">
      <header className="project-detail__header">
        <Link to="/projects">Back to projects</Link>
        <p className="project-detail__category">{project.category}</p>
        <h1>{project.title}</h1>
        <dl className="project-detail__metadata">
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          <div><dt>Technologies</dt><dd>{project.technologies.join(' · ') || 'To be confirmed'}</dd></div>
        </dl>
      </header>
      <ProjectGallery key={project.id} images={project.screenshots} title={project.title} />
      <div className="project-detail__sections">
        <section aria-labelledby="overview-title"><h2 id="overview-title">Overview</h2><p>{details.overview || project.shortDescription}</p></section>
        <section aria-labelledby="description-title"><h2 id="description-title">Detailed Description</h2><p>{details.description}</p></section>
        <section aria-labelledby="features-title">
          <h2 id="features-title">Key Features</h2>
          <ul>{details.keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </section>
        <section aria-labelledby="development-title"><h2 id="development-title">Development Status</h2><p>{details.developmentStatus}</p></section>
        <section aria-labelledby="technologies-title"><h2 id="technologies-title">Technologies</h2><p>{details.technologiesNote && <>{details.technologiesNote}<br /></>}{project.technologies.join(' · ') || 'To be confirmed'}</p></section>
        {optionalSections.map(({ field, title }) => {
          const paragraphs = details[field]?.filter((paragraph) => paragraph.trim())
          if (!paragraphs?.length) return null
          const headingId = `${field}-title`
          return (
            <section key={field} aria-labelledby={headingId}>
              <h2 id={headingId}>{title}</h2>
              <div className="stack">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
            </section>
          )
        })}
        {!!details.gallery?.length && (
          <section aria-labelledby="gallery-title">
            <h2 id="gallery-title">Gallery / Mockups</h2>
            <ProjectGallery key={`${project.id}-gallery`} images={details.gallery} title={`${project.title} gallery / mockups`} />
          </section>
        )}
        <section aria-labelledby="resources-title">
          <h2 id="resources-title">Documents &amp; Resources</h2>
          <ul className="project-detail__resources">
            {details.resources.map((resource) => (
              <li key={resource.id}>
                <span className="project-detail__resource-kind">{resource.kind}</span>
                {resource.url ? <a href={resource.url} download={resource.download || undefined}>{resource.title}</a> : <span>{resource.title}</span>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}

export default ProjectDetail
