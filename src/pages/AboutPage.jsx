import { useEffect } from 'react'
import { aboutPage, stats } from '../data/content'
import Reveal from '../components/Reveal'
import Typewriter from '../components/Typewriter'
import Ticker from '../components/Ticker'
import ProjectGallery from '../components/ProjectGallery'
import aboutHeroBg from '../assets/images/about-hero.jpg'

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Us — Uday Developers'
    return () => {
      document.title = 'Uday Developers'
    }
  }, [])

  return (
    <article className="w-full">
      {/* Hero Banner Section with Clear High-Res Architectural Background and 2-Line Typewriter */}
      <section className="relative min-h-[500px] w-full overflow-hidden bg-night py-24 pt-36 md:min-h-[580px] md:py-32 md:pt-44">
        {/* Crystal Clear High-Definition Background Image */}
        <img
          src={aboutHeroBg}
          alt="Luxury architectural high-rise residence"
          className="absolute inset-0 h-full w-full object-cover object-center md:object-[center_35%]"
        />

        {/* Cinematic Directional Gradients for contrast on text while leaving architecture clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-ember/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/35 via-transparent to-transparent" />

        <div className="relative mx-auto flex max-w-site flex-col justify-center px-5 md:px-10">
          <div className="eyebrow text-gold">ABOUT US</div>

          <div className="mt-6 sm:mt-8 min-h-[105px] sm:min-h-[145px] md:min-h-[175px] lg:min-h-[205px] flex items-center">
            <Typewriter lines={['Legacy &', 'Philosophy']} />
          </div>

          <p className="mt-6 max-w-2xl font-display text-xl font-normal leading-relaxed text-cream md:mt-8 md:text-2xl lg:text-[28px]">
            Delivering High Quality, Effective And Inspiring Built Spaces.
          </p>
        </div>
      </section>

      {/* 1. Founder Story Section */}
      <section className="mx-auto flex max-w-site flex-wrap items-center gap-12 px-5 py-20 md:gap-20 md:px-10 md:pb-28">
        <div className="h-[480px] min-w-[260px] flex-[0_1_420px] self-start overflow-hidden bg-night md:sticky md:top-28 md:h-[640px]">
          <img
            src={aboutPage.portrait}
            alt={aboutPage.portraitAlt}
            className="h-full w-full object-cover object-[48%_38%] motion-safe:animate-hero-in"
          />
        </div>

        <div className="min-w-[280px] flex-[1_1_420px]">
          <Reveal>
            <div className="eyebrow">{aboutPage.eyebrow}</div>
            <h2 className="section-title mt-6">{aboutPage.title}</h2>
          </Reveal>
          {aboutPage.paragraphs.map((text, i) => (
            <Reveal key={text} delay={80 * (i + 1)}>
              <p className={`text-base leading-[1.75] text-body md:text-[17px] ${i === 0 ? 'mt-7' : 'mt-4'}`}>{text}</p>
            </Reveal>
          ))}
          <Reveal delay={280}>
            <div className="mt-10 inline-block border border-line px-5 py-4">
              <p className="font-display text-[28px] leading-none">{aboutPage.founder}</p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-sun">{aboutPage.role}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Legacy Numbers Section - Twilight Charcoal with Sunrise Sun vermilion numbers */}
      <section aria-label="Legacy numbers" className="w-full bg-white text-ink border-b border-line">
        <div className="mx-auto max-w-site px-5 py-16 md:px-10 md:py-24">
          <Reveal>
            <div className="eyebrow text-sun">Legacy</div>
          </Reveal>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-10">
            {stats.items.map((item, i) => (
              <Reveal key={item.label} delay={i * 80} className="min-w-[150px] flex-[1_1_200px]">
                <p className="font-number text-5xl font-[200] leading-none tracking-[-0.03em] text-sun md:text-[68px]">
                  {item.value}
                </p>
                <p className="mt-3.5 text-base text-body">{item.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Philosophy Ticker Ribbon */}
      <Ticker />

      {/* 3. Non-Negotiables Section - 4 Boxes Structure matching reference */}
      <section aria-label="Non-negotiables" className="w-full bg-white py-20 text-ink md:py-28">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <Reveal>
            <h2 className="font-sans text-3xl font-normal tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12]">
              {aboutPage.nonNegotiable.title}
            </h2>
          </Reveal>

          {/* 4 Boxes 2x2 Grid */}
          <div className="mt-12 grid grid-cols-1 border border-line md:mt-16 md:grid-cols-2">
            {aboutPage.nonNegotiable.items.map((item, index) => (
              <div
                key={item.num}
                className={`group relative p-8 transition-colors duration-300 md:p-12 lg:p-14 bg-white hover:bg-neutral-50 ${
                  index % 2 === 1 ? 'md:border-l md:border-line' : ''
                } ${
                  index >= 2 ? 'md:border-t md:border-line' : ''
                } ${
                  index > 0 ? 'border-t border-line md:border-t-0' : ''
                }`}
              >
                <div className="flex items-start gap-6 md:gap-10">
                  {/* Number in Sunrise Vermilion from Logo */}
                  <span className="font-sans text-xs font-semibold tracking-wider text-sun shrink-0 pt-1 md:text-sm">
                    {item.num}
                  </span>

                  {/* Pillar Title and Description */}
                  <div className="flex-1">
                    <h3 className="font-sans text-lg font-medium tracking-tight text-ink sm:text-xl md:text-[22px] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3.5 text-xs sm:text-sm md:text-[14.5px] leading-relaxed text-body group-hover:text-ink transition-colors">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 5. Project Gallery Section */}
      <ProjectGallery />

      {/* 6. Coming Soon Section */}
      <section className="mx-auto max-w-site px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="relative h-[460px] overflow-hidden bg-night md:h-[560px]">
            <img
              src={aboutPage.comingSoon.image}
              alt={aboutPage.comingSoon.imageAlt}
              className="h-full w-full object-cover motion-safe:animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/65 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-12">
              <div className="eyebrow text-gold">{aboutPage.comingSoon.eyebrow}</div>
              <h2 className="mt-4 font-display text-[40px] font-medium leading-none text-white md:text-[64px]">
                {aboutPage.comingSoon.title}
              </h2>
              <p className="mt-4 max-w-[520px] text-base leading-relaxed text-white/80">{aboutPage.comingSoon.text}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </article>
  )
}
