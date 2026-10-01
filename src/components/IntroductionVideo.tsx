import './IntroductionVideo.css'

export type IntroductionVideoProps = {
  youtubeId?: string
  src?: string
  poster?: string
  captions?: { src: string; language: string; label: string }
}

function IntroductionVideo({ youtubeId, src, poster, captions }: IntroductionVideoProps) {
  return (
    <div className="introduction-video">
      {youtubeId ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}`}
          title="Video introduction by Anthony Vargas"
          loading="lazy"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : src ? (
        <video controls playsInline preload="none" poster={poster} aria-label="Video introduction by Anthony Vargas">
          <source src={src} />
          {captions && <track kind="captions" src={captions.src} srcLang={captions.language} label={captions.label} default />}
          Your browser does not support video. <a href={src}>Open the introduction video</a>.
        </video>
      ) : (
        <div className="introduction-video__placeholder" >
          {poster && <img src={poster} alt="" />}
          <p>Video introduction coming soon.</p>
        </div>
      )}
    </div>
  )
}

export default IntroductionVideo
