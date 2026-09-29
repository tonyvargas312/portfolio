import IntroductionVideo from '../components/IntroductionVideo'
import Connect from '../sections/Connect'
import { featuredEducation, credentialPreviews } from '../data/education'
import { projects } from '../data/projects'
import './About.css'

const education = [featuredEducation, ...credentialPreviews]
const projectTools = [...new Set(projects.flatMap((project) => project.technologies))]

function About() {
  return (
    <div className="about-page">
      <IntroductionVideo />
      <header className="about-page__introduction">
        <p className="about-page__eyebrow">About me</p>
        <h1>Anthony Vargas</h1>
        <p className="reading-width">I’m a Computer Engineering student interested in software development and Data Engineering. I enjoy learning through practical technical projects.</p>
      </header>
      <section className="about-page__section" aria-labelledby="about-background">
        <h2 id="about-background">Background</h2>
        <div className="reading-width stack">
          <p>Computer Engineering connects my studies with the things I build. I’m currently developing software, game, and university projects, exploring how technical ideas can become practical solutions.</p>
          <p>I’m interested in Data Engineering and data-driven systems, alongside the software development work that brings those systems to life.</p>
        </div>
      </section>
      <section className="about-page__section" aria-labelledby="about-process">
        <h2 id="about-process">How I work</h2>
        <div className="reading-width stack">
          <p>I learn by building: trying an idea, experimenting with it, and using what I learn to improve the next version.</p>
          <p>Hands-on experimentation and iterative development help me turn practical problems into manageable steps. Each project is an opportunity to keep learning.</p>
        </div>
      </section>
      <section className="about-page__section" aria-labelledby="about-education">
        <h2 id="about-education">Education &amp; Certifications</h2>
        <ul className="about-page__education">
          {education.map((item) => (
            <li key={item.id}>
              <p className="about-page__eyebrow">{item.category}</p>
              <h3>{item.title}</h3>
              <p className="about-page__muted">{item.provider}</p>
              <p>{item.description}</p>
              {item.status && <p className="about-page__muted">{item.status}</p>}
              {item.date && <p className="about-page__muted">{item.date}</p>}
              {item.detailsUrl && <a href={item.detailsUrl}>View details: {item.title}</a>}
            </li>
          ))}
        </ul>
      </section>
      <section className="about-page__section" aria-labelledby="about-tools">
        <h2 id="about-tools">Tools &amp; Technologies</h2>
        <div className="stack">
          <p className="reading-width">Tools used across this portfolio and my documented project work.</p>
          <div><h3>Portfolio development</h3><ul className="about-page__tools">{['React', 'TypeScript', 'Vite', 'ESLint'].map((tool) => <li key={tool}>{tool}</li>)}</ul></div>
          <div><h3>Project development</h3><ul className="about-page__tools">{projectTools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>
        </div>
      </section>
      <section className="about-page__section" aria-labelledby="about-beyond">
        <h2 id="about-beyond">Beyond software</h2>
        <p className="reading-width about-page__muted">More about my personal interests will be added here.</p>
      </section>
      <Connect />
    </div>
  )
}

export default About
