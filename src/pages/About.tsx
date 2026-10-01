import type { ReactNode } from 'react'
import AboutVideo from '../components/AboutVideo'
import AboutBiography from '../components/AboutBiography'
import PortfolioPhoto from '../components/PortfolioPhoto'
import PersonalPhotoCarousel from '../components/PersonalPhotoCarousel'
import Connect from '../sections/Connect'
import { featuredEducation } from '../data/education'
import {
  background, workingApproach, interests, educationDescription,
  beyondSoftware, currentFocus, aboutConnectDescription,
} from '../data/about'
import './About.css'

function Paragraphs({ paragraphs, highlights = [] }: { paragraphs: readonly string[]; highlights?: readonly string[] }) {
  return <div className="stack">{paragraphs.map((paragraph) => <p key={paragraph}>{highlights.length === 0 ? paragraph : paragraph.split(new RegExp(`(${highlights.join('|')})`, 'gi')).map((part, index) => highlights.some((highlight) => highlight.toLowerCase() === part.toLowerCase()) ? <strong key={index}>{part}</strong> : part)}</p>)}</div>
}

function AboutSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="about-page__section" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <div className="about-page__article">{children}</div>
    </section>
  )
}

function About() {
  return (
    <div className="about-page">
      <section className="about-page__video" aria-label="Video introduction">
        <AboutVideo />
      </section>
      <AboutBiography />
      <section className="about-page__section about-page__background" aria-labelledby="about-background">
        <h2 id="about-background">Background</h2>
        <div className="about-biography__row about-biography__row--text-first">
          <div className="about-page__personal-photo"><PortfolioPhoto filename="childhood.jpeg" alt="Anthony as a child" /></div>
          <div className="about-page__introduction-text">
            <Paragraphs paragraphs={background} highlights={['Computer Engineering', 'Data Engineering', 'systems integration']} />
          </div>
        </div>
      </section>
      <AboutSection id="about-process" title="How I work"><Paragraphs paragraphs={workingApproach} highlights={['problem itself', 'AI-assisted development tools']} /></AboutSection>
      <AboutSection id="about-interests" title="What I’m interested in">
        <div className="about-page__areas">
          {interests.map(({ title, paragraphs, highlights }) => (
            <div className="stack" key={title}><h3>{title}</h3><Paragraphs paragraphs={paragraphs} highlights={highlights} /></div>
          ))}
        </div>
      </AboutSection>
      <AboutSection id="about-education" title="Education">
        <div className="stack">
          <h3>{featuredEducation.title}</h3>
          <p className="about-page__muted">{featuredEducation.status}</p>
          <Paragraphs paragraphs={educationDescription} highlights={['Computer Engineering', 'HL7 FHIR', 'interoperability']} />
        </div>
      </AboutSection>
      <section className="about-page__beyond" aria-labelledby="about-beyond">
        <div className="about-page__article stack">
          <h2 id="about-beyond">Beyond software</h2>
          <Paragraphs paragraphs={beyondSoftware} highlights={['Monteverde, Costa Rica', 'photography', 'Russian as a third language']} />
        </div>
        <PersonalPhotoCarousel />
      </section>
      <AboutSection id="about-currently" title="Currently"><Paragraphs paragraphs={currentFocus} highlights={['Data Engineering', 'Data Architecture', 'artificial intelligence', 'neural networks', 'neuroscience']} /></AboutSection>
      <Connect description={aboutConnectDescription} />
    </div>
  )
}

export default About
