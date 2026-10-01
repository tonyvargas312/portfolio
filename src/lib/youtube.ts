export type YouTubeMetadata = {
  youtube_video_id: string | null
  youtube_url: string | null
}

const videoIdPattern = /^[A-Za-z0-9_-]{11}$/

function parseStartTime(value: string | null): number | null {
  if (!value) return null
  if (/^\d+$/.test(value)) {
    const seconds = Number(value)
    return Number.isSafeInteger(seconds) ? seconds : null
  }
  const units = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(value)
  if (!units || !units.slice(1).some(Boolean)) return null
  const seconds = Number(units[1] || 0) * 3600 + Number(units[2] || 0) * 60 + Number(units[3] || 0)
  return Number.isSafeInteger(seconds) ? seconds : null
}

export function resolveYouTubeEmbed(metadata: YouTubeMetadata): string | null {
  let url: URL | null = null
  try {
    const parsed = new URL(metadata.youtube_url || '')
    if (['https:', 'http:'].includes(parsed.protocol) &&
      ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'www.youtu.be'].includes(parsed.hostname)) {
      url = parsed
    }
  } catch { /* An explicit valid ID can still be used without a valid URL. */ }

  const explicitId = metadata.youtube_video_id?.trim()
  let derivedId: string | null = null
  if (url) {
    if (url.hostname === 'youtu.be' || url.hostname === 'www.youtu.be') {
      derivedId = url.pathname.split('/')[1]
    } else if (url.pathname === '/watch') {
      derivedId = url.searchParams.get('v')
    } else if (url.pathname.startsWith('/embed/')) {
      derivedId = url.pathname.split('/')[2]
    }
  }
  const id = explicitId && videoIdPattern.test(explicitId) ? explicitId : derivedId
  if (!id || !videoIdPattern.test(id)) return null

  const start = url
    ? parseStartTime(url.searchParams.get('start')) ?? parseStartTime(url.searchParams.get('t'))
    : null
  const embed = new URL(`https://www.youtube.com/embed/${id}`)
  if (start !== null) embed.searchParams.set('start', String(start))
  return embed.toString()
}
