import { useRef, useState } from 'react'
import { hero } from '../data/content'

export default function Hero() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const hasVideo = Boolean(hero.videoSrc)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <section id="top" className="relative h-[100svh] min-h-[500px] w-full overflow-hidden bg-night md:h-screen">
      {hasVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={hero.videoSrc}
          poster={hero.poster}
          autoPlay
          muted={muted}
          loop
          playsInline
        />
      ) : (
        <img
          src={hero.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Cinematic Gradient Overlays for navbar contrast & smooth bottom fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/20 via-transparent to-night/60" />

      {/* Hero Overlay Headlines */}
      <div className="absolute inset-0 flex flex-col justify-end px-5 pb-16 sm:pb-20 md:px-10 md:pb-20 pointer-events-none">
        <div className="max-w-3xl">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-gold md:text-xs">
            Architectural Excellence &middot; PCMC
          </span>
          <h1 className="mt-2.5 font-display text-3xl font-medium leading-[1.12] text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Thoughtfully crafted homes for quiet living.
          </h1>
        </div>
      </div>

      {/* Video Controls (Discreet bottom-left placement so the tour is fully visible) */}
      {hasVideo && (
        <div className="absolute bottom-6 left-5 z-20 flex items-center gap-2.5 md:left-10 md:bottom-7">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? 'Pause video' : 'Play video'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-night/40 text-white backdrop-blur-md transition-all duration-200 hover:border-white hover:bg-night/60"
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-night/40 text-white backdrop-blur-md transition-all duration-200 hover:border-white hover:bg-night/60"
          >
            {muted ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Scroll indicator */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-end gap-3 px-5 pb-6 text-[11px] font-semibold tracking-[0.2em] text-white/90 md:px-10 md:pb-7"
        aria-hidden="true"
      >
        <span>SCROLL</span>
        <span className="block h-px w-14 bg-brand-deep" />
      </div>
    </section>
  )
}
