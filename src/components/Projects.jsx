import { Link } from 'react-router-dom'
import { projects } from '../data/content'

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-site px-4 sm:px-6 md:px-10 2xl:px-16 py-16 sm:py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="eyebrow">{projects.eyebrow}</div>
          <h2 className="section-title mt-4 sm:mt-5">{projects.title}</h2>
        </div>
        <Link
          to={projects.allHref}
          className="inline-flex h-11 sm:h-12 items-center gap-3 rounded-full border-[1.5px] border-orange-600 bg-orange-600 px-5 sm:px-7 text-xs sm:text-[13px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-orange-700 hover:border-orange-700 shadow-sm hover:shadow-md"
        >
          {projects.allLabel}
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M0 5h17M13 1l4 4-4 4" /></svg>
        </Link>
      </div>

      <ul className="mt-10 sm:mt-14 flex flex-wrap gap-6 sm:gap-8">
        {projects.items.map((p) => (
          <li key={p.name} className="min-w-[min(100%,260px)] flex-[1_1_300px]">
            <Link to={p.href} className="group block">
              <div className="relative h-[280px] sm:h-[340px] md:h-[380px] overflow-hidden bg-night">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-2 border border-white/25 bg-black/60 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md shadow-sm">
                  {p.status === 'Ongoing' ? (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                  ) : p.status === 'Completed' ? (
                    <span className="h-2 w-2 rounded-full bg-blue-400" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                  )}
                  <span>{p.status}</span>
                </div>
              </div>
              <h3 className="mt-4 sm:mt-5 font-display text-2xl sm:text-[30px] font-medium transition-all duration-200 group-hover:text-black group-hover:scale-[1.02] origin-left">{p.name}</h3>
              <p className="mt-1 text-sm text-body">{p.location}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
