import { tickerPoints } from '../data/content'

export default function Ticker() {
  const points = tickerPoints || [
    'Spatial Craft',
    'Light Sensitive Architecture',
    'Quiet Living',
    'Architecture First',
    'Bespoke Homes',
    'Biophilia Inspired',
  ]

  // Duplicate items 4 times to guarantee a seamless, gap-free infinite scroll loop on wide monitors
  const duplicatedList = [...points, ...points, ...points, ...points]

  return (
    <div
      aria-label="Design Philosophy Highlights"
      className="relative w-full overflow-hidden border-y border-line bg-gradient-to-r from-sand via-white to-sand py-3.5 text-ink select-none md:py-4"
    >
      <div className="animate-marquee flex items-center">
        {duplicatedList.map((item, idx) => (
          <div
            key={idx}
            className="flex shrink-0 items-center gap-3.5 px-6 md:gap-4 md:px-8"
          >
            {/* Bullet dot */}
            <span
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sun"
              aria-hidden="true"
            />
            {/* Uppercase Tracked Typography */}
            <span className="font-number text-[11px] font-medium uppercase tracking-[0.22em] text-ink md:text-[12px]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
