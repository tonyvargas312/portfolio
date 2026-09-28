import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import FeaturedProjects from './sections/FeaturedProjects'

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container page stack" tabIndex={-1}>
        <Hero />
        <FeaturedProjects />
      </main>
    </>
  )
}

export default App
