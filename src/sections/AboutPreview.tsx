import './AboutPreview.css'

function AboutPreview() {
  return (
    <section className="about-preview" aria-labelledby="about-preview-title">
      <div className="about-preview__heading">
        <p className="about-preview__label">About me</p>
        <h2 id="about-preview-title">Learning by building.</h2>
      </div>
      <div className="about-preview__content reading-width stack">
        <p className="about-preview__introduction">
          I’m Anthony Vargas, a Computer Engineering student interested in Data
          Engineering and software development.
        </p>
        <p>
          I enjoy building practical technical projects. I’m currently developing
          software, games, and university projects, learning continuously through
          hands-on experimentation.
        </p>
        <a className="about-preview__link" href="/about">More about me</a>
      </div>
    </section>
  )
}

export default AboutPreview
