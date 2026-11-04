import { useState, useRef } from 'react'
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
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)
  const cardRefs = useRef([])

  // Scroll active card into view smoothly
  const scrollToMilestone = (index) => {
    const validIndex = Math.max(0, Math.min(milestones.length - 1, index))
    setActiveIndex(validIndex)

    const card = cardRefs.current[validIndex]
    const track = trackRef.current
    if (card && track) {
      const cardLeft = card.offsetLeft
      const cardWidth = card.offsetWidth
      const trackWidth = track.clientWidth
      track.scrollTo({
        left: cardLeft - trackWidth / 2 + cardWidth / 2,
        behavior: 'smooth',
      })
    }
  }

  // Handle manual horizontal scroll / swipe on track
  const handleTrackScroll = () => {
    const track = trackRef.current
    if (!track) return

    const trackCenter = track.scrollLeft + track.clientWidth / 2
    let closestIndex = 0
    let minDistance = Infinity

    cardRefs.current.forEach((card, idx) => {
      if (card) {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const distance = Math.abs(trackCenter - cardCenter)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = idx
        }
      }
    })

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex)
    }
  }

  // Progress percentage for connecting track
  const progressPercent = (activeIndex / (milestones.length - 1)) * 100

  return (
    <section
      id="timeline"
      aria-label="Company Milestones Timeline"
      className="relative w-full overflow-hidden border-b border-line bg-sand/60 py-16 md:py-24"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            'radial-gradient(rgb(234 88 12 / 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-site px-4 sm:px-6 md:px-10 2xl:px-16">
        {/* Header with Title and Prev/Next Navigation Controls */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                <span className="block h-0.5 w-10 bg-gradient-to-r from-orange-500 to-amber-400" />
                {eyebrow}
              </div>
              <h2 className="section-title mt-4 text-ink">{title}</h2>
              <p className="mt-3.5 text-sm leading-relaxed text-body md:text-base">
                {subtitle}
              </p>
            </Reveal>
          </div>

          {/* Navigation Prev / Next Buttons */}
          <Reveal delay={100}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-body">
                <span className="font-number text-sm font-bold text-ink">
                  {activeIndex + 1}
                </span>{' '}
                / {milestones.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToMilestone(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  aria-label="Previous milestone"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-all duration-200 hover:border-orange-600 hover:bg-orange-600 hover:text-white disabled:pointer-events-none disabled:opacity-35 shadow-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToMilestone(activeIndex + 1)}
                  disabled={activeIndex === milestones.length - 1}
                  aria-label="Next milestone"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-all duration-200 hover:border-orange-600 hover:bg-orange-600 hover:text-white disabled:pointer-events-none disabled:opacity-35 shadow-sm"
                >
                  <svg width="9" height="16" viewBox="0 0 9 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Horizontal Progress Track / Scrubber Bar */}
        <Reveal delay={150}>
          <div className="relative mt-10 md:mt-14 pb-2">
            {/* Background connecting line */}
            <div className="absolute top-1/2 left-4 right-4 h-[2px] -translate-y-1/2 bg-line" />
            
            {/* Active orange connecting line */}
            <div
              className="absolute top-1/2 left-4 h-[2px] -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 ease-out"
              style={{ width: `calc(${progressPercent}% * 0.94)` }}
            />

            {/* Year Nodes Track */}
            <div className="relative flex items-center justify-between gap-2 overflow-x-auto py-2 scrollbar-none">
              {milestones.map((item, idx) => {
                const isActive = activeIndex === idx
                const isPassed = activeIndex >= idx

                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => scrollToMilestone(idx)}
                    className="group relative z-10 flex flex-col items-center gap-2 transition-all duration-300 focus:outline-none"
                    aria-label={`Go to ${item.year} milestone`}
                  >
                    {/* Node Dot with Ping ring when active */}
                    <div className="relative flex items-center justify-center">
                      {isActive && (
                        <span className="absolute h-8 w-8 animate-ping rounded-full bg-orange-500/20 opacity-75" />
                      )}
                      <span
                        className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? 'scale-125 border-white bg-orange-600 ring-4 ring-orange-500/30'
                            : isPassed
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-line bg-white group-hover:border-orange-400'
                        }`}
                      />
                    </div>

                    {/* Year Label Button / Pill */}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider transition-all duration-300 ${
                        isActive
                          ? 'bg-orange-600 text-white shadow-sm ring-2 ring-orange-500/20 scale-105'
                          : 'border border-line bg-white text-body hover:border-orange-500 hover:text-orange-600'
                      }`}
                    >
                      {item.year.split(' ')[0]}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Cinematic Horizontal Cards Carousel Filmstrip */}
      <div className="relative mt-8 md:mt-10 w-full overflow-hidden">
        {/* Left and Right Subtle Gradients for Depth */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-8 md:w-16 bg-gradient-to-r from-sand/90 via-sand/40 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-8 md:w-16 bg-gradient-to-l from-sand/90 via-sand/40 to-transparent" />

        {/* Scrollable Track */}
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="flex gap-6 overflow-x-auto px-5 sm:px-10 md:px-16 pb-6 pt-2 snap-x snap-mandatory scrollbar-none"
          tabIndex={0}
          aria-label="Timeline horizontal milestone cards"
        >
          {milestones.map((item, index) => {
            const isActive = activeIndex === index
            const image = milestoneImages[item.year] || legacyImg

            return (
              <article
                key={item.year}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => scrollToMilestone(index)}
                className={`group relative h-[440px] sm:h-[480px] md:h-[510px] w-[86vw] sm:w-[480px] md:w-[540px] lg:w-[580px] shrink-0 snap-center cursor-pointer overflow-hidden border bg-night transition-all duration-500 select-none ${
                  isActive
                    ? 'border-orange-500 shadow-xl ring-2 ring-orange-500/25 -translate-y-1'
                    : 'border-line/80 opacity-80 hover:opacity-100 hover:border-orange-500/50'
                }`}
              >
                {/* Full-bleed Architectural Photograph */}
                <img
                  src={image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Cinematic Directional Gradients for perfect legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                {/* Top Bar: Year & Tag Pills + Large Watermark */}
                <div className="relative z-10 flex items-start justify-between p-5 sm:p-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-orange-600 px-3.5 py-1 text-xs font-bold tracking-wider text-white shadow-md">
                      {item.year}
                    </span>
                    <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-md">
                      {item.tag}
                    </span>
                  </div>

                  {/* Faint Background Watermark Year */}
                  <span className="font-number text-5xl sm:text-6xl md:text-7xl font-[200] leading-none text-white/20 select-none">
                    {item.year.split(' ')[0]}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 md:p-8">
                  {/* Location Pin */}
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-medium text-orange-300 backdrop-blur-md">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-orange-400 shrink-0"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{item.location}</span>
                  </div>

                  {/* Milestone Title */}
                  <h3 className="mt-3.5 font-display text-2xl sm:text-[26px] md:text-[28px] font-medium leading-snug text-white transition-colors group-hover:text-orange-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/80 line-clamp-3">
                    {item.description}
                  </p>

                  {/* Bottom Highlight & Metric Badges */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-3.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white/95">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                        ✓
                      </span>
                      <span>{item.highlight}</span>
                    </div>

                    <span className="rounded border border-orange-500/40 bg-orange-600/30 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-orange-300">
                      {item.metric}
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
