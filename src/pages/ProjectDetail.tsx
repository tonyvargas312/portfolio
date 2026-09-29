import { Link } from 'react-router-dom'
import ProjectGallery from '../components/ProjectGallery'
import type { Project, ProjectDetails } from '../types/project'
import './ProjectDetail.css'

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
        <section aria-labelledby="overview-title"><h2 id="overview-title">Overview</h2><p>{project.shortDescription}</p></section>
        <section aria-labelledby="description-title"><h2 id="description-title">Detailed Description</h2><p>{details.description}</p></section>
        <section aria-labelledby="features-title">
          <h2 id="features-title">Key Features</h2>
          <ul>{details.keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </section>
        <section aria-labelledby="development-title"><h2 id="development-title">Development Status</h2><p>{details.developmentStatus}</p></section>
        <section aria-labelledby="technologies-title"><h2 id="technologies-title">Technologies</h2><p>{project.technologies.join(' · ') || 'To be confirmed'}</p></section>
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
