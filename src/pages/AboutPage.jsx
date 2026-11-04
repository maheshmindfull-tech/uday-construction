import { useEffect } from 'react'
import { aboutPage } from '../data/content'
import Reveal from '../components/Reveal'
import Typewriter from '../components/Typewriter'
import Ticker from '../components/Ticker'
import VisionMission from '../components/VisionMission'
import LegacySection from '../components/LegacySection'
import Timeline from '../components/Timeline'

import aboutHeroBg from '../assets/images/about-hero.jpg'

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us — Uday Construction'
    return () => {
      document.title = 'Uday Construction'
    }
  }, [])

  return (
    <article className="w-full">
      {/* Hero Banner Section with Clear High-Res Architectural Background and 2-Line Typewriter */}
      <section className="relative min-h-[460px] sm:min-h-[500px] w-full overflow-hidden bg-night py-20 pt-32 sm:py-24 sm:pt-36 md:min-h-[36.25rem] 4xl:min-h-[40rem] md:py-32 md:pt-44">
        {/* Crystal Clear High-Definition Background Image */}
        <img
          src={aboutHeroBg}
          alt="Luxury architectural high-rise residence"
          className="absolute inset-0 h-full w-full object-cover object-center md:object-[center_35%]"
        />

        {/* Cinematic Directional Gradients for contrast on text while leaving architecture clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-ember/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/35 via-transparent to-transparent" />

        <div className="relative mx-auto flex max-w-site flex-col justify-center px-4 sm:px-6 md:px-10 2xl:px-16">
          <div className="eyebrow text-gold">ABOUT US</div>

          <div className="mt-5 sm:mt-8 min-h-[85px] min-[390px]:min-h-[100px] sm:min-h-[130px] md:min-h-[165px] lg:min-h-[195px] flex items-center">
            <Typewriter lines={['Legacy &', 'Philosophy']} />
          </div>

          <p className="mt-5 sm:mt-6 max-w-2xl 3xl:max-w-3xl font-display text-lg sm:text-xl font-normal leading-relaxed text-cream md:mt-8 md:text-2xl lg:text-[1.75rem]">
            Delivering High Quality, Effective And Inspiring Built Spaces.
          </p>
        </div>
      </section>

      {/* 1. Founder Story Section */}
      <section className="mx-auto flex max-w-site flex-wrap items-center gap-10 sm:gap-12 px-4 sm:px-6 py-16 sm:py-20 md:gap-20 md:px-10 2xl:px-16 md:pb-28">
        <div className="h-[360px] sm:h-[480px] min-w-[min(100%,260px)] flex-[0_1_26.25rem] 4xl:flex-[0_1_30rem] self-start overflow-hidden bg-night md:sticky md:top-28 md:h-[40rem]">
          <img
            src={aboutPage.portrait}
            alt={aboutPage.portraitAlt}
            className="h-full w-full object-cover object-[48%_38%] motion-safe:animate-hero-in"
          />
        </div>

        <div className="min-w-[min(100%,280px)] flex-[1_1_26.25rem]">
          <Reveal>
            <div className="eyebrow">{aboutPage.eyebrow}</div>
            <h2 className="section-title mt-5 sm:mt-6">{aboutPage.title}</h2>
          </Reveal>
          {aboutPage.paragraphs.map((text, i) => (
            <Reveal key={text} delay={80 * (i + 1)}>
              <p className={`text-base leading-[1.75] text-body md:text-[17px] ${i === 0 ? 'mt-6 sm:mt-7' : 'mt-4'}`}>{text}</p>
            </Reveal>
          ))}
          <Reveal delay={280}>
            <div className="mt-8 sm:mt-10 inline-block max-w-full border border-line px-4 sm:px-5 py-3.5 sm:py-4">
              <p className="font-display text-[22px] sm:text-[1.75rem] leading-[1.18]">{aboutPage.founder}</p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-sun">{aboutPage.role}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Legacy Numbers Section */}
      <LegacySection />

      {/* 3. Company Journey & Milestones Timeline */}
      <Timeline />

      {/* 4. Vision & Mission Section - Dual Architectural Split Duality */}
      <VisionMission />

      {/* Continuous Philosophy Ticker Ribbon */}
      <Ticker />

      {/* 5. Non-Negotiables Section - 4 Boxes Structure matching reference */}
      <section aria-label="Non-negotiables" className="w-full bg-white pt-14 sm:pt-16 pb-8 text-ink md:pt-24 md:pb-10">
        <div className="mx-auto max-w-site px-4 sm:px-6 md:px-10 2xl:px-16">
          <Reveal>
            <h2 className="font-sans text-2xl min-[360px]:text-3xl font-normal tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[3.375rem] leading-[1.12]">
              {aboutPage.nonNegotiable.title}
            </h2>
          </Reveal>

          {/* 4 Boxes 2x2 Grid */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 border border-line md:mt-16 md:grid-cols-2">
            {aboutPage.nonNegotiable.items.map((item, index) => (
              <div
                key={item.num}
                className={`group relative p-5 sm:p-8 transition-colors duration-300 md:p-12 lg:p-14 bg-white hover:bg-neutral-50 ${
                  index % 2 === 1 ? 'md:border-l md:border-line' : ''
                } ${index >= 2 ? 'md:border-t md:border-line' : ''} ${
                  index > 0 ? 'border-t border-line md:border-t-0' : ''
                }`}
              >
                <div className="flex items-start gap-4 sm:gap-6 md:gap-10">
                  {/* Number in Sunrise Vermilion from Logo */}
                  <span className="font-sans text-xs font-semibold tracking-wider text-sun shrink-0 pt-1 md:text-sm">
                    {item.num}
                  </span>

                  {/* Pillar Title and Description */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans text-base min-[360px]:text-lg font-medium tracking-tight text-ink sm:text-xl md:text-[1.375rem] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 sm:mt-3.5 text-xs sm:text-sm md:text-[0.92rem] leading-relaxed text-body group-hover:text-ink transition-colors">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Coming Soon Section */}
      <section className="mx-auto max-w-site px-4 sm:px-6 py-16 sm:py-20 md:px-10 2xl:px-16 md:py-28">
        <Reveal>
          <div className="relative h-[380px] sm:h-[460px] overflow-hidden bg-night md:h-[35rem] 4xl:h-[39rem]">
            <img
              src={aboutPage.comingSoon.image}
              alt={aboutPage.comingSoon.imageAlt}
              className="h-full w-full object-cover motion-safe:animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-12">
              <div className="eyebrow text-gold">{aboutPage.comingSoon.eyebrow}</div>
              <h2 className="mt-3 sm:mt-4 font-display text-[30px] sm:text-[40px] font-medium leading-[1.06] text-white md:text-[4rem]">
                {aboutPage.comingSoon.title}
              </h2>
              <p className="mt-3 sm:mt-4 max-w-[33rem] text-sm sm:text-base leading-relaxed text-white/85">{aboutPage.comingSoon.text}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </article>
  )
}
