import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowIcon from './ArrowIcon'
import ProjectCard from './ProjectCard'
import { connectLinks } from '../data/connect'
import type { Project } from '../types/project'
import { filterProjects, getProjectTags } from '../lib/projectFilters'
import '../sections/EducationPreview.css'
import './ProjectsShowcase.css'

function ProjectsShowcase({ projects, headingLevel: Heading = 'h2', introduction }: {
  projects: readonly Project[]
  headingLevel?: 'h1' | 'h2'
  introduction?: string
}) {
  const id = useId()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [tagsExpanded, setTagsExpanded] = useState(false)
  const [moreExpanded, setMoreExpanded] = useState(false)
  const tags = [...new Set(projects.flatMap(getProjectTags))]
  const filteredProjects = filterProjects(projects, selectedTag)
  const github = connectLinks.find((link) => link.label === 'GitHub')
  function tagButton(tag: string) {
    return <button key={tag} type="button" className="projects-showcase__pill" aria-pressed={selectedTag === tag} onClick={() => setSelectedTag(tag)}>{tag}</button>
  }
  return (
    <section className="projects-showcase" aria-labelledby={`${id}-title`}>
      <header className="section-heading">
        <Heading className="section-title" id={`${id}-title`}>Projects</Heading>
        {introduction && <p className="reading-width">{introduction}</p>}
      </header>
      <div className="projects-showcase__filters" role="group" aria-label="Filter projects by tag">
        <div className="projects-showcase__tag-row">
          <button type="button" className="projects-showcase__pill" aria-pressed={!tagsExpanded || selectedTag === null} aria-label={!tagsExpanded && selectedTag ? `${selectedTag} filter active. Show all projects` : undefined} onClick={() => setSelectedTag(null)}>{!tagsExpanded && selectedTag ? selectedTag : 'All Tags'}</button>
          {tags.length > 0 && <button type="button" className="projects-showcase__pill projects-showcase__more-tags" aria-expanded={tagsExpanded} aria-controls={`${id}-tags`} aria-label={tagsExpanded ? 'Hide project tags' : 'Show project tags'} onClick={() => setTagsExpanded((current) => !current)}>{tagsExpanded ? '−' : '+'}</button>}
        </div>
        <div className="projects-showcase__reveal" data-expanded={tagsExpanded} id={`${id}-tags`} inert={!tagsExpanded} aria-hidden={!tagsExpanded}>
          <div className="projects-showcase__reveal-inner"><div className="projects-showcase__tag-row projects-showcase__extra-tags">{tags.map(tagButton)}</div></div>
        </div>
      </div>
      <span className="projects-showcase__sr-only" role="status">{filteredProjects.length} projects shown{selectedTag ? ` for ${selectedTag}` : ''}.</span>
      <div className="projects-showcase__grid">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} headingLevel={Heading === 'h1' ? 'h2' : 'h3'} />)}</div>
      <div className="education-preview__controls">
        <button type="button" className="education-preview__toggle" aria-expanded={moreExpanded} aria-controls={`${id}-coming-soon`} aria-label={moreExpanded ? 'Hide upcoming projects' : 'Show upcoming projects'} onClick={() => setMoreExpanded((current) => !current)}><ArrowIcon direction={moreExpanded ? 'up' : 'down'} /></button>
      </div>
      <div className="projects-showcase__reveal" data-expanded={moreExpanded} id={`${id}-coming-soon`} inert={!moreExpanded} aria-hidden={!moreExpanded}>
        <div className="projects-showcase__reveal-inner">
          <aside className="projects-showcase__coming-soon">
            <h3>More Projects Coming Soon...</h3>
            <p>More data engineering and software projects are currently in development.</p>
            <div className="projects-showcase__coming-links">
              {github && <a href={github.href} target="_blank" rel="noopener noreferrer">GitHub</a>}
              <Link to="/">Portfolio / Website</Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
export default ProjectsShowcase
