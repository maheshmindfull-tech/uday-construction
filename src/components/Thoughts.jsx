import { thoughts } from '../data/content'

export default function Thoughts() {
  return (
    <section id="thoughts" className="w-full bg-mist">
      <div className="mx-auto flex max-w-site flex-wrap items-center gap-12 px-5 py-20 md:gap-16 lg:gap-20 md:px-10 md:py-28">
        {/* Left Column: Title, Subtitle, and the Dark Thought Box */}
        <div className="min-w-[280px] flex-[1_1_460px]">
          <div className="eyebrow text-sun">{thoughts.eyebrow}</div>
          <h2 className="mt-6 font-display text-[38px] font-medium leading-[1.12] tracking-[-0.01em] md:text-[50px]">
            {thoughts.title}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.75] text-body whitespace-pre-line">
            {thoughts.intro}
          </p>

          {/* Thought Box matching the reference design */}
          <div className="mt-9 rounded-2xl bg-[#141210] p-7 sm:p-9 md:p-10 shadow-2xl border border-brass/25">
            <blockquote className="border-l-[3px] border-brass pl-5 sm:pl-7">
              <p className="font-sans text-xl font-light leading-[1.48] text-white sm:text-2xl md:text-[25px] tracking-[-0.01em]">
                &ldquo;A home is not built from material alone it is built from{' '}
                <span className="italic text-brass font-normal">memory</span>,{' '}
                <span className="italic text-brass font-normal">silence</span>, and the quality of{' '}
                <span className="italic text-brass font-normal">morning light</span>.&rdquo;
              </p>
              <footer className="mt-7 text-xs sm:text-sm font-normal tracking-wide text-white/70">
                &mdash; {thoughts.quote?.author || 'Balasaheb Gaikwad, Founder'}
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Right Column: Original Image */}
        <div className="h-[420px] min-w-[260px] flex-[0_1_460px] overflow-hidden bg-night shadow-xl md:h-[540px]">
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
