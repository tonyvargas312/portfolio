import type { ReactNode } from 'react'
import { resumeDocument } from '../data/resume'

function ResumeLink({ children, download = false }: { children: ReactNode; download?: boolean }) {
  return resumeDocument.url ? (
    <a className="resume-page__action" href={resumeDocument.url} download={download || undefined}>{children}</a>
  ) : (
    <span className="resume-page__action" role="link" aria-disabled="true" aria-describedby="resume-file-status">{children}</span>
  )
}

export default ResumeLink
