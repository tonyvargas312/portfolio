# Codex Instructions

## Project

This is Anthony Vargas' personal portfolio website.

The portfolio should function as:
- a professional profile
- a project showcase
- a project development blog
- a place to present education and certifications
- a hub for GitHub, LinkedIn, resume and contact information

## Design direction

The website should feel like a personal technical website rather than a generic portfolio template.

The design is inspired by modern personal websites such as kentcdodds.com, but should not copy its visual design.

Prioritize:
- strong typography
- generous spacing
- editorial layouts
- large project previews
- clean responsive design
- personality without excessive decoration
- light and dark themes

Avoid:
- generic Bootstrap-style portfolio cards
- skill percentage bars
- excessive gradients
- unnecessary animations
- stereotypical hacker or Matrix aesthetics

## Stack

- React
- TypeScript
- Vite
- ESLint

## Architecture

Keep content separate from presentation when reasonable.

Suggested directories:

src/
  components/
  sections/
  pages/
  data/
  styles/
  assets/

Projects should be data-driven so new projects can be added easily.

## Main website areas

- Home
- Projects
- Individual project pages
- Writing / project updates
- About
- Education
- Certifications
- Resume
- Contact

## Project pages

Each project should be capable of displaying:

- title
- short description
- project status
- technologies
- hero image
- overview
- motivation / problem
- technical decisions
- development progress
- screenshots
- challenges
- lessons learned
- development log
- GitHub link when available
- next steps

## Development rules

- Prefer small, incremental changes.
- Keep components reusable.
- Avoid unnecessary dependencies.
- Do not rewrite working components without reason.
- Maintain responsive behavior.
- Follow accessibility best practices.
- Do not modify unrelated files.
- Do not delete assets without explicit instruction.
- Keep TypeScript strict and clean.
- Avoid overly large components.

## Workflow

Before implementing a significant change:

1. Inspect the relevant files.
2. Briefly explain the proposed approach.
3. Implement the smallest reasonable version.
4. Verify the project builds.
5. Fix TypeScript or lint errors.
6. Update TASKS.md if the task was completed.
