import { aboutPage } from '../data/content'
import Reveal from './Reveal'

export default function ComingSoonBanner() {
  const { comingSoon } = aboutPage

  return (
    <section aria-label="Coming Soon" className="w-full bg-white pb-16 sm:pb-20 md:pb-28">
      <div className="mx-auto max-w-site px-4 sm:px-6 md:px-10 2xl:px-16">
        <Reveal>
          <div className="relative h-[380px] sm:h-[460px] md:h-[35rem] 4xl:h-[39rem] overflow-hidden bg-night">
            <img
              src={comingSoon.image}
              alt={comingSoon.imageAlt}
              className="h-full w-full object-cover motion-safe:animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-12">
              <div className="eyebrow text-gold">{comingSoon.eyebrow}</div>
              <h2 className="mt-3 sm:mt-4 font-display text-[30px] sm:text-[40px] md:text-[4rem] font-medium leading-[1.06] text-white">
                {comingSoon.title}
              </h2>
              <p className="mt-3 sm:mt-4 max-w-[33rem] text-sm sm:text-base leading-relaxed text-white/85">
                {comingSoon.text}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
