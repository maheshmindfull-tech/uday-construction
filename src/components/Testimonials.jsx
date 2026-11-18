import { useState, useEffect } from 'react'
import { testimonials } from '../data/content'
import TestimonialTicker from './TestimonialTicker'

export default function Testimonials() {
  const [activeVideo, setActiveVideo] = useState(null)

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveVideo(null)
      }
    }
    if (activeVideo) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeVideo])

  return (
    <section id="testimonials" className="w-full bg-sand py-16 sm:py-20 md:py-28">
      <div className="site-pad mx-auto max-w-site">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="eyebrow">{testimonials.eyebrow}</div>
          <h2 className="section-title mt-4 sm:mt-5">
            {testimonials.title || 'Client Feedback & Stories'}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body md:text-lg">
            {testimonials.subtitle || 'Hear directly from families and homeowners who shaped their lives in our communities.'}
          </p>
        </div>

        {/* Video Testimonials Boxes Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((item, index) => {
            const initials = item.clientName
              ? item.clientName
                .replace(/^(Mr\.|Mrs\.|Dr\.|The)\s+/gi, '')
                .split(' ')
                .map((w) => w[0])
                .filter(Boolean)
                .slice(0, 2)
                .join('')
              : 'UC'

            return (
              <div
                key={item.id || item.clientName || index}
                className="group flex flex-col overflow-hidden border border-line bg-white transition-all duration-300 hover:-translate-y-1"
              >
                {/* Video Box / Thumbnail */}
                <div
                  className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-night"
                  onClick={() => setActiveVideo(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveVideo(item)
                    }
                  }}
                  aria-label={`Play video testimonial of ${item.clientName}`}
                >
                  <img
                    src={item.poster || testimonials.background}
                    alt={item.clientName}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Cinematic Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/30 to-night/20 transition-opacity duration-300 group-hover:from-night/85" />

                  {/* Top Tag */}
                  {item.tag && (
                    <span className="absolute left-3 top-3 sm:left-4 sm:top-4 border border-white/20 bg-night/60 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                      {item.tag}
                    </span>
                  )}

                  {/* Duration Badge */}
                  {item.duration && (
                    <span className="absolute right-3 top-3 sm:right-4 sm:top-4 flex items-center gap-1.5 border border-white/10 bg-night/60 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-white/90 backdrop-blur-sm">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80" />
                      {item.duration}
                    </span>
                  )}

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden="true"
                      className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/20 bg-black/85 text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black cursor-pointer"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-0.5 transition-colors"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Bottom Video Action Bar */}
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-3 sm:px-4 pb-2.5 sm:pb-3.5 text-[11px] sm:text-xs text-white/90">
                    <span className="inline-flex min-w-0 items-center gap-1.5 font-medium tracking-wide truncate">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-white/80 transition-all duration-200 group-hover:text-white group-hover:scale-110">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                      </svg>
                      <span className="truncate">Watch Video Feedback</span>
                    </span>
                    <span className="shrink-0 text-[10px] sm:text-[11px] uppercase tracking-wider text-white/70 transition-all duration-200 group-hover:text-white group-hover:scale-105">
                      Play &#9654;
                    </span>
                  </div>
                </div>

                {/* Feedback Content Box */}
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                  <div>
                    {/* 5-Star Rating in Yellow */}
                    <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="mt-3.5 sm:mt-4">
                      <p className="font-display text-[19px] sm:text-[21px] font-medium leading-[1.35] text-ink">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </blockquote>
                  </div>

                  {/* Client Info Footer */}
                  <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-3.5 border-t border-line/70 pt-4">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-sand font-sans text-xs font-bold uppercase tracking-wider text-ink">
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm sm:text-[15px] font-semibold text-ink">
                        {item.clientName}
                      </h4>
                      <p className="truncate text-xs text-body">
                        {item.role ? `${item.role} · ` : ''}{item.project}{item.location ? `, ${item.location}` : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Continuous Moving Text Testimonials Ribbon (Right to Left) */}
        <div className="mt-12 sm:mt-14 md:mt-20">
          <TestimonialTicker showHeader={false} className="py-6 border-none bg-transparent" />
        </div>
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/90 p-3 sm:p-4 backdrop-blur-md md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`Video Feedback from ${activeVideo.clientName}`}
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden bg-night"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-5 py-3.5 sm:py-4 text-white">
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-brand animate-pulse" />
                <div className="min-w-0">
                  <h3 className="truncate text-xs sm:text-sm font-semibold tracking-wide md:text-base">
                    {activeVideo.clientName} &mdash; Client Video Feedback
                  </h3>
                  <p className="truncate text-[11px] sm:text-xs text-white/60">
                    {activeVideo.project} {activeVideo.location ? `(${activeVideo.location})` : ''}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Viewport */}
            <div className="relative min-h-[240px] aspect-video w-full bg-night">
              {activeVideo.videoSrc ? (
                <video
                  src={activeVideo.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="relative flex h-full w-full flex-col items-center justify-center p-4 sm:p-6 text-center text-white">
                  <img
                    src={activeVideo.poster || testimonials.background}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-25"
                  />
                  <div className="relative z-10 max-w-md border border-white/15 bg-night/80 p-4 sm:p-6 backdrop-blur-md">
                    <div className="mx-auto hidden sm:flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                      </svg>
                    </div>
                    <h4 className="sm:mt-4 text-base sm:text-lg font-semibold text-white">Video Ready to Link</h4>
                    <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs leading-relaxed text-cream/70">
                      Place your client feedback video file into <code className="bg-white/10 px-1 py-0.5 text-brand">public/videos/</code> and set <code className="bg-white/10 px-1 py-0.5 text-brand">videoSrc</code> in <code className="bg-white/10 px-1 py-0.5 text-brand">src/data/content.js</code>.
                    </p>
                    <blockquote className="mt-3 sm:mt-4 border-t border-white/10 pt-2.5 sm:pt-3 text-[11px] sm:text-xs italic text-cream line-clamp-2 sm:line-clamp-none">
                      &ldquo;{activeVideo.quote}&rdquo;
                    </blockquote>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-ink px-4 sm:px-5 py-3 text-xs text-white/70">
              <span className="font-semibold text-brand">Quote:</span> &ldquo;{activeVideo.quote}&rdquo;
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
