import { useState, useRef } from 'react'
import { timelineData } from '../data/content'
import Reveal from './Reveal'

export default function Timeline() {
  const { eyebrow, title, subtitle, milestones } = timelineData
  const [activeYear, setActiveYear] = useState(milestones[0].year)
  const containerRef = useRef(null)
  const itemRefs = useRef({})

  const scrollToYear = (year) => {
    setActiveYear(year)
    const el = itemRefs.current[year]
    const container = containerRef.current
    if (el && container) {
      const elTop = el.offsetTop
      const elHeight = el.offsetHeight
      const containerHeight = container.clientHeight
      container.scrollTo({
        top: elTop - containerHeight / 2 + elHeight / 2,
        behavior: 'smooth',
      })
    }
  }

  // Update active year based on scroll position in the viewport
  const handleScroll = () => {
    const container = containerRef.current
    if (!container) return
    const containerCenter = container.scrollTop + container.clientHeight / 2

    let closestYear = milestones[0].year
    let minDiff = Infinity

    milestones.forEach((item) => {
      const el = itemRefs.current[item.year]
      if (el) {
        const itemCenter = el.offsetTop + el.offsetHeight / 2
        const diff = Math.abs(containerCenter - itemCenter)
        if (diff < minDiff) {
          minDiff = diff
          closestYear = item.year
        }
      }
    })

    if (closestYear !== activeYear) {
      setActiveYear(closestYear)
    }
  }

  return (
    <section
      id="timeline"
      aria-label="Company Milestones Timeline"
      className="relative w-full border-b border-line bg-sand/60 py-16 md:py-24"
    >
      {/* Background Architectural Grid Pattern with Warm Sunrise Orange */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(rgb(249 115 22 / 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-site px-5 md:px-10">
        {/* Section Header */}
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
              <span className="block h-0.5 w-10 bg-gradient-to-r from-orange-500 to-amber-400" />
              {eyebrow}
            </div>
            <h2 className="section-title mt-4 text-ink">{title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-body md:text-base">
              {subtitle}
            </p>
          </Reveal>
        </div>

        {/* Quick Jump Milestones Navigation Bar */}
        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap items-center gap-1.5 border-y border-line/80 py-3.5 sm:gap-2 md:mt-12">
            <span className="mr-1 text-[11px] font-bold uppercase tracking-wider text-body">
              Milestones:
            </span>
            {milestones.map((item) => {
              const isActive = activeYear === item.year
              return (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => scrollToYear(item.year)}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-sm ring-2 ring-orange-500/30'
                      : 'border border-line bg-white text-ink hover:border-orange-500/60 hover:text-orange-600'
                  }`}
                  aria-label={`Jump to year ${item.year}`}
                >
                  <span className="font-number">{item.year.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Viewport-Constrained Scrollable Timeline (Fits screen comfortably) */}
        <div className="relative mt-8">
          {/* Top & Bottom Subtle Fade Overlays for graceful scrolling transitions */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-10 bg-gradient-to-b from-sand/90 via-sand/40 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-10 bg-gradient-to-t from-sand/90 via-sand/40 to-transparent"
          />

          {/* Scrollable Container (Shows 2-3 compact items on screen, rest reveals as you scroll) */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            tabIndex={0}
            aria-label="Milestones scrollable timeline"
            className="timeline-scroll relative max-h-[490px] overflow-y-auto px-2 py-8 sm:px-4 md:max-h-[520px]"
          >
            {/* Continuous Vertical Gradient Spine in warm Logo Orange */}
            <div
              aria-hidden="true"
              className="absolute left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-orange-500 via-amber-500/60 to-line md:left-1/2 md:-translate-x-1/2"
            />

            <div className="space-y-6 md:space-y-8">
              {milestones.map((item, index) => {
                const isEven = index % 2 === 0
                const isActive = activeYear === item.year

                return (
                  <div
                    key={item.year}
                    ref={(el) => (itemRefs.current[item.year] = el)}
                    onClick={() => scrollToYear(item.year)}
                    className={`relative flex flex-col cursor-pointer transition-all md:flex-row md:items-center ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Timeline Central Node Marker */}
                    <div
                      aria-hidden="true"
                      className="absolute left-4 top-5 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                    >
                      <div className="relative flex items-center justify-center">
                        {/* Pulse Ring for active node */}
                        <span
                          className={`absolute h-7 w-7 rounded-full transition-all duration-300 ${
                            isActive
                              ? 'bg-orange-500/20 ring-4 ring-orange-500/25'
                              : 'bg-transparent group-hover:bg-orange-500/10'
                          }`}
                        />
                        {/* Central Dot */}
                        <span
                          className={`relative block h-3.5 w-3.5 rounded-full border-2 transition-all duration-300 ${
                            isActive
                              ? 'border-white bg-orange-600 scale-110'
                              : 'border-orange-500 bg-white'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Watermark Year on the opposite side (Desktop) */}
                    <div className="hidden w-1/2 md:block md:px-8">
                      <div
                        className={`${
                          isEven ? 'text-left pl-2' : 'text-right pr-2'
                        }`}
                      >
                        <span
                          className={`font-number text-4xl font-[200] tracking-tight transition-colors duration-300 lg:text-5xl ${
                            isActive ? 'text-orange-500/40' : 'text-orange-500/15'
                          }`}
                        >
                          {item.year.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Compact Milestone Card (Headline Only, Logo-matched Orange) */}
                    <div className="pl-10 md:w-1/2 md:pl-0 md:px-8">
                      <article
                        className={`group relative border bg-white px-5 py-4 transition-all duration-300 sm:px-6 sm:py-4.5 ${
                          isActive
                            ? 'border-orange-500 ring-1 ring-orange-500/30 -translate-y-0.5 shadow-sm'
                            : 'border-line hover:border-orange-500/70 hover:-translate-y-0.5'
                        }`}
                      >
                        {/* Left orange accent bar */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-300 ${
                            isActive ? 'bg-orange-600' : 'bg-transparent group-hover:bg-orange-500/50'
                          }`}
                        />

                        {/* Header: Year + Tag + Location */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-number text-lg font-bold tracking-tight text-orange-600 sm:text-xl">
                              {item.year}
                            </span>
                            <span className="h-3 w-[1px] bg-line" />
                            <span className="rounded bg-sand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink border border-line/50">
                              {item.tag}
                            </span>
                          </div>

                          {/* Location pin */}
                          <div className="flex items-center gap-1 text-[11px] font-medium text-body">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-orange-500 shrink-0"
                            >
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>{item.location}</span>
                          </div>
                        </div>

                        {/* Prominent Headline Only */}
                        <h3 className="mt-2 font-display text-lg font-medium leading-snug text-ink sm:text-[21px] group-hover:text-orange-600 transition-colors">
                          {item.title}
                        </h3>

                        {/* Bottom Row: Key Highlight + Metric Badge */}
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-2.5">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                            <span className="text-orange-600">✓</span>
                            <span>{item.highlight}</span>
                          </div>

                          <span className="rounded border border-orange-200 bg-orange-50/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-600">
                            {item.metric}
                          </span>
                        </div>
                      </article>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
