import { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react'
import { timelineData } from '../data/content'
import Reveal from './Reveal'

import legacyImg from '../assets/images/legacy.jpg'
import project3Img from '../assets/images/project-3.jpg'
import project2Img from '../assets/images/project-2.jpg'
import project1Img from '../assets/images/project-1.jpg'
import residencyImg from '../assets/images/project-residency.jpg'
import skylineImg from '../assets/images/project-skyline.jpg'

const milestonePhotos = [
  legacyImg,
  project3Img,
  project2Img,
  project1Img,
  residencyImg,
  skylineImg,
]

export default function Timeline() {
  const { eyebrow, title, subtitle, milestones } = timelineData
  // Default active milestone in the left image box = 2014 (index 2), matching reference format
  const [selectedIndex, setSelectedIndex] = useState(2)
  // Turns the clicked year's side label into a sharp-cornered small info box (null = all closed pills)
  const [openIndex, setOpenIndex] = useState(null)
  const [linePoints, setLinePoints] = useState('')

  const zigzagRef = useRef(null)
  const desktopCircleRefs = useRef([])
  const mobileCircleRefs = useRef([])

  const activeMilestone = milestones[selectedIndex] || milestones[0]
  const is2025Year = (yearStr) => String(yearStr).trim().startsWith('2025')
  const activeYearLabel = is2025Year(activeMilestone.year)
    ? '2025'
    : activeMilestone.year

  const handleMilestoneClick = (idx) => {
    setSelectedIndex(idx)
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  // Measure exact centers of the visible 6 Year Circles for the diagonal warm-gold zig-zag line
  const updateZigzagLines = useCallback(() => {
    const container = zigzagRef.current
    if (!container) return

    const isDesktopLayout = window.innerWidth >= 640
    const activeRefs = isDesktopLayout
      ? desktopCircleRefs.current
      : mobileCircleRefs.current

    const rect = container.getBoundingClientRect()
    const coords = activeRefs
      .slice(0, milestones.length)
      .map((el) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        if (r.width === 0 && r.height === 0) return null
        const x = r.left - rect.left + r.width / 2
        const y = r.top - rect.top + r.height / 2
        return `${x.toFixed(1)},${y.toFixed(1)}`
      })
      .filter(Boolean)

    if (coords.length >= 2) {
      setLinePoints(coords.join(' '))
    }
  }, [milestones.length])

  useLayoutEffect(() => {
    updateZigzagLines()
  }, [updateZigzagLines, openIndex])

  useEffect(() => {
    const container = zigzagRef.current
    if (!container) return

    let rafId = null
    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateZigzagLines)
    }

    const observer = new ResizeObserver(onResize)
    observer.observe(container)
    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [updateZigzagLines])

  return (
    <section
      id="timeline"
      aria-label="Company Milestones Timeline"
      className="relative w-full border-b border-line bg-white py-14 sm:py-16 md:py-24 text-[#18181B]"
    >
      <div className="site-pad mx-auto max-w-site">
        {/* Section Header */}
        <div className="mx-auto mb-10 sm:mb-12 md:mb-16 max-w-3xl 3xl:max-w-4xl text-center">
          <Reveal>
            <div className="eyebrow justify-center text-sun">{eyebrow}</div>
            <h2 className="section-title mt-4 text-ink">{title}</h2>
            <p className="mx-auto mt-3.5 max-w-2xl 3xl:max-w-3xl text-sm sm:text-base leading-relaxed text-body">
              {subtitle}
            </p>
          </Reveal>
        </div>

        {/* Main Split Stage: Left Rounded Building Photo Box + Right Gold Zig-Zag Circle Timeline */}
        <div className="mx-auto grid max-w-[78.75rem] 4xl:max-w-[84rem] grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-6 xl:gap-12 4xl:gap-16">
          {/* LEFT COLUMN: Rounded Architectural Image Box */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] xl:max-w-[27.2rem] 4xl:max-w-[30rem]">
              {/* Soft Ambient Shadow Underlay (unaffected by global box-shadow: none) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-5 -bottom-3 top-6 rounded-[30px] bg-black/[0.11] blur-xl"
              />

              <div className="relative h-[340px] min-[380px]:h-[390px] sm:h-[470px] lg:h-[515px] 3xl:h-[33rem] 4xl:h-[34.5rem] w-full overflow-hidden rounded-[24px] sm:rounded-[28px] 4xl:rounded-[34px] bg-[#EFECE6]">
                {milestones.map((item, idx) => {
                  const imgSrc = milestonePhotos[idx % milestonePhotos.length]
                  const isCurrent = selectedIndex === idx
                  return (
                    <img
                      key={item.year}
                      src={imgSrc}
                      alt={`${item.year} — ${item.title}`}
                      className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ease-out ${
                        isCurrent
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                    />
                  )
                })}

                {/* Subtle Bottom Gradient Vignette for Pill Contrast */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 4xl:h-36 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
                />

                {/* Bottom Dark Translucent Active Milestone Pill */}
                <div className="absolute inset-x-3 sm:inset-x-4 bottom-3.5 sm:bottom-5 4xl:bottom-6 z-10 flex justify-center">
                  <div className="inline-flex max-w-full min-w-0 items-center justify-center gap-1.5 sm:gap-2 4xl:gap-2.5 rounded-full bg-[#221F1B]/80 px-3 sm:px-5 3xl:px-6 4xl:px-7 py-2 sm:py-2.5 3xl:py-3 4xl:py-3.5 text-white backdrop-blur-md">
                    {/* Warm Gold Map Pin Icon */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="h-3.5 w-3.5 sm:h-[15px] sm:w-[15px] 3xl:h-[18px] 3xl:w-[18px] 4xl:h-5 4xl:w-5 shrink-0 text-[#E9A944]"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                        fill="currentColor"
                      />
                      <circle cx="12" cy="9" r="2.6" fill="#221F1B" />
                    </svg>
                    <p className="min-w-0 truncate text-[11px] min-[380px]:text-[12px] sm:text-[13px] 3xl:text-[15px] 4xl:text-[17px] font-normal tracking-[0.01em] text-white/95">
                      Active Milestone:{' '}
                      <span className="font-medium text-white">{activeYearLabel}</span>
                      <span className="mx-1.5 sm:mx-2 font-semibold text-[#E9A944]">|</span>
                      <span>{activeMilestone.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Gold-Outlined Zig-Zag Year Circles + Side Labels / Sharp Small Info Box */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div ref={zigzagRef} className="relative w-full py-1 space-y-2.5 sm:space-y-2 3xl:space-y-2.5 4xl:space-y-3">
              {/* Crisp Diagonal Warm-Gold Zig-Zag Connector Lines */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible z-0"
              >
                {linePoints && (
                  <polyline
                    points={linePoints}
                    fill="none"
                    stroke="#E5AD53"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>

              {milestones.map((item, idx) => {
                const isEven = idx % 2 === 0
                const isSelected = selectedIndex === idx
                const isOpen = openIndex === idx
                const is2025 = is2025Year(item.year)
                const isFirst = idx === 0
                const isLast = idx === milestones.length - 1

                // Keep top/bottom opened boxes flush within timeline vertical bounds
                const boxVerticalAnchor = isFirst
                  ? 'top-0'
                  : isLast
                    ? 'bottom-0'
                    : 'top-1/2 -translate-y-1/2'

                return (
                  <div
                    key={item.year}
                    className={`relative ${isOpen ? 'z-30' : 'z-10'}`}
                  >
                    {/* DESKTOP / TABLET / 2K / 4K SYMMETRIC ZIG-ZAG ROW (sm and up) */}
                    <div className="relative hidden sm:flex h-[74px] xl:h-[78px] 3xl:h-[90px] 4xl:h-[106px] w-full items-center justify-center">
                      {/* Side Label: Pill when closed -> Sharp-Cornered Small Box in-place when clicked */}
                      <div
                        className={`absolute ${
                          isOpen ? boxVerticalAnchor : 'top-1/2 -translate-y-1/2'
                        } ${
                          isEven
                            ? 'right-[calc(50%+68px)] xl:right-[calc(50%+90px)] 3xl:right-[calc(50%+104px)] 4xl:right-[calc(50%+124px)]'
                            : 'left-[calc(50%+68px)] xl:left-[calc(50%+90px)] 3xl:left-[calc(50%+104px)] 4xl:left-[calc(50%+124px)]'
                        }`}
                      >
                        {isOpen ? (
                          /* SHARP-CORNERED SMALL BOX (Replaces the pill label in-place, never between 2 nodes) */
                          <div className="relative w-[198px] md:w-[235px] lg:w-[196px] xl:w-[260px] 3xl:w-[300px] 4xl:w-[355px]">
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-1 -bottom-1.5 top-1.5 rounded-none bg-black/[0.10] blur-[7px]"
                            />
                            <div className="relative rounded-none border-[1.5px] 4xl:border-[2px] border-[#E5AD53] bg-white p-3 xl:p-3.5 3xl:p-4 4xl:p-5 text-left">
                              {/* Box Header: Square Gold Marker + Category Tag + Sharp Close Button */}
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-1.5 4xl:gap-2 min-w-0">
                                  <span className="h-2.5 w-2.5 4xl:h-3 4xl:w-3 shrink-0 rounded-none bg-[#E5AD53]" />
                                  <span className="truncate font-sans text-[10px] xl:text-[11px] 3xl:text-[12px] 4xl:text-[13.5px] font-bold uppercase tracking-[0.05em] text-[#B7791F]">
                                    {item.tag}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setOpenIndex(null)
                                  }}
                                  aria-label="Close milestone box"
                                  className="flex h-5 w-5 4xl:h-6 4xl:w-6 shrink-0 items-center justify-center rounded-none border border-black/15 bg-[#F8F7F4] text-[10px] 4xl:text-xs font-bold text-[#18181B] transition-colors hover:bg-[#18181B] hover:text-white cursor-pointer"
                                >
                                  ✕
                                </button>
                              </div>

                              {/* Milestone Title */}
                              <h3 className="mt-1.5 4xl:mt-2 font-display text-[13.5px] xl:text-[15px] 3xl:text-[17px] 4xl:text-[20px] font-semibold leading-[1.28] text-[#18181B]">
                                {item.title}
                              </h3>

                              {/* Milestone Description */}
                              <p className="mt-1.5 4xl:mt-2 text-[11px] xl:text-[11.5px] 3xl:text-[13px] 4xl:text-[15px] leading-[1.52] text-[#4A4A4F]">
                                {item.description}
                              </p>

                              {/* Compact Box Footer: Location + Metric */}
                              <div className="mt-2.5 4xl:mt-3 flex flex-wrap items-center justify-between gap-1.5 border-t border-black/[0.08] pt-2 4xl:pt-2.5">
                                <span className="inline-flex items-center gap-1 text-[10px] xl:text-[10.5px] 3xl:text-[12px] 4xl:text-[13.5px] font-medium text-[#1C1C1E]">
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-2.5 w-2.5 4xl:h-3.5 4xl:w-3.5 shrink-0 text-[#DC9630]"
                                  >
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                                  </svg>
                                  <span>{item.location}</span>
                                </span>

                                <span className="inline-flex items-center rounded-none border border-[#E5AD53]/50 bg-[#FDF6EA] px-1.5 4xl:px-2 py-0.5 text-[9.5px] xl:text-[10px] 3xl:text-[11px] 4xl:text-[12.5px] font-bold text-[#9A6212]">
                                  {item.metric}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* RESTING FLOATING PILL LABEL */
                          <div className="relative">
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-1.5 -bottom-1.5 top-1.5 rounded-full bg-black/[0.065] blur-[6px]"
                            />
                            <button
                              type="button"
                              onClick={() => handleMilestoneClick(idx)}
                              aria-expanded={isOpen}
                              className={`relative inline-flex xl:min-w-[198px] 3xl:min-w-[230px] 4xl:min-w-[275px] items-center gap-2 xl:gap-2.5 4xl:gap-3 rounded-full border bg-white px-3 xl:px-4 3xl:px-5 4xl:px-6 py-2 xl:py-2.5 3xl:py-3 4xl:py-3.5 text-left transition-all duration-200 hover:scale-[1.03] cursor-pointer ${
                                isSelected
                                  ? 'border-[#E5AD53]/65'
                                  : 'border-black/[0.04] hover:border-[#E5AD53]/50'
                              }`}
                            >
                              <span className="h-2.5 w-2.5 xl:h-3 xl:w-3 3xl:h-3.5 3xl:w-3.5 4xl:h-4 4xl:w-4 shrink-0 rounded-full bg-gradient-to-br from-[#F6C875] to-[#E29B32]" />
                              <span className="whitespace-nowrap font-sans text-[12px] xl:text-[13.5px] 3xl:text-[15.5px] 4xl:text-[18px] font-medium text-[#18181B]">
                                {item.tag}
                              </span>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Gold-Outlined White Year Circle */}
                      <div
                        className={`relative ${
                          isEven
                            ? '-translate-x-[26px] xl:-translate-x-[38px] 3xl:-translate-x-[44px] 4xl:-translate-x-[52px]'
                            : 'translate-x-[26px] xl:translate-x-[38px] 3xl:translate-x-[44px] 4xl:translate-x-[52px]'
                        }`}
                      >
                        {/* Soft Circle Shadow Underlay */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-1 translate-y-1.5 rounded-full bg-black/[0.085] blur-[6px]"
                        />

                        <button
                          ref={(el) => {
                            desktopCircleRefs.current[idx] = el
                          }}
                          type="button"
                          onClick={() => handleMilestoneClick(idx)}
                          aria-expanded={isOpen}
                          aria-label={`${item.year} — ${item.tag}. Click to view milestone details`}
                          className={`group relative flex h-[68px] w-[68px] xl:h-[76px] xl:w-[76px] 3xl:h-[88px] 3xl:w-[88px] 4xl:h-[104px] 4xl:w-[104px] items-center justify-center rounded-full border-[2px] 4xl:border-[2.5px] bg-white transition-transform duration-200 hover:scale-105 focus:outline-none cursor-pointer select-none ${
                            isSelected
                              ? 'border-[#DC9630] bg-[#FFFDF9]'
                              : 'border-[#E5AD53] hover:border-[#DC9630]'
                          }`}
                        >
                          {is2025 ? (
                            <span className="flex flex-col items-center leading-none">
                              <span className="font-sans text-[15px] xl:text-[16.5px] 3xl:text-[18.5px] 4xl:text-[22px] font-extrabold tracking-[-0.02em] text-[#111827]">
                                2025
                              </span>
                              <span className="mt-0.5 font-sans text-[10px] xl:text-[11px] 3xl:text-[12.5px] 4xl:text-[14px] font-semibold text-[#111827]">
                                Present
                              </span>
                            </span>
                          ) : (
                            <span className="font-sans text-[16.5px] xl:text-[18px] 3xl:text-[20px] 4xl:text-[24px] font-extrabold leading-none tracking-[-0.02em] text-[#111827]">
                              {item.year}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* MOBILE ZIG-ZAG ROW (< sm, including 280px–360px small devices) */}
                    <div
                      className={`flex sm:hidden items-center py-1 ${
                        isEven ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`flex max-w-full items-center gap-2.5 min-[360px]:gap-3 ${
                          isEven ? 'flex-row' : 'flex-row-reverse'
                        }`}
                      >
                        <div className="relative shrink-0">
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-1 translate-y-1 rounded-full bg-black/[0.08] blur-[5px]"
                          />
                          <button
                            ref={(el) => {
                              mobileCircleRefs.current[idx] = el
                            }}
                            type="button"
                            onClick={() => handleMilestoneClick(idx)}
                            aria-expanded={isOpen}
                            className={`relative flex h-[58px] w-[58px] min-[360px]:h-[68px] min-[360px]:w-[68px] items-center justify-center rounded-full border-[2px] bg-white transition-transform duration-200 active:scale-95 cursor-pointer ${
                              isSelected
                                ? 'border-[#DC9630] bg-[#FFFDF9]'
                                : 'border-[#E5AD53]'
                            }`}
                          >
                            {is2025 ? (
                              <span className="flex flex-col items-center leading-none">
                                <span className="font-sans text-[13.5px] min-[360px]:text-[15px] font-extrabold text-[#111827]">
                                  2025
                                </span>
                                <span className="mt-0.5 font-sans text-[9px] min-[360px]:text-[10px] font-semibold text-[#111827]">
                                  Present
                                </span>
                              </span>
                            ) : (
                              <span className="font-sans text-[14.5px] min-[360px]:text-[16px] font-extrabold text-[#111827]">
                                {item.year}
                              </span>
                            )}
                          </button>
                        </div>

                        {/* Mobile Side Label: Pill when closed -> Sharp-Cornered Small Box beside circle when clicked */}
                        {isOpen ? (
                          <div className="relative min-w-0 flex-1 max-w-[235px]">
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-1 -bottom-1 top-1 rounded-none bg-black/[0.09] blur-[6px]"
                            />
                            <div className="relative rounded-none border-[1.5px] border-[#E5AD53] bg-white p-2.5 min-[360px]:p-3 text-left">
                              <div className="flex items-start justify-between gap-1.5">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="h-2 w-2 shrink-0 rounded-none bg-[#E5AD53]" />
                                  <span className="truncate font-sans text-[9.5px] min-[360px]:text-[10px] font-bold uppercase tracking-[0.05em] text-[#B7791F]">
                                    {item.tag}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setOpenIndex(null)
                                  }}
                                  aria-label="Close milestone box"
                                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-none border border-black/15 bg-[#F8F7F4] text-[10px] font-bold text-[#18181B] cursor-pointer"
                                >
                                  ✕
                                </button>
                              </div>
                              <h3 className="mt-1 font-display text-[12.5px] min-[360px]:text-[13px] font-semibold leading-snug text-[#18181B]">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-[10.5px] min-[360px]:text-[11px] leading-[1.48] text-[#4A4A4F]">
                                {item.description}
                              </p>
                              <div className="mt-2 flex flex-wrap items-center justify-between gap-1 border-t border-black/[0.08] pt-1.5">
                                <span className="text-[9.5px] min-[360px]:text-[10px] font-medium text-[#1C1C1E]">
                                  {item.location}
                                </span>
                                <span className="rounded-none border border-[#E5AD53]/50 bg-[#FDF6EA] px-1.5 py-0.5 text-[9px] min-[360px]:text-[9.5px] font-bold text-[#9A6212]">
                                  {item.metric}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="relative min-w-0">
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-x-1 -bottom-1 top-1 rounded-full bg-black/[0.06] blur-[5px]"
                            />
                            <button
                              type="button"
                              onClick={() => handleMilestoneClick(idx)}
                              aria-expanded={isOpen}
                              className="relative inline-flex max-w-full items-center gap-1.5 min-[360px]:gap-2 rounded-full border border-black/[0.04] bg-white px-2.5 min-[360px]:px-3.5 py-1.5 min-[360px]:py-2 text-left cursor-pointer"
                            >
                              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-[#F6C875] to-[#E29B32]" />
                              <span className="truncate font-sans text-[11px] min-[360px]:text-[12px] font-medium text-[#18181B]">
                                {item.tag}
                              </span>
                            </button>
                          </div>
                        )}
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
