import { textTestimonials } from '../data/content'
import Reveal from './Reveal'

export default function TestimonialTicker({
  showHeader = false,
  className = '',
}) {
  const items = textTestimonials || []
  // Duplicate list to guarantee a seamless, gap-free infinite loop on any screen width
  const duplicatedList = [...items, ...items, ...items, ...items]

  return (
    <section
      aria-label="Client Testimonials Moving Cards"
      className={`relative w-full overflow-hidden border-b border-line bg-sand/40 py-5 sm:py-7 ${className}`}
    >
      {showHeader && (
        <div className="mx-auto max-w-site px-5 pb-6 md:px-10 md:pb-8">
          <Reveal>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
              <span className="block h-0.5 w-10 bg-gradient-to-r from-orange-500 to-amber-400" />
              Client Voices
            </div>
            <h2 className="section-title mt-3 text-ink">
              Stories of Trust &amp; Quiet Living
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-body md:text-base">
              Real homeowner experiences across our completed developments in
              Pimpri-Chinchwad and Pune.
            </p>
          </Reveal>
        </div>
      )}

      {/* Slow Moving Marquee Track of Boxes (Right to Left) */}
      <div className="relative w-full overflow-hidden">
        {/* Soft Left & Right Fade Masks for graceful edge transitions */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 inset-y-0 z-10 w-12 bg-gradient-to-r from-sand/90 to-transparent sm:w-20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 inset-y-0 z-10 w-12 bg-gradient-to-l from-sand/90 to-transparent sm:w-20"
        />

        <div className="animate-marquee-cards flex items-stretch gap-5 px-3 py-1 sm:gap-7 select-none">
          {duplicatedList.map((item, idx) => {
            const initials = item.client
              ? item.client
                  .replace(/^(Mr\.|Mrs\.|Dr\.|The)\s+/gi, '')
                  .split(' ')
                  .map((w) => w[0])
                  .filter(Boolean)
                  .slice(0, 2)
                  .join('')
              : 'UC'

            return (
              <div
                key={idx}
                className="group relative flex w-[320px] sm:w-[370px] md:w-[410px] shrink-0 flex-col justify-between border border-line bg-white p-5 sm:p-6 transition-all duration-300 hover:border-orange-500/70 hover:-translate-y-1 hover:shadow-sm"
              >
                {/* Top Subtle Orange Accent Line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-transparent transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-amber-400" />

                <div>
                  {/* Top Row: 5 Warm Orange Stars & Quotation Mark */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-orange-500 text-xs sm:text-sm">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>

                    <span className="font-display text-3xl font-bold leading-none text-orange-500/30 group-hover:text-orange-500/60 transition-colors">
                      &ldquo;
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="mt-4 font-display text-[17px] sm:text-[19px] leading-relaxed text-ink italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom Row: Client Avatar, Name & Project Badge */}
                <div className="mt-6 flex items-center gap-3 border-t border-line/70 pt-4 sm:mt-8">
                  {/* Avatar Initials Badge */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-xs font-bold text-orange-600">
                    {initials}
                  </div>

                  {/* Client Info */}
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-bold text-ink">
                      {item.client}
                    </h4>
                    <p className="truncate text-xs text-body">
                      <span className="font-medium text-orange-600">
                        {item.project}
                      </span>
                      <span className="text-body/60"> &bull; {item.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
