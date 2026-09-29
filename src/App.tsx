import Navbar from './components/Navbar'
import BackgroundParticles from './components/BackgroundParticles'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import FeaturedProjects from './sections/FeaturedProjects'
import AboutPreview from './sections/AboutPreview'
import EducationPreview from './sections/EducationPreview'
import Connect from './sections/Connect'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import { projects } from './data/projects'

const featuredProjects = projects.filter((project) => project.featured)

function App() {
  const path = window.location.pathname.replace(/\/+$/, '')
  const isProjectsPage = path === '/projects'
  const detailProject = projects.find((project) => project.projectUrl === path && project.details)
  return (
    <>
      <BackgroundParticles />
      <Navbar />
      <main id="main-content" className="container page stack" tabIndex={-1}>
        {detailProject?.details ? <ProjectDetail project={detailProject} details={detailProject.details} />
          : isProjectsPage ? <Projects projects={projects} /> : <>
        <Hero />
        <FeaturedProjects projects={featuredProjects} />
        <AboutPreview />
        <EducationPreview />
        <Connect />
        </>}
      </main>
      <Footer />
    </>
  )
}

export default App
