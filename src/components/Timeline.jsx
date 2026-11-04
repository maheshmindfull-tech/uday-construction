import { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react'
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

const tagPillStyles = [
  'bg-[#A85520] text-white', // 2004 — Warm Terracotta
  'bg-[#A85520] text-white', // 2008 — Warm Terracotta
  'bg-[#5E5476] text-white', // 2014 — Muted Plum Slate
  'bg-[#6E5D53] text-white', // 2018 — Warm Umber
  'bg-[#5E5476] text-white', // 2022 — Muted Plum Slate
  'bg-[#A85520] text-white', // 2025+ — Warm Terracotta
]

export default function Timeline() {
  const { eyebrow, title, subtitle, milestones } = timelineData
  // openIndex: null when closed; opens full milestone info when user clicks a circle
  const [openIndex, setOpenIndex] = useState(null)
  // selectedIndex: controls which milestone photo is showcased on the left portrait card
  const [selectedIndex, setSelectedIndex] = useState(2)
  const [svgPath, setSvgPath] = useState('')

  const zigzagContainerRef = useRef(null)
  const circleRefs = useRef([])

  const activeMilestone = milestones[selectedIndex] || milestones[0]
  const activeYearShort =
    activeMilestone.year === '2025 - Present' ? '2025+' : activeMilestone.year

  const handleCircleToggle = (idx) => {
    setSelectedIndex(idx)
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  // Compute smooth rounded zig-zag SVG path through exact center of every Year Circle
  const computeZigzagPath = useCallback(() => {
    const container = zigzagContainerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const points = circleRefs.current
      .map((el) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        return {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
        }
      })
      .filter(Boolean)

    if (points.length < 2) return

    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i]
      const p2 = points[i + 1]
      const dy = p2.y - p1.y

      // Keep a crisp vertical drop when a card is expanded, then sweep in a smooth rounded S-curve
      const curveSpan = Math.min(135, dy)
      const turnStartY = p2.y - curveSpan
      const midY = (turnStartY + p2.y) / 2

      if (turnStartY > p1.y + 4) {
        d += ` L ${p1.x.toFixed(1)} ${turnStartY.toFixed(1)}`
      }

      d += ` C ${p1.x.toFixed(1)} ${midY.toFixed(1)}, ${p2.x.toFixed(1)} ${midY.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
    }

    setSvgPath(d)
  }, [])

  useLayoutEffect(() => {
    computeZigzagPath()

    let rafId = null
    const start = performance.now()
    const tick = (now) => {
      computeZigzagPath()
      if (now - start < 380) {
        rafId = requestAnimationFrame(tick)
      }
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [computeZigzagPath, openIndex])

  useEffect(() => {
    const container = zigzagContainerRef.current
    if (!container) return

    let rafId = null
    const scheduleUpdate = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(computeZigzagPath)
    }

    const observer = new ResizeObserver(scheduleUpdate)
    observer.observe(container)
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', scheduleUpdate)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [computeZigzagPath])

  return (
    <section
      id="timeline"
      aria-label="Company Milestones Timeline"
      className="relative w-full border-b border-black/[0.08] bg-[#F4F1EA] text-[#18181B]"
    >
      {/* Subtle Architectural CAD Drafting Lines & Perspective Wireframe */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hidden lg:block absolute top-0 bottom-0 left-[max(24px,calc((100%-1560px)/2+40px))] w-[1px] bg-black/[0.055]" />
        <div className="hidden lg:block absolute top-0 bottom-0 right-[max(24px,calc((100%-1560px)/2+40px))] w-[1px] bg-black/[0.055]" />

        <svg
          viewBox="0 0 260 520"
          fill="none"
          className="hidden sm:block absolute bottom-0 left-0 h-[440px] w-[220px] text-[#18181B]/[0.08]"
        >
          <path d="M18 520V120L128 58L210 108V520" stroke="currentColor" strokeWidth="1" />
          <path d="M52 520V98" stroke="currentColor" strokeWidth="0.8" />
          <path d="M90 520V79" stroke="currentColor" strokeWidth="0.8" />
          <path d="M128 520V58" stroke="currentColor" strokeWidth="1" />
          <path d="M168 520V82" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0 165L128 96L240 160" stroke="currentColor" strokeWidth="0.75" />
          <path d="M0 215L128 148L240 210" stroke="currentColor" strokeWidth="0.75" />
          <path d="M0 265L128 200L240 260" stroke="currentColor" strokeWidth="0.75" />
          <path d="M0 315L128 252L240 310" stroke="currentColor" strokeWidth="0.75" />
          <path d="M0 365L128 304L240 360" stroke="currentColor" strokeWidth="0.75" />
          <path d="M0 415L128 356L240 410" stroke="currentColor" strokeWidth="0.75" />
          <path d="M0 465L128 408L240 460" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Top Centered Editorial Header */}
      <div className="relative mx-auto max-w-site px-5 pt-16 pb-10 md:px-10 md:pt-24 md:pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-[#F49D49] px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#18181B]">
              {eyebrow}
            </span>

            <h2 className="mt-4 font-display text-[36px] sm:text-[46px] md:text-[56px] lg:text-[62px] font-normal leading-[1.08] tracking-[-0.015em] text-[#18181B]">
              {title}
            </h2>

            <p className="mx-auto mt-3.5 max-w-[650px] text-[14px] sm:text-[15.5px] leading-[1.6] text-[#4A4A4F]">
              <strong className="font-semibold text-[#18181B]">Uday Construction</strong> —{' '}
              {subtitle.charAt(0).toLowerCase() + subtitle.slice(1)}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Full-Width Horizontal Architectural Hairline */}
      <div className="h-[1px] w-full bg-black/[0.065]" aria-hidden="true" />

      {/* Split-Screen Editorial Stage */}
      <div className="relative mx-auto max-w-site px-5 py-10 md:px-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* LEFT COLUMN: Tall Golden-Hour Architectural Tower Showcase */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="relative w-full h-[390px] sm:h-[460px] lg:h-[660px] overflow-hidden rounded-[22px] bg-[#2C1A0E]">
              {milestones.map((item, idx) => {
                const imgSrc = milestoneImages[item.year] || legacyImg
                const isCurrent = selectedIndex === idx
                return (
                  <img
                    key={item.year}
                    src={imgSrc}
                    alt={`${item.year} — ${item.title}`}
                    className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
                      isCurrent ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  />
                )
              })}

              {/* Golden-Hour Warm Atmospheric Architectural Grading */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#B45309]/35 via-[#92400E]/10 to-black/75"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-[#D97706]/15"
              />

              {/* Bottom Frosted Glassmorphic Active Milestone Pill */}
              <div className="absolute inset-x-4 bottom-5 sm:inset-x-6 sm:bottom-7 z-10 flex justify-center">
                <div className="w-full max-w-[345px] rounded-full border border-white/35 bg-[#2A2A2E]/65 px-5 py-2.5 sm:py-3 text-center backdrop-blur-md">
                  <p className="truncate text-[12px] sm:text-[13.5px] font-normal tracking-[0.01em] text-white/95">
                    Active Milestone: <span className="font-medium text-white">{activeYearShort}</span>{' '}
                    <span className="mx-1 text-white/60">|</span> {activeMilestone.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Rounded Zig-Zag Year Circle Timeline */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div
              ref={zigzagContainerRef}
              className="relative py-2 space-y-5 sm:space-y-7"
            >
              {/* Continuous Rounded Zig-Zag SVG Connector Path */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible z-0"
              >
                <defs>
                  <linearGradient id="timelineZigzagGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#EA580C" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
                {svgPath && (
                  <>
                    {/* Soft Ambient Orange Glow Aura */}
                    <path
                      d={svgPath}
                      fill="none"
                      stroke="rgba(249, 115, 22, 0.28)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      style={{ filter: 'blur(7px)' }}
                    />
                    {/* Subtle Outer Architectural Track */}
                    <path
                      d={svgPath}
                      fill="none"
                      stroke="rgba(232, 120, 37, 0.2)"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    {/* Crisp Sunrise-Orange Rounded Zig-Zag Line */}
                    <path
                      d={svgPath}
                      fill="none"
                      stroke="url(#timelineZigzagGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>

              {milestones.map((item, idx) => {
                const isLeft = idx % 2 === 0
                const isOpen = openIndex === idx
                const yearShort = item.year === '2025 - Present' ? '2025+' : item.year
                const pillStyle = tagPillStyles[idx % tagPillStyles.length]

                return (
                  <div key={item.year} className="relative z-10">
                    {/* Zig-Zag Circle + Label Row */}
                    <div
                      className={`flex items-center ${
                        isLeft
                          ? 'justify-start pl-1 sm:pl-6 md:pl-10 xl:pl-16'
                          : 'justify-end pr-1 sm:pr-6 md:pr-10 xl:pr-16'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 sm:gap-4 ${
                          isLeft ? 'flex-row' : 'flex-row-reverse'
                        }`}
                      >
                        {/* YEAR CIRCLE (Only the Year inside the Circle) */}
                        <button
                          ref={(el) => (circleRefs.current[idx] = el)}
                          type="button"
                          onClick={() => handleCircleToggle(idx)}
                          aria-expanded={isOpen}
                          aria-label={`${yearShort} — ${item.tag}. Click to ${isOpen ? 'close' : 'open'} full details`}
                          className="group relative flex h-[74px] w-[74px] sm:h-[84px] sm:w-[84px] shrink-0 items-center justify-center rounded-full focus:outline-none cursor-pointer select-none"
                        >
                          {/* Ambient Glow Halo */}
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none absolute rounded-full transition-all duration-300 ${
                              isOpen
                                ? 'h-24 w-24 bg-[#F97316]/40 blur-md'
                                : 'h-16 w-16 bg-[#F97316]/20 blur-[6px] group-hover:bg-[#F97316]/35'
                            }`}
                          />

                          {/* Concentric Outer Ring */}
                          <span
                            className={`relative flex h-full w-full items-center justify-center rounded-full border transition-all duration-300 ${
                              isOpen
                                ? 'scale-105 border-[2px] border-[#EA580C]/65 bg-[#FDE6CE]/90'
                                : 'border-[1.5px] border-[#E87825]/45 bg-white/90 group-hover:scale-105 group-hover:border-[#EA580C]'
                            }`}
                          >
                            {/* Inner Year Circle */}
                            <span
                              className={`flex h-[58px] w-[58px] sm:h-[66px] sm:w-[66px] items-center justify-center rounded-full transition-all duration-300 ${
                                isOpen
                                  ? 'bg-gradient-to-br from-[#FB923C] via-[#F97316] to-[#EA580C] text-white'
                                  : 'border border-[#E87825]/30 bg-gradient-to-b from-white to-[#FAF6F0] text-[#18181B] group-hover:border-[#EA580C]/60 group-hover:text-[#EA580C]'
                              }`}
                            >
                              <span className="font-number text-[15px] sm:text-[17px] font-bold leading-none tracking-[-0.02em]">
                                {yearShort}
                              </span>
                            </span>
                          </span>
                        </button>

                        {/* LABEL FOR EACH CIRCLE */}
                        <button
                          type="button"
                          onClick={() => handleCircleToggle(idx)}
                          aria-expanded={isOpen}
                          className={`group inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium tracking-[0.01em] transition-all duration-200 hover:scale-[1.03] cursor-pointer ${pillStyle}`}
                        >
                          <span>{item.tag}</span>
                          <span
                            aria-hidden="true"
                            className={`flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[11px] leading-none transition-transform duration-300 ${
                              isOpen ? 'rotate-45' : ''
                            }`}
                          >
                            +
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* EXPANDABLE FULL INFORMATION PANEL (Opens on Circle Click) */}
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-3.5' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={`max-w-[500px] rounded-2xl border border-[#E87825]/35 bg-white/95 p-5 sm:p-6 backdrop-blur-md ${
                            isLeft
                              ? 'mr-auto ml-1 sm:ml-6 md:ml-10 xl:ml-16'
                              : 'ml-auto mr-1 sm:mr-6 md:mr-10 xl:mr-16'
                          }`}
                        >
                          {/* Top Row: Year + Category Tag + Close Button */}
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-number text-lg font-bold tracking-tight text-[#EA580C]">
                                {item.year}
                              </span>
                              <span
                                className={`inline-flex items-center rounded-full px-3 py-0.5 text-[10.5px] font-medium ${pillStyle}`}
                              >
                                {item.tag}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => setOpenIndex(null)}
                              aria-label="Close milestone details"
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[#F4F1EA] text-xs font-bold text-[#18181B] transition-colors hover:bg-[#18181B] hover:text-white cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Full Milestone Title */}
                          <h3 className="mt-2.5 font-display text-[22px] sm:text-[25px] font-semibold leading-snug text-[#18181B]">
                            {item.title}
                          </h3>

                          {/* Complete Unabridged Description */}
                          <p className="mt-2 text-[13.5px] sm:text-[14px] leading-[1.68] text-[#4A4A4F]">
                            {item.description}
                          </p>

                          {/* Full Metadata Pills: Location + Verified Highlight + Metric */}
                          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-black/[0.08] pt-3.5">
                            {/* Location Pill */}
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5E0D6] px-3 py-1 text-[11px] font-medium text-[#1C1C1E]">
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="shrink-0 text-[#18181B]"
                              >
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                              </svg>
                              <span>{item.location}</span>
                            </span>

                            {/* Sage-Mint Verified Highlight Pill */}
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#CFE7CF] px-3 py-1 text-[11px] font-medium text-[#183A24]">
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                                className="shrink-0 text-[#183A24]"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              <span>{item.highlight}</span>
                            </span>

                            {/* Metric Pill */}
                            <span className="inline-flex items-center rounded-full border border-[#EA580C]/25 bg-[#FFF7ED] px-3 py-1 text-[11px] font-semibold text-[#C2410C]">
                              {item.metric}
                            </span>
                          </div>
                        </div>
                      </div>
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
