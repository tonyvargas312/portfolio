import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import BackgroundParticles from './BackgroundParticles'

function SiteLayout() {
  const { pathname } = useLocation()
  const previousPath = useRef(pathname)
  const mainRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const heading = mainRef.current?.querySelector('h1')?.textContent
    document.title = `${heading || 'Portfolio'} | Anthony Vargas`
    if (previousPath.current !== pathname) {
      window.scrollTo(0, 0)
      mainRef.current?.focus({ preventScroll: true })
      previousPath.current = pathname
    }
  }, [pathname])
  return (
    <>
      <BackgroundParticles />
      <Navbar />
      <main ref={mainRef} id="main-content" className="container page stack" tabIndex={-1}><Outlet /></main>
      <Footer />
    </>
  )
}
export default SiteLayout
