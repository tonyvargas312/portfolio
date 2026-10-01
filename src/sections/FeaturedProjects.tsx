import ProjectsShowcase from '../components/ProjectsShowcase'
import type { Project } from '../types/project'

function FeaturedProjects({ projects }: { projects: readonly Project[] }) {
  return <ProjectsShowcase projects={projects} />
}
export default FeaturedProjects
