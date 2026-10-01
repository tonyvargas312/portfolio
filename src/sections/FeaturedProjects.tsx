import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import ProjectPreview from '../components/ProjectPreview'
import ArrowIcon from '../components/ArrowIcon'
import type { Project } from '../types/project'
import './FeaturedProjects.css'

function FeaturedProjects({ projects: featuredProjects }: { projects: readonly Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const count = featuredProjects.length

  if (count === 0) return null

  function moveProject(direction: number) {
    setActiveIndex((current) => (current + direction + count) % count)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      moveProject(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  return (
    <section className="featured-projects" aria-labelledby="featured-projects-title">
      <h2 id="featured-projects-title">What I'm building</h2>
      <div
        className="featured-projects__carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="featured-projects__viewport" id="featured-projects-viewport">
          {featuredProjects.map((project, index) => (
            <div
              className="featured-projects__slide"
              key={project.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${project.title}`}
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex}
            >
              <ProjectPreview project={project} />
            </div>
          ))}
        </div>
        <div className="featured-projects__controls">
            <button type="button" onClick={() => moveProject(-1)} aria-label="Previous project" aria-controls="featured-projects-viewport">
              <ArrowIcon direction="left" />
            </button>
            <span className="featured-projects__position" role="status" aria-atomic="true" aria-label={`Project ${activeIndex + 1} of ${count}: ${featuredProjects[activeIndex].title}`}>
              {featuredProjects[activeIndex].title}
            </span>
          <div className="featured-projects__dots" role="group" aria-label="Choose a project">
            {featuredProjects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                className="featured-projects__dot"
                aria-label={`Show ${project.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                aria-controls="featured-projects-viewport"
                onClick={() => setActiveIndex(index)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => moveProject(1)} aria-label="Next project" aria-controls="featured-projects-viewport">
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
