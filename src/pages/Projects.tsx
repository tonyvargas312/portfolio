import ProjectsShowcase from '../components/ProjectsShowcase'
import type { Project } from '../types/project'

function Projects({ projects }: { projects: readonly Project[] }) {
  return <ProjectsShowcase projects={projects} headingLevel="h1" introduction="Software, game development, and university projects — a closer look at what I’m building." />
}
export default Projects
