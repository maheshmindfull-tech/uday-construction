import Reveal from './Reveal'
import residencyImg from '../assets/images/project-residency.jpg'

function HardHatIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="#9B7245"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6 min-[360px]:h-[26px] min-[360px]:w-[26px] 3xl:h-[1.7rem] 3xl:w-[1.7rem]"
    >
      <path d="M5.5 18v-1.5a8.5 8.5 0 0 1 17 0V18" />
      <path d="M14 7.5v5.2" />
      <path d="M10.8 8.4l.7 4.4" />
      <path d="M17.2 8.4l-.7 4.4" />
      <path d="M3.5 18h21a1 1 0 0 1 1 1v.4a1.6 1.6 0 0 1-1.6 1.6H4.1a1.6 1.6 0 0 1-1.6-1.6V19a1 1 0 0 1 1-1Z" />
    </svg>
  )
}

function DevelopmentsIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="#9B7245"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6 min-[360px]:h-[26px] min-[360px]:w-[26px] 3xl:h-[1.7rem] 3xl:w-[1.7rem]"
    >
      <path d="M4.5 22.5h19" />
      <path d="M6.5 22.5V12.8l5-2v11.7" />
      <path d="M8.5 14.8h1.3" />
      <path d="M8.5 17.3h1.3" />
      <path d="M8.5 19.8h1.3" />
      <path d="M11.5 22.5V6.8h9.5v15.7" />
      <path d="M13.5 6.8V5.2h5.5v1.6" />
      <path d="M14.2 9.8h1.2" />
      <path d="M17.6 9.8h1.2" />
      <path d="M14.2 12.6h1.2" />
      <path d="M17.6 12.6h1.2" />
      <path d="M14.2 15.4h1.2" />
      <path d="M17.6 15.4h1.2" />
      <path d="M14.2 18.2h1.2" />
      <path d="M17.6 18.2h1.2" />
      <path d="M15.1 22.5v-2.4h2.3v2.4" />
    </svg>
  )
}

function ExperienceSealIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="#9B7245"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6 min-[360px]:h-[27px] min-[360px]:w-[27px] 3xl:h-[1.75rem] 3xl:w-[1.75rem]"
    >
      {/* 12-scallop rosette seal */}
      <path d="M22.4 14 Q24.3 16.8 21.3 18.2 Q21.6 21.6 18.2 21.3 Q16.8 24.3 14 22.4 Q11.2 24.3 9.8 21.3 Q6.4 21.6 6.7 18.2 Q3.7 16.8 5.6 14 Q3.7 11.2 6.7 9.8 Q6.4 6.4 9.8 6.7 Q11.2 3.7 14 5.6 Q16.8 3.7 18.2 6.7 Q21.6 6.4 21.3 9.8 Q24.3 11.2 22.4 14 Z" />
      {/* Inner seal ring */}
      <circle cx="14" cy="14" r="6.2" />
      {/* Center 5-pointed star */}
      <path d="M14 10.3l.95 2.32 2.5.18-1.92 1.62.6 2.45L14 15.55l-2.13 1.32.6-2.45-1.92-1.62 2.5-.18L14 10.3Z" />
    </svg>
  )
}

function HappyFamiliesIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="#9B7245"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6 min-[360px]:h-[27px] min-[360px]:w-[27px] 3xl:h-[1.75rem] 3xl:w-[1.75rem]"
    >
      {/* Foreground family member */}
      <circle cx="10.8" cy="9.5" r="3" />
      <path d="M5 21.5v-2.1a4.6 4.6 0 0 1 4.6-4.6h2.4a4.6 4.6 0 0 1 4.6 4.6v2.1H5Z" />
      <path d="M9.2 14.9L10.8 17l1.6-2.1" />
      <path d="M8 18.8v2.7" />
      <path d="M13.6 18.8v2.7" />
      {/* Companion family member */}
      <circle cx="18.3" cy="10.8" r="2.5" />
      <path d="M16.4 15.5h2.1a4.2 4.2 0 0 1 4.2 4.2v1.8h-6.1" />
    </svg>
  )
}

const legacyMetrics = [
  {
    value: '44',
    label: 'Projects Delivered',
    Icon: HardHatIcon,
  },
  {
    value: '81',
    label: 'Completed Developments',
    Icon: DevelopmentsIcon,
  },
  {
    value: '40+',
    label: 'Years of Experience',
    Icon: ExperienceSealIcon,
  },
  {
    value: '8,000+',
    label: 'Happy Families',
    Icon: HappyFamiliesIcon,
  },
]

