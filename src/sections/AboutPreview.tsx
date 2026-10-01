import { Link } from 'react-router-dom'
import AboutPortrait from '../components/AboutPortrait'
import './AboutPreview.css'

function AboutPreview() {
  return (
    <section className="about-preview" aria-labelledby="about-preview-title">
      <h2 id="about-preview-title">About Me</h2>
      <div className="about-preview__layout">
        <div className="about-preview__photo">
          <AboutPortrait />
        </div>
        <div className="about-preview__content reading-width stack">
          <div className="about-preview__heading">
            <h3>Learning by building.</h3>
          </div>
          <p className="about-preview__introduction">
            I’m Anthony Vargas, a Computer Engineering student interested in Data
            Engineering and software development.
          </p>
          <p>
            I enjoy building practical technical projects. I’m currently developing
            software, games, and university projects, learning continuously through
            hands-on experimentation.
          </p>
          <Link className="about-preview__link" to="/about">More about me</Link>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
