import type { ReactNode } from 'react'
import { resumeDocument } from '../data/resume'

function ResumeLink({ children, download = false }: { children: ReactNode; download?: boolean }) {
  return resumeDocument.url ? (
    <a className="resume-page__action" href={resumeDocument.url}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download ? resumeDocument.filename : undefined}>{children}</a>
  ) : (
    <span className="resume-page__action" role="link" aria-disabled="true" aria-describedby="resume-file-status">{children}</span>
  )
}

export default ResumeLink
