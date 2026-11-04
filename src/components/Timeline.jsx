import { useState } from 'react'
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

const desktopRowPlacement = [
  { card: 'md:col-start-1 md:row-start-1 md:row-span-2', node: 'md:col-start-2 md:row-start-1', side: 'left' },
  { card: 'md:col-start-3 md:row-start-2 md:row-span-2', node: 'md:col-start-2 md:row-start-2', side: 'right' },
  { card: 'md:col-start-1 md:row-start-3 md:row-span-2 md:pt-4', node: 'md:col-start-2 md:row-start-3 md:pt-4', side: 'left' },
  { card: 'md:col-start-3 md:row-start-4 md:row-span-2 md:pt-4', node: 'md:col-start-2 md:row-start-4 md:pt-4', side: 'right' },
  { card: 'md:col-start-1 md:row-start-5 md:row-span-2 md:pt-4', node: 'md:col-start-2 md:row-start-5 md:pt-4', side: 'left' },
  { card: 'md:col-start-3 md:row-start-6 md:row-span-2 md:pt-4', node: 'md:col-start-2 md:row-start-6 md:pt-4', side: 'right' },
]

function SpineNode({ isActive, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group relative z-20 flex h-[30px] w-[30px] shrink-0 items-center justify-center focus:outline-none cursor-pointer"
    >
      {isActive ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-14 w-14 rounded-full bg-[#F97316]/40 blur-md"
          />
          <span className="pointer-events-none absolute flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-[#F97316]/55 bg-[#FDE6CE]/85 transition-all duration-300">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#F97316]/30 bg-white">
              <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#FDBA74] via-[#F97316] to-[#EA580C]" />
            </span>
          </span>
        </>
      ) : (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-8 w-8 rounded-full bg-[#F97316]/25 blur-[6px] transition-opacity duration-300 group-hover:bg-[#F97316]/40"
          />
          <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-[#E87825]/40 bg-white/95 transition-transform duration-300 group-hover:scale-110">
            <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#FDBA74] to-[#EA580C]" />
          </span>
        </>
      )}
    </button>
  )
}

function MilestoneContent({ item, index, isActive, onActivate }) {
  const yearDisplay = item.year === '2025 - Present' ? '2025+' : item.year
  const pillColor = tagPillStyles[index % tagPillStyles.length]

  return (
    <div
      onClick={onActivate}
      onMouseEnter={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onActivate()
        }
      }}
      className={`group relative pb-3 text-left transition-opacity duration-300 cursor-pointer focus:outline-none ${
        isActive ? 'opacity-100' : 'opacity-90 hover:opacity-100'
      }`}
    >
      {/* Year + Colored Category Tag Pill */}
      <div className="flex min-h-[30px] flex-wrap items-center gap-2.5">
        <span className="font-number text-[26px] sm:text-[28px] xl:text-[31px] font-semibold leading-none tracking-[-0.02em] text-[#18181B]">
          {yearDisplay}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-[10.5px] xl:text-[11px] font-medium tracking-[0.01em] transition-transform duration-200 group-hover:scale-[1.02] ${pillColor}`}
        >
          {item.tag}
        </span>
      </div>

      {/* Milestone Headline */}
      <h3 className="mt-2 font-sans text-[15.5px] sm:text-[16.5px] xl:text-[17.5px] font-semibold leading-snug tracking-[-0.01em] text-[#18181B]">
        {item.title}
      </h3>

      {/* Narrative Description */}
      <p className="mt-1.5 text-[12.5px] xl:text-[13px] leading-[1.58] text-[#4A4A4F] line-clamp-3">
        {item.description}
      </p>

      {/* Bottom Pills: Location + Verified Delivery Metric */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {/* Warm Stone Location Pill */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5E0D6] px-2.5 py-1 text-[10.5px] xl:text-[11px] font-medium text-[#1C1C1E]">
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
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#CFE7CF] px-2.5 py-1 text-[10.5px] xl:text-[11px] font-medium text-[#183A24]">
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
      </div>
    </div>
  )
}

export default function Timeline() {
  const { eyebrow, title, subtitle, milestones } = timelineData
  // Default to 2014 (index 2) matching Option V2 Editorial Split-Screen design
  const [activeIndex, setActiveIndex] = useState(2)
  const activeMilestone = milestones[activeIndex] || milestones[0]
  const activeYearShort =
    activeMilestone.year === '2025 - Present' ? '2025+' : activeMilestone.year

  return (
    <section
      id="timeline"
      aria-label="Company Milestones Timeline"
      className="relative w-full border-b border-black/[0.08] bg-[#F4F1EA] text-[#18181B]"
    >
      {/* Subtle Architectural CAD Drafting Lines & Perspective Wireframe */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Left & Right Vertical Drafting Margin Hairlines */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-[max(24px,calc((100%-1560px)/2+40px))] w-[1px] bg-black/[0.055]" />
        <div className="hidden lg:block absolute top-0 bottom-0 right-[max(24px,calc((100%-1560px)/2+40px))] w-[1px] bg-black/[0.055]" />

        {/* Bottom-Left Architectural High-Rise Perspective Wireframe */}
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
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* LEFT COLUMN: Tall Golden-Hour Architectural Tower Showcase */}
          <div className="lg:col-span-4 xl:col-span-4 flex">
            <div className="relative w-full h-[400px] sm:h-[470px] lg:h-full lg:min-h-[660px] overflow-hidden rounded-[22px] bg-[#2C1A0E]">
              {milestones.map((item, idx) => {
                const imgSrc = milestoneImages[item.year] || legacyImg
                const isCurrent = activeIndex === idx
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

          {/* RIGHT COLUMN: Vertical Glowing Orange Spine + Staggered Chronological Milestones */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-center">
            {/* DESKTOP & TABLET DUAL-COLUMN STAGGERED TIMELINE (md and up) */}
            <div className="relative hidden md:grid md:grid-cols-[1fr_64px_1fr] xl:grid-cols-[1fr_76px_1fr] md:auto-rows-[minmax(105px,auto)] items-start">
              {/* Continuous Central Glowing Orange Spine */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex justify-center"
              >
                <div className="h-full w-4 bg-gradient-to-b from-transparent via-[#F97316]/25 to-transparent blur-md" />
                <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#E87825]/10 via-[#E87825] to-[#E87825]/15" />
              </div>

              {milestones.map((item, idx) => {
                const isActive = activeIndex === idx
                const placement = desktopRowPlacement[idx]
                const isLeft = placement.side === 'left'

                return (
                  <div key={item.year} className="contents">
                    {/* Milestone Content Block */}
                    <div
                      className={`${placement.card} ${
                        isLeft ? 'pr-3 xl:pr-5' : 'pl-3 xl:pl-5'
                      } relative z-10`}
                    >
                      <MilestoneContent
                        item={item}
                        index={idx}
                        isActive={isActive}
                        onActivate={() => setActiveIndex(idx)}
                      />
                    </div>

                    {/* Synchronized Glowing Spine Node + Horizontal Connector Hairline */}
                    <div
                      className={`${placement.node} relative z-20 flex items-center justify-center`}
                    >
                      <div className="relative flex h-[30px] w-full items-center justify-center">
                        {/* Thin Horizontal Orange Connector Hairline directly from Node Center */}
                        <div
                          aria-hidden="true"
                          className={`pointer-events-none absolute top-1/2 h-[1px] -translate-y-1/2 bg-[#E87825]/45 transition-all duration-300 ${
                            isLeft
                              ? 'right-1/2 w-12 xl:w-16'
                              : 'left-1/2 w-9 xl:w-11'
                          } ${isActive ? 'bg-[#EA580C]/70' : ''}`}
                        />

                        <SpineNode
                          isActive={isActive}
                          onClick={() => setActiveIndex(idx)}
                          label={`Select ${item.year} milestone`}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* MOBILE VERTICAL TIMELINE (< md) */}
            <div className="relative md:hidden pl-12 space-y-8 py-2">
              {/* Left Glowing Orange Spine */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 bottom-0 left-4 -translate-x-1/2 flex justify-center"
              >
                <div className="h-full w-3.5 bg-gradient-to-b from-transparent via-[#F97316]/25 to-transparent blur-md" />
                <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#E87825]/15 via-[#E87825] to-[#E87825]/15" />
              </div>

              {milestones.map((item, idx) => {
                const isActive = activeIndex === idx
                return (
                  <div key={item.year} className="relative">
                    {/* Mobile Node + Connector on Left Spine */}
                    <div className="absolute -left-8 top-0 -translate-x-1/2 z-20 flex h-[30px] items-center justify-center">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[1px] w-6 -translate-y-1/2 bg-[#E87825]/45"
                      />
                      <SpineNode
                        isActive={isActive}
                        onClick={() => setActiveIndex(idx)}
                        label={`Select ${item.year} milestone`}
                      />
                    </div>

                    <MilestoneContent
                      item={item}
                      index={idx}
                      isActive={isActive}
                      onActivate={() => setActiveIndex(idx)}
                    />
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
