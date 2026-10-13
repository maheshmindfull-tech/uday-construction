import { visionMission } from '../data/content'
import Reveal from './Reveal'

export default function VisionMission() {
  const { eyebrow, title, vision, mission } = visionMission

  return (
    <section aria-label="Vision and Mission" className="w-full bg-white py-14 md:py-20">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <Reveal>
          <div className="eyebrow text-sun">{eyebrow}</div>
          <h2 className="section-title mt-4">{title}</h2>
        </Reveal>

        {/* Compact Side-by-Side Clean Simple Boxes (No colored lines) */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Card 1: Vision (Simple, Clean Box) */}
          <Reveal delay={80}>
            <div className="group relative flex h-full flex-col justify-between border border-line bg-white p-6 sm:p-8 transition-all duration-300 hover:border-ink hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-sand px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">
                    {vision.num}
                  </span>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-body">
                    Outlook
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-medium text-ink sm:text-[28px] leading-tight">
                  {vision.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-body sm:text-[15px]">
                  {vision.statement}
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="mt-6 space-y-2.5 border-t border-line/70 pt-5">
                {vision.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-ink">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-ink shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Card 2: Mission (Simple, Clean Box) */}
          <Reveal delay={160}>
            <div className="group relative flex h-full flex-col justify-between border border-line bg-white p-6 sm:p-8 transition-all duration-300 hover:border-ink hover:-translate-y-0.5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-sand px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">
                    {mission.num}
                  </span>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-body">
                    Discipline
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl font-medium text-ink sm:text-[28px] leading-tight">
                  {mission.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-body sm:text-[15px]">
                  {mission.statement}
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="mt-6 space-y-2.5 border-t border-line/70 pt-5">
                {mission.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-ink">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-ink shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
