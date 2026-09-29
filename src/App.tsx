import { Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Resume from './pages/Resume'
import NotFound from './pages/NotFound'
import { projects } from './data/projects'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects projects={projects} />} />
        <Route path="about" element={<About />} />
        <Route path="resume" element={<Resume />} />
        {projects.filter((project) => project.details).map((project) => (
          <Route key={project.id} path={`projects/${project.slug}`}
            element={project.details && <ProjectDetail project={project} details={project.details} />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
