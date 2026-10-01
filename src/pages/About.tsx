import type { ReactNode } from 'react'
import AboutVideo from '../components/AboutVideo'
import AboutPortrait from '../components/AboutPortrait'
import Connect from '../sections/Connect'
import { featuredEducation } from '../data/education'
import {
  introduction, background, workingApproach, interests, educationDescription,
  technologyGroups, beyondSoftware, currentFocus, aboutConnectDescription,
} from '../data/about'
import './About.css'

function Paragraphs({ paragraphs }: { paragraphs: readonly string[] }) {
  return <div className="reading-width stack">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
}

function AboutSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="about-page__section" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  )
}

function About() {
  return (
    <div className="about-page">
      <AboutVideo />
      <header className="about-page__introduction">
        <div className="about-page__introduction-text">
          <p className="about-page__eyebrow">About me</p>
          <h1>Anthony Vargas</h1>
          <p className="about-page__role">Computer Engineering Student</p>
          <Paragraphs paragraphs={introduction} />
        </div>
        <AboutPortrait />
      </header>
      <AboutSection id="about-background" title="Background"><Paragraphs paragraphs={background} /></AboutSection>
      <AboutSection id="about-process" title="How I work"><Paragraphs paragraphs={workingApproach} /></AboutSection>
      <AboutSection id="about-interests" title="What I’m interested in">
        <div className="about-page__areas reading-width">
          {interests.map(({ title, description }) => (
            <div className="stack" key={title}><h3>{title}</h3><p>{description}</p></div>
          ))}
        </div>
      </AboutSection>
      <AboutSection id="about-education" title="Education">
        <div className="stack">
          <h3>{featuredEducation.title}</h3>
          <p className="about-page__muted">{featuredEducation.status}</p>
          <Paragraphs paragraphs={educationDescription} />
        </div>
      </AboutSection>
      <AboutSection id="about-tools" title="Tools & Technologies">
        <div className="about-page__areas">
          {technologyGroups.map(({ title, tools }) => (
            <div key={title}>
              <h3>{title}</h3>
              <ul className="about-page__tools">{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
            </div>
          ))}
        </div>
      </AboutSection>
      <AboutSection id="about-beyond" title="Beyond software"><Paragraphs paragraphs={beyondSoftware} /></AboutSection>
      <AboutSection id="about-currently" title="Currently"><Paragraphs paragraphs={currentFocus} /></AboutSection>
      <Connect description={aboutConnectDescription} />
    </div>
  )
}

export default About
