import { thoughts } from '../data/content'

export default function Thoughts() {
  return (
    <section id="thoughts" className="w-full bg-white">
      <div className="site-pad mx-auto flex max-w-site flex-wrap items-center gap-10 sm:gap-12 md:gap-16 lg:gap-20 py-16 sm:py-20 md:py-28">
        {/* Left Column: Title, Subtitle, and the Thought Box */}
        <div className="min-w-[min(100%,280px)] flex-[1_1_28.75rem]">
          <div className="eyebrow text-sun">{thoughts.eyebrow}</div>
          <h2 className="mt-4 sm:mt-6 font-display text-[26px] min-[360px]:text-[32px] sm:text-[38px] font-medium leading-[1.12] tracking-[-0.01em] md:text-[3.125rem]">
            {thoughts.title}
          </h2>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[1.0625rem] leading-[1.75] text-body whitespace-pre-line">
            {thoughts.intro}
          </p>

          {/* Thought Box matching the reference design */}
          <div className="mt-7 sm:mt-9 border border-line bg-white p-5 sm:p-9 md:p-10">
            <blockquote className="border-l-[3px] border-brand pl-4 sm:pl-7">
              <p className="font-sans text-lg sm:text-2xl md:text-[1.5625rem] font-light leading-[1.48] text-ink tracking-[-0.01em]">
                &ldquo;A home is not built from material alone it is built from{' '}
                <span className="italic text-brand font-normal">memory</span>,{' '}
                <span className="italic text-brand font-normal">silence</span>, and the quality of{' '}
                <span className="italic text-brand font-normal">morning light</span>.&rdquo;
              </p>
              <footer className="mt-5 sm:mt-7 text-xs sm:text-sm font-normal tracking-wide text-body">
                &mdash; {thoughts.quote?.author || 'Balasaheb Gaikwad, Founder'}
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Right Column: Original Image */}
        <div className="h-[280px] sm:h-[380px] md:h-[33.75rem] 4xl:h-[38rem] min-w-[min(100%,260px)] flex-[0_1_28.75rem] 4xl:flex-[0_1_33rem] overflow-hidden bg-night">
          <img
            src={thoughts.image}
            alt={thoughts.imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  )
}
