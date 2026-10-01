import ContactIcon from './ContactIcon'
import { technologyGroups } from '../data/about'
import './AboutToolbox.css'

const logos = import.meta.glob<string>('../assets/tools/*.svg', { query: '?url', import: 'default', eager: true })
const toolIcons: Record<string, readonly string[]> = {
  Python: ['python'], TypeScript: ['typescript'], GDScript: ['godot'],
  React: ['react'], 'React Native': ['react'], 'HTML / CSS': ['html5', 'css3'],
  PostgreSQL: ['postgresql'], SQLite: ['sqlite'], Supabase: ['supabase'],
  PyTorch: ['pytorch'], 'Hugging Face Transformers': ['huggingface'],
  'Scikit-learn': ['scikitlearn'], Pandas: ['pandas'], Jupyter: ['jupyter'],
  Git: ['git'], 'VS Code': ['vscode'], Godot: ['godot'], Aseprite: ['aseprite'],
}

function ToolIcon({ tool }: { tool: string }) {
  if (tool === 'GitHub') return <ContactIcon name="github" />
  if (tool === 'SQL' || tool === 'Codex') {
    return <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {tool === 'SQL' ? <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></> : <><rect x="2" y="3" width="20" height="18" rx="3" /><path d="m8 9-3 3 3 3m8-6 3 3-3 3m-3-7-2 8" /></>}
    </svg>
  }
  return <>{(toolIcons[tool] ?? []).map((icon) => <img key={icon} className={`about-toolbox__logo about-toolbox__logo--${icon}`} src={logos[`../assets/tools/${icon}.svg`]} alt="" loading="lazy" decoding="async" />)}</>
}

function AboutToolbox() {
  return (
    <section className="about-toolbox" aria-labelledby="about-tools">
      <header>
        <h2 id="about-tools">Tools &amp; Technologies</h2>
        <p>The technologies, platforms, and tools I use to build, experiment, and learn.</p>
      </header>
      {technologyGroups.map(({ title, tools }, index) => (
        <section className="about-toolbox__category" key={title} aria-labelledby={`about-tool-category-${index}`}>
          <h3 id={`about-tool-category-${index}`}>{title}</h3>
          <ul className="about-toolbox__grid">
            {tools.map((tool) => <li className="about-toolbox__item" key={tool}><div className="about-toolbox__tile" aria-hidden="true"><ToolIcon tool={tool} /></div><span className="about-toolbox__label">{tool}</span></li>)}
          </ul>
        </section>
      ))}
    </section>
  )
}

export default AboutToolbox
