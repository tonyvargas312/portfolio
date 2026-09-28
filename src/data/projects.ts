export type ProjectPreviewData = {
  id: string
  title: string
  description: string
  category: string
  status: 'Active Development' | 'In Development'
  technologies?: readonly string[]
}

export const featuredProjects: readonly ProjectPreviewData[] = [
  {
    id: 'train-survival',
    title: 'Train Survival',
    description: 'A post-apocalyptic train survival and management game.',
    category: 'Game Development',
    status: 'Active Development',
    technologies: ['Godot', 'GDScript', 'Aseprite'],
  },
  {
    id: 'party-hotspots',
    title: 'Party Hotspots',
    description:
      'An application concept for discovering nightlife hotspots, venue activity, and social interaction.',
    category: 'Software Development',
    status: 'In Development',
  },
  {
    id: 'university-parking',
    title: 'University Parking Availability System',
    description:
      'A system designed to help people find available parking spaces across university parking lots.',
    category: 'Software Engineering / University Project',
    status: 'In Development',
  },
]