export default function LegacySection() {
  return (
    <section
      aria-label="Legacy numbers"
      className="relative w-full overflow-hidden bg-white py-14 text-[#17191C] sm:py-16 md:py-24"
    >
      {/* Top In-Flow Split Row: Left aligned to max-w-site + Right flush-bleed slanted architecture frame */}
      <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between lg:pl-[calc((100%-min(97.5rem,92vw))/2+2.5rem)] 2xl:pl-[calc((100%-min(97.5rem,92vw))/2+4rem)]">
        {/* Left Editorial Legacy Copy */}
        <div className="site-pad w-full lg:w-[43%] lg:shrink-0 lg:px-0 lg:pr-6">
          <Reveal>
            {/* Eyebrow: Crimson Horizontal Bar + LEGACY */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="block h-[2.5px] w-8 sm:w-[2.5rem] shrink-0 bg-[#B91C1C]" />
              <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#B91C1C]">
                LEGACY
              </span>
            </div>

            {/* Hero Number: Bold Crimson "10" + Classical Charcoal Serif "Million+" */}
            <h2 className="mt-5 sm:mt-7 flex items-baseline whitespace-nowrap">
              <span className="font-display text-[48px] min-[360px]:text-[60px] sm:text-[84px] lg:text-[5.5rem] xl:text-[6.5rem] font-bold leading-[0.92] tracking-[-0.02em] text-[#B91C1C] [font-variant-numeric:lining-nums]">
                10
              </span>
              <span className="ml-2 sm:ml-3.5 font-display text-[33px] min-[360px]:text-[42px] sm:text-[60px] lg:text-[3.85rem] xl:text-[4.6rem] font-normal leading-[0.92] tracking-[-0.015em] text-[#17191C]">
                Million+
              </span>
            </h2>

            {/* Editorial Serif Subtitle */}
            <p className="mt-4 sm:mt-6 max-w-[28rem] font-display text-[18px] min-[360px]:text-[20px] sm:text-[23px] xl:text-[1.55rem] font-normal leading-[1.38] text-[#22252A]">
              sq. ft. thoughtfully designed spaces across Pune and Pimpri-Chinchwad.
            </p>

            {/* Short Crimson Bottom Rule */}
            <div className="mt-5 sm:mt-7 h-[2px] w-12 sm:w-[3.6rem] bg-[#B91C1C]" />
          </Reveal>
        </div>

        {/* Right Slanted Architectural Photo (In-flow so height scales naturally at 1024px, 1920px, 2560px & 4K with zero clipping) */}
        <div className="mt-8 w-full pl-3 sm:pl-8 lg:mt-0 lg:w-[57%] lg:pl-0">
          <svg
            viewBox="0 0 840 420"
            className="block h-auto w-full"
            role="img"
            aria-label="Modern multi-storey residential apartment building by Uday Construction"
          >
            <defs>
              <clipPath id="legacy-slanted-photo-clip">
                <path d="M 840 0 L 294 0 Q 250 0 233.5 40.8 L 97.3 377.4 Q 80 420 126 420 L 840 420 Z" />
              </clipPath>
            </defs>

            {/* Offset Pale Blush Geometric Backing Shape */}
            <path
              d="M 450 42 L 207 42 Q 167 42 152.0 79.1 L 29.8 381.1 Q 14 420 56 420 L 450 420 Z"
              fill="#FAF2F0"
            />

            {/* Clipped High-Resolution Architectural Photograph */}
            <g clipPath="url(#legacy-slanted-photo-clip)">
              <image
                href={residencyImg}
                x="70"
                y="0"
                width="770"
                height="578"
                preserveAspectRatio="xMidYMin slice"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Bottom 4-Column Metrics Row + Bottom Crimson/Gray Accent Track */}
      <div className="site-pad mx-auto max-w-site">
        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0">
          {legacyMetrics.map(({ value, label, Icon }, idx) => (
            <Reveal
              key={label}
              delay={idx * 80}
              className={`flex items-start gap-3.5 sm:gap-4 ${
                idx > 0
                  ? 'lg:border-l lg:border-[#E7E5E4] lg:pl-7 xl:pl-10'
                  : ''
              } ${idx < legacyMetrics.length - 1 ? 'lg:pr-5 xl:pr-6' : ''}`}
            >
              {/* Soft Warm Ivory Circular Icon Badge */}
              <div className="flex h-12 w-12 min-[360px]:h-[56px] min-[360px]:w-[56px] xl:h-[3.75rem] xl:w-[3.75rem] shrink-0 items-center justify-center rounded-full bg-[#F7F3EE]">
                <Icon />
              </div>

              {/* Metric Number + Label */}
              <div className="min-w-0 pt-0.5">
                <p className="font-display text-[32px] min-[360px]:text-[38px] sm:text-[42px] xl:text-[2.85rem] font-medium leading-[0.95] tracking-[-0.01em] text-[#B91C1C] [font-variant-numeric:lining-nums]">
                  {value}
                </p>
                <p className="mt-2 sm:mt-2.5 font-sans text-[13px] sm:text-[13.5px] xl:text-[0.92rem] font-normal leading-snug text-[#373A40]">
                  {label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Progress / Accent Line (Bold Crimson Left Bar + Full-Width Subtle Gray Line) */}
        <div className="mt-10 sm:mt-12 md:mt-16 flex w-full items-center" aria-hidden="true">
          <span className="h-[3px] w-14 sm:w-[5.5rem] shrink-0 bg-[#B91C1C]" />
          <span className="h-[1px] flex-1 bg-[#DCDCDC]" />
        </div>
      </div>
    </section>
  )
}
