import { useEffect, useState } from 'react'
import { footer, projectsPage } from '../data/content'
import Reveal from '../components/Reveal'
import Ticker from '../components/Ticker'
import Typewriter from '../components/Typewriter'
import EnquiryForm from '../components/EnquiryForm'
import { useContact } from '../context/ContactContext'

const badgeStyles = {
  Ongoing: 'bg-gradient-to-r from-sun to-brand-deep text-white',
  Completed: 'bg-ink text-white',
  'Coming Soon': 'bg-white text-sun',
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}

function ProjectCard({ project, number }) {
  const upcoming = project.status === 'Coming Soon'
  const { openContact } = useContact()

  return (
    <article
      id={project.slug}
      className="group flex h-full scroll-mt-28 flex-col overflow-hidden border border-line bg-white transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-[260px] overflow-hidden bg-night">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <span className={`absolute left-4 top-4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${badgeStyles[project.status]}`}>
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm text-body">
            <span className="text-sun"><PinIcon /></span>
            {project.location}
          </p>
          <span className="font-number text-xs font-medium tracking-[0.2em] text-sun">{number}</span>
        </div>
        <h2 className="mt-3 font-display text-[30px] font-medium leading-[1.1]">{project.name}</h2>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-body">{project.typology}</p>
        <p className="mt-4 flex-1 text-[15px] leading-[1.7] text-body">{project.text}</p>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              openContact(project.name)
            }}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:text-sun cursor-pointer active:scale-95"
          >
            {upcoming ? 'Register interest' : 'Enquire now'}
            <ArrowIcon />
          </button>
          {!upcoming && (
            <a href={footer.phones[0].href} className="text-[11px] font-bold uppercase tracking-[0.16em] text-body transition-colors hover:text-sun">
              Call sales
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All')
  const { hero, filters, items, visit } = projectsPage
  const visible = filter === 'All' ? items : items.filter((p) => p.status === filter)

  useEffect(() => {
    document.title = 'Projects — Uday Developers'
    return () => {
      document.title = 'Uday Developers'
    }
  }, [])

  return (
    <article className="w-full">
      <section className="relative min-h-[500px] w-full overflow-hidden bg-night py-24 pt-36 md:min-h-[580px] md:py-32 md:pt-44">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center md:object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-ember/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/35 via-transparent to-transparent" />

        <div className="relative mx-auto flex max-w-site flex-col justify-center px-5 md:px-10">
          <div className="eyebrow text-gold">{hero.eyebrow}</div>

          <div className="mt-6 flex min-h-[105px] items-center sm:mt-8 sm:min-h-[145px] md:min-h-[175px] lg:min-h-[205px]">
            <Typewriter lines={hero.typeLines} />
          </div>

          <p className="mt-6 max-w-2xl font-display text-xl font-normal leading-relaxed text-cream md:mt-8 md:text-2xl lg:text-[28px]">
            {hero.text}
          </p>
        </div>
      </section>

      <Ticker />

      <section aria-label="Project listing" className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <Reveal>
              <div className="eyebrow text-sun">Our portfolio</div>
              <h2 className="section-title mt-5">Find your address</h2>
            </Reveal>
            <div role="group" aria-label="Filter projects by status" className="flex flex-wrap gap-2.5">
              {filters.map((f) => {
                const count = f === 'All' ? items.length : items.filter((p) => p.status === f).length
                const active = filter === f
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className={`rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-r from-sun to-brand-deep text-white'
                        : 'border border-line bg-white text-body hover:border-brand-deep hover:text-sun'
                    }`}
                  >
                    {f} <span className={active ? 'text-white/80' : 'text-body/60'}>({count})</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
            {visible.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 80} className="h-full">
                <ProjectCard project={project} number={String(items.indexOf(project) + 1).padStart(2, '0')} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label={visit.eyebrow} className="w-full border-t border-line bg-white">
        <div className="mx-auto flex max-w-site flex-wrap items-start justify-between gap-12 px-5 py-16 md:px-10 md:py-24">
          <Reveal className="min-w-[280px] flex-[1_1_360px] lg:max-w-md">
            <div className="eyebrow text-sun">{visit.eyebrow}</div>
            <h2 className="mt-5 font-display text-[36px] font-medium leading-[1.1] md:text-[48px]">{visit.title}</h2>
            <p className="mt-5 text-base leading-[1.75] text-body">{visit.text}</p>
            <div className="mt-9 space-y-4">
              {footer.phones.map((phone) => (
                <a key={phone.href} href={phone.href} className="group flex items-baseline justify-between gap-6 border-b border-line pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-body">{phone.label}</span>
                  <span className="text-lg font-light tracking-[0.02em] text-ink transition-colors group-hover:text-sun">{phone.display}</span>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="min-w-[300px] flex-[1_1_520px]">
            <div id="site-visit-form" className="scroll-mt-28 border border-line bg-white/80 p-6 backdrop-blur-sm sm:p-8 md:p-10">
              <EnquiryForm showVisitDate submitLabel="Book a site visit" />
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  )
}
