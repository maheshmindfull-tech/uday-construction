import { useEffect, useState } from 'react'
import { footer, projectsPage } from '../data/content'
import Reveal from '../components/Reveal'
import Ticker from '../components/Ticker'
import Typewriter from '../components/Typewriter'
import EnquiryForm from '../components/EnquiryForm'
import { useContact } from '../context/ContactContext'

function StatusBadge({ status }) {
  if (status === 'Ongoing') {
    return (
      <div className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-2 border border-white/25 bg-black/60 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span>Ongoing</span>
      </div>
    )
  }

  if (status === 'Completed') {
    return (
      <div className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-2 border border-white/25 bg-black/60 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md shadow-sm">
        <span className="h-2 w-2 rounded-full bg-zinc-300" />
        <span>Completed</span>
      </div>
    )
  }

  return (
    <div className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-2 border border-white/25 bg-black/60 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md shadow-sm">
      <span className="h-2 w-2 rounded-full bg-amber-400" />
      <span>Coming Soon</span>
    </div>
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
      <div className="relative h-[240px] sm:h-[16.25rem] 3xl:h-[18.5rem] 4xl:h-[20rem] overflow-hidden bg-night">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <StatusBadge status={project.status} />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-body">
            <span className="shrink-0 text-sun"><PinIcon /></span>
            <span>{project.location}</span>
          </p>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${project.status === 'Ongoing'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : project.status === 'Completed'
                ? 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'Ongoing'
                ? 'bg-emerald-500'
                : project.status === 'Completed'
                  ? 'bg-zinc-500'
                  : 'bg-amber-500'
                }`} />
              {project.status}
            </span>
            <span className="font-number text-xs font-medium tracking-[0.2em] text-sun">{number}</span>
          </div>
        </div>
        <h2 className="mt-3 font-display text-2xl sm:text-[1.875rem] font-medium leading-[1.12]">{project.name}</h2>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-body">{project.typology}</p>
        <p className="mt-3.5 sm:mt-4 flex-1 text-sm sm:text-[15px] leading-[1.7] text-body">{project.text}</p>

        <div className="mt-5 sm:mt-6 flex items-center justify-between border-t border-line pt-4 sm:pt-5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              openContact(project.name)
            }}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-body transition-colors hover:text-black cursor-pointer"
          >
            {upcoming ? 'Register interest' : 'Enquire now'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState('Ongoing')
  const { hero, filters, items, visit } = projectsPage
  const visible = items.filter((p) => p.status === filter)

  useEffect(() => {
    document.title = 'Projects — Uday Construction'
    return () => {
      document.title = 'Uday Construction'
    }
  }, [])

  return (
    <article className="w-full">
      <section className="relative min-h-[460px] sm:min-h-[500px] w-full overflow-hidden bg-night py-20 pt-32 sm:py-24 sm:pt-36 md:min-h-[36.25rem] 4xl:min-h-[40rem] md:py-32 md:pt-44">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center md:object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-ember/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/35 via-transparent to-transparent" />

        <div className="site-pad relative mx-auto flex max-w-site flex-col justify-center">
          <div className="eyebrow text-gold">{hero.eyebrow}</div>

          <div className="mt-5 flex min-h-[85px] min-[390px]:min-h-[100px] items-center sm:mt-8 sm:min-h-[130px] md:min-h-[165px] lg:min-h-[195px]">
            <Typewriter lines={hero.typeLines} />
          </div>

          <p className="mt-5 sm:mt-6 max-w-2xl 3xl:max-w-3xl font-display text-lg sm:text-xl font-normal leading-relaxed text-cream md:mt-8 md:text-2xl lg:text-[1.75rem]">
            {hero.text}
          </p>
        </div>
      </section>

      <Ticker />

      <section aria-label="Project listing" className="w-full bg-white py-16 sm:py-20 md:py-28">
        <div className="site-pad mx-auto max-w-site">
          <div className="flex flex-wrap items-end justify-between gap-5 sm:gap-6 border-b border-line pb-7 sm:pb-8">
            <Reveal>
              <div className="eyebrow text-sun">Our portfolio</div>
              <h2 className="section-title mt-4 sm:mt-5">Find your address</h2>
            </Reveal>
            <div role="group" aria-label="Filter projects by status" className="flex flex-wrap gap-2 sm:gap-2.5">
              {filters.map((f) => {
                const count = items.filter((p) => p.status === f).length
                const active = filter === f
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className={`rounded-full px-3.5 sm:px-5 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] transition-colors duration-200 ${active
                      ? 'bg-ink text-white border border-ink'
                      : 'border border-line bg-white text-body hover:border-ink hover:text-black'
                      }`}
                  >
                    {f} <span className={active ? 'text-white/80' : 'text-body/60'}>({count})</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
            {visible.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 80} className="h-full">
                <ProjectCard project={project} number={String(items.indexOf(project) + 1).padStart(2, '0')} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label={visit.eyebrow} className="w-full border-t border-line bg-white">
        <div className="site-pad mx-auto flex max-w-site flex-wrap items-start justify-between gap-10 sm:gap-12 py-16 md:py-24">
          <Reveal className="min-w-[min(100%,280px)] flex-[1_1_360px] lg:max-w-md">
            <div className="eyebrow text-sun">{visit.eyebrow}</div>
            <h2 className="mt-4 sm:mt-5 font-display text-[30px] sm:text-[36px] font-medium leading-[1.1] md:text-[3rem]">{visit.title}</h2>
            <p className="mt-4 sm:mt-5 text-base leading-[1.75] text-body">{visit.text}</p>
            <div className="mt-8 sm:mt-9 space-y-4">
              {footer.emails.map((email) => (
                <a key={email.address} href={`mailto:${email.address}`} className="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-body">{email.label}</span>
                  <span className="inline-block break-all sm:break-normal text-sm sm:text-base font-medium text-body transition-colors duration-200 group-hover:text-black">{email.address}</span>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="min-w-[min(100%,280px)] flex-[1_1_520px]">
            <div id="site-visit-form" className="scroll-mt-28 border border-line bg-white/80 p-4 sm:p-8 md:p-10 backdrop-blur-sm">
              <EnquiryForm showVisitDate submitLabel="Book a site visit" />
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  )
}
