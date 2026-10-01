import { useEffect, useState } from 'react'
import IntroductionVideo from './IntroductionVideo'
import { resolveYouTubeEmbed } from '../lib/youtube'
import type { YouTubeMetadata } from '../lib/youtube'

type VideoRecord = YouTubeMetadata & { title: string | null }

function AboutVideo() {
  const [video, setVideo] = useState<{ src: string; title: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const request = new AbortController()
    let active = true

    async function loadVideo() {
      try {
        const { supabase } = await import('../lib/supabase')
        if (!active) return
        const { data, error } = await supabase
          .schema('public')
          .from('portfolio_videos')
          .select('title, youtube_video_id, youtube_url')
          .eq('section', 'about')
          .eq('is_published', true)
          .order('sort_order', { ascending: true })
          .limit(1)
          .abortSignal(request.signal)
          .maybeSingle<VideoRecord>()

        if (!active) return
        if (!error && data) {
          const src = resolveYouTubeEmbed(data)
          if (src) setVideo({ src, title: data.title?.trim() || 'About video' })
        }
      } catch { /* Preserve the placeholder on configuration or request failure. */ }
      finally { if (active) setLoading(false) }
    }

    void loadVideo()
    return () => { active = false; request.abort() }
  }, [])

  if (!video) {
    return <div aria-busy={loading}><IntroductionVideo /></div>
  }

  return (
    <div className="introduction-video">
      <iframe src={video.src} title={video.title} loading="lazy"
        allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin" />
    </div>
  )
}

export default AboutVideo
