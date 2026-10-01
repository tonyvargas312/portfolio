import { Link } from 'react-router-dom'
import type { Project, ProjectDetails, ProjectImage } from '../types/project'
import './ProjectDetail.css'

const optionalSections: readonly { field: keyof Pick<ProjectDetails,
  'architecture' | 'dataFlow' | 'aiDetails' | 'modelEvaluation' | 'qaValidation' | 'privacySecurity'>; title: string }[] = [
  { field: 'architecture', title: 'How it works' },
  { field: 'dataFlow', title: 'Data & realtime flow' },
  { field: 'aiDetails', title: 'AI design & my role' },
  { field: 'modelEvaluation', title: 'Evaluation & next steps' },
  { field: 'qaValidation', title: 'QA & validation' },
  { field: 'privacySecurity', title: 'Privacy & design decisions' },
]

function ProjectVisual({ image }: { image: ProjectImage }) {
  return <figure className="project-detail__visual"><img src={image.url} alt={image.alt} loading="lazy" decoding="async" />{image.caption && <figcaption>{image.caption}</figcaption>}</figure>
}

function ProjectDetail({ project, details }: { project: Project; details: ProjectDetails }) {
  const images = [...project.screenshots, ...(details.gallery ?? [])].filter((image, index, all) => all.findIndex((other) => other.url === image.url) === index)
  const cover = project.previewImage ?? images[0]
  const resources = details.resources.filter((resource) => resource.url)
  return (
    <article className="project-detail">
      <header className="project-detail__header">
        <Link to="/projects" className="project-detail__back">Back to Projects</Link>
        <h1>{project.title}</h1>
        <p className="project-detail__category">{project.category}</p>
        <p className="project-detail__summary">{project.shortDescription}</p>
        <dl className="project-detail__metadata">
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          {project.lastUpdated && project.lastUpdated !== 'To be confirmed' && <div><dt>Last updated</dt><dd>{project.lastUpdated}</dd></div>}
        </dl>
      </header>
      <div className="project-detail__hero-media">
        {cover ? <ProjectVisual image={cover} /> : <div className="project-detail__preview"><span>Project preview</span><p>Visual documentation has not been added yet.</p></div>}
      </div>
      <div className="project-detail__sections">
        <section aria-labelledby="overview-title"><h2 id="overview-title">Overview</h2><div className="project-detail__copy"><p>{details.overview || project.shortDescription}</p><p className="project-detail__note">{project.status}</p></div></section>
        <section aria-labelledby="context-title"><h2 id="context-title">{project.id === 'university-parking' ? 'Problem & context' : 'Project context'}</h2><div className="project-detail__copy"><p>{details.description}</p></div></section>
        <section aria-labelledby="features-title"><h2 id="features-title">Features & scope</h2><ul className="project-detail__features">{details.keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
        <section aria-labelledby="technologies-title"><h2 id="technologies-title">Technologies</h2><div className="project-detail__copy">{details.technologiesNote && <p className="project-detail__note">{details.technologiesNote}</p>}<ul className="project-detail__stack">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div></section>
        {optionalSections.map(({ field, title }, index) => {
          const paragraphs = details[field]?.filter((paragraph) => paragraph.trim() && paragraph.trim() !== 'To be documented.')
          if (!paragraphs?.length) return null
          const image = images[index + 1]
          return <section key={field} aria-labelledby={`${field}-title`} className={image ? `project-detail__editorial ${index % 2 ? 'project-detail__editorial--reverse' : ''}` : undefined}>
            <h2 id={`${field}-title`}>{title}</h2>
            <div className="project-detail__copy">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            {image && <ProjectVisual image={image} />}
          </section>
        })}
        {images.length > 1 && <section className="project-detail__gallery-section" aria-labelledby="gallery-title"><h2 id="gallery-title">Screenshots & media</h2><div className="project-detail__gallery">{images.map((image) => <ProjectVisual key={image.url} image={image} />)}</div></section>}
        {!!project.videos.length && <section className="project-detail__gallery-section" aria-labelledby="videos-title"><h2 id="videos-title">Video previews</h2><div className="project-detail__gallery">{project.videos.map((video) => <figure className="project-detail__visual" key={video.url}><video controls preload="metadata" poster={video.posterUrl} aria-label={video.title}>{/* Existing project-provided media only. */}<source src={video.url} />{video.captionsUrl && <track kind="captions" src={video.captionsUrl} label="Captions" />}</video>{video.caption && <figcaption>{video.caption}</figcaption>}</figure>)}</div></section>}
        <section aria-labelledby="development-title"><h2 id="development-title">Current status</h2><div className="project-detail__copy"><p className="project-detail__note">{project.status}</p><p>{details.developmentStatus}</p></div></section>
        {!!resources.length && <section aria-labelledby="resources-title"><h2 id="resources-title">Project links & resources</h2><ul className="project-detail__resources">{resources.map((resource) => <li key={resource.id}><span>{resource.kind}</span><a href={resource.url!} download={resource.download || undefined} target={resource.download ? undefined : '_blank'} rel={resource.download ? undefined : 'noopener noreferrer'}>{resource.title}</a></li>)}</ul></section>}
      </div>
      <footer className="project-detail__navigation"><Link to="/projects">Back to Projects</Link><span>{project.title}</span></footer>
    </article>
  )
}

export default ProjectDetail
