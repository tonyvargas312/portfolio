import Navbar from './components/Navbar'
import Hero from './sections/Hero'

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container page stack" tabIndex={-1}>
        <Hero />
      </main>
    </>
  )
}

export default App
