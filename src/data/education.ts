export type EducationPreviewItem = {
  id: string
  category: string
  title: string
  provider: string
  description: string
  visualPlaceholder: string
  date?: string
  status?: string
  detailsUrl?: string
}

export const featuredEducation: EducationPreviewItem = {
  id: 'computer-engineering',
  category: 'Education',
  title: 'Computer Engineering',
  provider: 'Institution to be added',
  description:
    'My current field of study, alongside hands-on software and university projects.',
  visualPlaceholder: 'Institution visual to come',
  status: 'Currently studying',
}

export const credentialPreviews: EducationPreviewItem[] = [
  {
    id: 'certification-placeholder',
    category: 'Certification',
    title: 'Certification to be added',
    provider: 'Provider to be added',
    description: 'Certificate information and learning highlights will appear here.',
    visualPlaceholder: 'Certificate badge to come',
  },
  {
    id: 'microcredential-placeholder',
    category: 'Microcredential',
    title: 'Microcredential to be added',
    provider: 'Provider to be added',
    description: 'Details of focused learning and practical skills will appear here.',
    visualPlaceholder: 'Credential badge to come',
  },
  {
    id: 'course-placeholder',
    category: 'Professional course',
    title: 'Course to be added',
    provider: 'Provider to be added',
    description: 'Course information and relevant topics will appear here.',
    visualPlaceholder: 'Course visual to come',
  },
]
