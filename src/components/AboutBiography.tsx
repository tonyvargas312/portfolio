import PortfolioPhoto from './PortfolioPhoto'
import { biography } from '../data/biography'

function BiographyParagraphs({ paragraphs }: { paragraphs: typeof biography }) {
  return (
    <div className="about-page__introduction-text stack">
      {paragraphs.map(({ text, highlights = [] }) => (
        <p key={text}>{highlights.length === 0 ? text : text.split(new RegExp(`(${highlights.join('|')})`, 'g')).map((part, index) => highlights.includes(part) ? <strong key={index}>{part}</strong> : part)}</p>
      ))}
    </div>
  )
}

function AboutBiography() {
  return (
    <section className="about-page__introduction about-biography" aria-labelledby="about-page-title">
      <header className="about-biography__intro stack">
        <h1 id="about-page-title" className="about-page__title">About Me</h1>
        <BiographyParagraphs paragraphs={biography.slice(0, 1)} />
      </header>
      <div className="about-biography__row about-biography__row--text-first">
        <div className="about-page__personal-photo"><PortfolioPhoto filename="lankaster.jpeg" alt="Anthony standing outdoors" /></div>
        <BiographyParagraphs paragraphs={biography.slice(1, 5)} />
      </div>
      <div className="about-biography__row">
        <div className="about-page__personal-photo">
          <PortfolioPhoto filename="beach.jpeg" alt="Anthony in the water at the beach" />
        </div>
        <BiographyParagraphs paragraphs={biography.slice(5)} />
      </div>
    </section>
  )
}

export default AboutBiography
