import './IntroductionVideo.css'

export type IntroductionVideoProps = {
  src?: string
  poster?: string
  captions?: { src: string; language: string; label: string }
}

function IntroductionVideo({ src, poster, captions }: IntroductionVideoProps) {
  return (
    <div className="introduction-video">
      {src ? (
        <video controls playsInline preload="none" poster={poster} aria-label="Video introduction by Anthony Vargas">
          <source src={src} />
          {captions && <track kind="captions" src={captions.src} srcLang={captions.language} label={captions.label} default />}
          Your browser does not support video. <a href={src}>Open the introduction video</a>.
        </video>
      ) : (
        <div className="introduction-video__placeholder" role="img" aria-label="Video introduction placeholder. Video not yet available.">
          {poster && <img src={poster} alt="" />}
          <p>Video introduction <span>To be added</span></p>
        </div>
      )}
    </div>
  )
}

export default IntroductionVideo
