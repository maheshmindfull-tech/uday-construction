import { aboutPage } from '../data/content'
import Reveal from './Reveal'

export default function ComingSoonBanner() {
  const { comingSoon } = aboutPage

  return (
    <section aria-label="Coming Soon" className="w-full bg-white pb-20 md:pb-28">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <Reveal>
          <div className="relative h-[460px] overflow-hidden bg-night md:h-[560px]">
            <img
              src={comingSoon.image}
              alt={comingSoon.imageAlt}
              className="h-full w-full object-cover motion-safe:animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/65 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-12">
              <div className="eyebrow text-gold">{comingSoon.eyebrow}</div>
              <h2 className="mt-4 font-display text-[40px] font-medium leading-none text-white md:text-[64px]">
                {comingSoon.title}
              </h2>
              <p className="mt-4 max-w-[520px] text-base leading-relaxed text-white/80">
                {comingSoon.text}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
