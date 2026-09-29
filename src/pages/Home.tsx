import Hero from '../sections/Hero'
import FeaturedProjects from '../sections/FeaturedProjects'
import AboutPreview from '../sections/AboutPreview'
import EducationPreview from '../sections/EducationPreview'
import Connect from '../sections/Connect'
import { projects } from '../data/projects'

const featuredProjects = projects.filter((project) => project.featured)
function Home() {
  return <><Hero /><FeaturedProjects projects={featuredProjects} /><AboutPreview /><EducationPreview /><Connect /></>
}
export default Home
