import { Link } from 'react-router-dom'
import { about } from '../data/content'

export default function About() {
  return (
    <section id="about" className="mx-auto flex max-w-site flex-wrap items-center gap-12 px-5 pb-20 pt-24 md:gap-20 md:px-10 md:pb-24 md:pt-32">
      <div className="h-[420px] min-w-[260px] flex-[0_1_420px] self-start overflow-hidden bg-night md:sticky md:top-8 md:h-[560px]">
        <img src={about.image} alt={about.imageAlt} className="h-full w-full object-cover object-[45%_center]" />
      </div>

      <div className="min-w-[280px] flex-[1_1_420px]">
        <div className="eyebrow">{about.eyebrow}</div>
        <h2 className="section-title mt-6">{about.title}</h2>
        {about.paragraphs.map((text, i) => (
          <p key={text} className={`text-base leading-[1.75] text-body md:text-[17px] ${i === 0 ? 'mt-7' : 'mt-4'}`}>
            {text}
          </p>
        ))}
        <Link
          to={about.linkHref}
          className="mt-9 inline-flex items-center gap-3 border-b-[1.5px] border-ink pb-1.5 text-[13px] font-bold uppercase tracking-[0.16em] transition-colors hover:border-brass-dark hover:text-brass-dark"
        >
          {about.linkLabel}
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M0 5h17M13 1l4 4-4 4" /></svg>
        </Link>
      </div>
    </section>
  )
}
