import { useState, useEffect } from 'react'
import { projectGallery } from '../data/content'
import Reveal from './Reveal'

export default function ProjectGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const items = projectGallery.items || []
  // Duplicate list to achieve a seamless, continuous infinite loop
  const movingItems = [...items, ...items]

  // Keyboard navigation for Lightbox (Esc, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % items.length)
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + items.length) % items.length)
      }
    }

    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, items.length])

  const activeLightboxItem =
    lightboxIndex !== null ? items[lightboxIndex] : null

  return (
    <section aria-label="Project Gallery" className="w-full bg-white pt-10 pb-20 text-ink md:pt-14 md:pb-28 overflow-hidden">
      <div className="mx-auto max-w-site px-5 md:px-10">
        {/* Header - Filters Removed */}
        <div className="max-w-2xl">
          <Reveal>
            <div className="eyebrow text-sun">{projectGallery.eyebrow}</div>
            <h2 className="section-title mt-5 text-ink">
              {projectGallery.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-base leading-relaxed text-body md:text-lg">
              {projectGallery.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Continuously Moving Single Line Gallery Contained Inside Site Boundaries (Not Full Screen) */}
        <div className="relative mt-12 w-full overflow-hidden select-none">
          <div
            className="animate-marquee flex items-center gap-5 md:gap-6 py-2"
            style={{ animationDuration: '40s' }}
          >
            {movingItems.map((item, index) => {
              const originalIndex = index % items.length
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="group relative h-[340px] md:h-[380px] w-[280px] sm:w-[320px] md:w-[350px] shrink-0 cursor-pointer overflow-hidden bg-night transition-all duration-500 hover:-translate-y-1"
                onClick={() => setLightboxIndex(originalIndex)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setLightboxIndex(originalIndex)
                  }
                }}
                aria-label={`View photo of ${item.title}`}
              >
                {/* Project Image with Smooth Hover Zoom */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/35 to-night/10 transition-opacity duration-300 group-hover:from-night/95" />

                {/* Top Category Badge */}
                <div className="absolute left-3.5 top-3.5 z-10 flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-sm">
                    {item.category === 'Ongoing' ? (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                    ) : item.category === 'Completed' ? (
                      <span className="h-2 w-2 rounded-full bg-blue-400" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                    )}
                    <span>{item.category}</span>
                  </div>
                </div>

                {/* Center Hover Expand Icon (Clean Black & White) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-black/75 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-black/90">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Card Information */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                  <span className="text-[10.5px] font-semibold uppercase tracking-wider text-white/80">
                    {item.location}
                  </span>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-medium text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-xs text-white/75 transition-colors group-hover:text-white">
                    {item.type}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>

    {/* Full-Screen Interactive Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/95 p-4 backdrop-blur-lg md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close image viewer"
            className="absolute right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-night/60 text-white backdrop-blur-md transition-colors hover:border-white hover:bg-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev Navigation Button */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev - 1 + items.length) % items.length)
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-night/60 text-white backdrop-blur-md transition-colors hover:border-white hover:bg-white/20"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Next Navigation Button */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((prev) => (prev + 1) % items.length)
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-night/60 text-white backdrop-blur-md transition-colors hover:border-white hover:bg-white/20"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Lightbox Content Container */}
          <div
            className="relative flex max-h-[92vh] max-w-5xl flex-col overflow-hidden border border-white/10 bg-night"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Lightbox Image Viewport */}
            <div className="relative max-h-[75vh] overflow-hidden bg-night flex items-center justify-center">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Lightbox Details Bar */}
            <div className="flex flex-col justify-between gap-3 border-t border-white/10 bg-night p-5 sm:flex-row sm:items-center sm:px-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-white/80 text-xs uppercase tracking-wider">
                    {activeLightboxItem.category} &middot; {activeLightboxItem.location}
                  </span>
                </div>
                <h3 className="mt-1 font-display text-xl text-white font-medium sm:text-2xl">
                  {activeLightboxItem.title}
                </h3>
                {activeLightboxItem.caption && (
                  <p className="mt-1.5 text-xs text-white/70 max-w-2xl sm:text-sm">
                    {activeLightboxItem.caption}
                  </p>
                )}
              </div>
              <span className="text-xs text-white/50 tracking-wider">
                {lightboxIndex + 1} / {items.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
