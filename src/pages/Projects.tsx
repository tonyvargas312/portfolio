import ProjectPreview from '../components/ProjectPreview'
import type { Project } from '../types/project'
import './Projects.css'

function Projects({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="projects-page">
      <header className="projects-page__heading">
        <h1>Projects</h1>
        <p className="reading-width">Software, game development, and university projects — a closer look at what I’m building.</p>
      </header>
      <div className="projects-page__list">
        {projects.map((project, index) => (
          <ProjectPreview key={project.id} project={project} reversed={index % 2 === 1} showLastUpdated headingLevel="h2" />
        ))}
      </div>
    </div>
  )
}

export default Projects
