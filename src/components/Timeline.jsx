import { useState, useRef, useEffect } from 'react'
import { timelineData } from '../data/content'
import Reveal from './Reveal'

import legacyImg from '../assets/images/legacy.jpg'
import bannerImg from '../assets/images/banner.jpg'
import project2Img from '../assets/images/project-2.jpg'
import project1Img from '../assets/images/project-1.jpg'
import residencyImg from '../assets/images/project-residency.jpg'
import skylineImg from '../assets/images/project-skyline.jpg'

const milestoneImages = {
  '2004': legacyImg,
  '2008': bannerImg,
  '2014': project2Img,
  '2018': project1Img,
  '2022': residencyImg,
  '2025 - Present': skylineImg,
}

export default function Timeline() {
  const { eyebrow, title, subtitle, milestones } = timelineData
  // Default to 2014 (index 2) exactly matching the mockup design
  const [activeIndex, setActiveIndex] = useState(2)
  const touchStartX = useRef(null)

  const goToNext = () => {
    setActiveIndex((prev) => (prev < milestones.length - 1 ? prev + 1 : prev))
  }

  const goToPrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToNext()
      else goToPrev()
    }
    touchStartX.current = null
  }

  // Keyboard navigation (ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'ArrowLeft') goToPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const progressPercent = (activeIndex / (milestones.length - 1)) * 100

  return (
    <section
      id="timeline"
      aria-label="Company Milestones Timeline"
      className="relative w-full overflow-hidden bg-sand/40 py-16 md:py-24 border-b border-line"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 md:px-10">
        {/* Header - Centered Layout matching mockup */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-block rounded-full bg-gradient-to-r from-orange-600 to-amber-600 px-5 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm">
              {eyebrow}
            </div>

            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[54px] leading-tight">
              {title}
            </h2>

            <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-body max-w-2xl mx-auto">
              {subtitle}
            </p>
          </Reveal>
        </div>

        {/* Timeline Horizontal Scrubber Bar */}
        <Reveal delay={100}>
          <div className="mx-auto mt-10 md:mt-12 flex max-w-4xl items-center justify-center gap-3 sm:gap-4 px-2">
            {/* Left Previous Arrow Button */}
            <button
              type="button"
              onClick={goToPrev}
              disabled={activeIndex === 0}
              aria-label="Previous milestone"
              className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-white text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-orange-500 hover:text-orange-600 disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Horizontal Timeline Track */}
            <div className="relative flex-1 py-4">
              {/* Inactive Line (Right side / Remaining) */}
              <div className="absolute top-1/2 left-0 right-0 h-[2.5px] -translate-y-1/2 bg-zinc-200 rounded-full" />

              {/* Active Dark Progress Line (Left side up to active node) */}
              <div
                className="absolute top-1/2 left-0 h-[2.5px] -translate-y-1/2 bg-zinc-800 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />

              {/* Year Nodes along the line */}
              <div className="relative flex items-center justify-between gap-1 sm:gap-2">
                {milestones.map((item, index) => {
                  const isActive = activeIndex === index
                  const yearDisplay = item.year.split(' ')[0]

                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Jump to ${item.year}`}
                      className={`relative z-10 transition-all duration-300 focus:outline-none cursor-pointer select-none ${
                        isActive
                          ? 'rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white shadow-[0_0_22px_rgba(234,88,12,0.45)] ring-4 ring-orange-500/20 scale-110'
                          : 'rounded-full border border-gray-200/90 bg-white px-2.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold text-zinc-700 shadow-sm hover:scale-105 hover:border-zinc-400 hover:text-black'
                      }`}
                    >
                      {yearDisplay}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right Next Arrow Button */}
            <button
              type="button"
              onClick={goToNext}
              disabled={activeIndex === milestones.length - 1}
              aria-label="Next milestone"
              className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-gray-200/90 bg-white text-zinc-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-orange-500 hover:text-orange-600 disabled:pointer-events-none disabled:opacity-30 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>

      {/* 3-Card Carousel Exhibition Stage matching mockup */}
      <div
        className="relative mt-8 md:mt-12 w-full overflow-hidden px-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative mx-auto flex h-[350px] sm:h-[420px] md:h-[480px] lg:h-[520px] max-w-7xl items-center justify-center">
          {milestones.map((item, index) => {
            const diff = index - activeIndex
            const isVisible = Math.abs(diff) <= 2
            if (!isVisible) return null

            const isCenter = diff === 0
            const isLeft = diff === -1
            const isRight = diff === 1
            const isFarLeft = diff === -2
            const isFarRight = diff === 2

            let transformClass = ''
            let zIndex = 10
            let opacityClass = 'opacity-0 pointer-events-none'

            if (isCenter) {
              transformClass = 'translate-x-0 scale-100'
              zIndex = 30
              opacityClass = 'opacity-100 shadow-2xl shadow-black/30'
            } else if (isLeft) {
              transformClass = '-translate-x-[75%] sm:-translate-x-[70%] md:-translate-x-[62%] lg:-translate-x-[58%] scale-[0.88]'
              zIndex = 20
              opacityClass = 'opacity-70 hover:opacity-90 cursor-pointer'
            } else if (isRight) {
              transformClass = 'translate-x-[75%] sm:translate-x-[70%] md:translate-x-[62%] lg:translate-x-[58%] scale-[0.88]'
              zIndex = 20
              opacityClass = 'opacity-70 hover:opacity-90 cursor-pointer'
            } else if (isFarLeft) {
              transformClass = '-translate-x-[130%] scale-[0.75]'
              zIndex = 10
              opacityClass = 'opacity-0 pointer-events-none'
            } else if (isFarRight) {
              transformClass = 'translate-x-[130%] scale-[0.75]'
              zIndex = 10
              opacityClass = 'opacity-0 pointer-events-none'
            }

            const image = milestoneImages[item.year] || legacyImg

            return (
              <div
                key={item.year}
                onClick={() => {
                  if (!isCenter) setActiveIndex(index)
                }}
                className={`absolute w-[90vw] max-w-[760px] h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out select-none ${transformClass} ${opacityClass}`}
                style={{ zIndex }}
              >
                {/* Full-bleed Architectural Photograph */}
                <img
                  src={image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

                {/* Giant Watermark Year in bottom-left */}
                <span className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-5 sm:left-8 md:left-10 font-number text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white/50 select-none leading-none drop-shadow-md pointer-events-none">
                  {item.year.split(' ')[0]}
                </span>

                {/* Frosted Glassmorphism Content Card in bottom-right (matching mockup) */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-5 sm:right-8 md:right-10 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 sm:px-6 text-left max-w-[260px] sm:max-w-[320px] shadow-xl">
                  {/* Tag Label */}
                  <p className="text-[11px] sm:text-xs font-medium text-white/80">
                    {item.tag}
                  </p>

                  {/* Milestone Title */}
                  <h3 className="mt-1 font-display text-base sm:text-lg md:text-xl font-bold text-white leading-snug">
                    {item.title}
                  </h3>

                  {/* Location */}
                  <p className="mt-1 text-xs text-white/90">
                    {item.location}
                  </p>

                  {/* Verified Metric Pill with White background & Checkmark */}
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] sm:text-xs font-bold text-zinc-900 shadow-sm">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-zinc-900"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>{item.highlight}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Pagination Indicators (Elongated active pill + dots matching mockup) */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
          {milestones.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === i
                  ? 'h-1.5 w-7 bg-zinc-800'
                  : 'h-1.5 w-2 bg-zinc-300 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
