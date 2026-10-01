import type { Project } from '../types/project'

export function getProjectTags(project: Project): string[] {
  return [...new Set([...project.category.split(' / '), ...project.tags, ...project.technologies])]
}

export function filterProjects(projects: readonly Project[], tag: string | null): readonly Project[] {
  return tag === null ? projects : projects.filter((project) => getProjectTags(project).includes(tag))
}
