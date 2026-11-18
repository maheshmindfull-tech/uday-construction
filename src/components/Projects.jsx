import { Link } from 'react-router-dom'
import { projects } from '../data/content'

export default function Projects() {
  return (
    <section id="projects" className="site-pad mx-auto max-w-site py-16 sm:py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="eyebrow">{projects.eyebrow}</div>
          <h2 className="section-title mt-4 sm:mt-5">{projects.title}</h2>
        </div>
        <Link
          to={projects.allHref}
          className="inline-flex h-11 sm:h-12 items-center gap-3 rounded-full border-[1.5px] border-orange-600 bg-orange-600 px-5 sm:px-7 text-xs sm:text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-orange-700 hover:border-orange-700"
        >
          {projects.allLabel}
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M0 5h17M13 1l4 4-4 4" /></svg>
        </Link>
      </div>

      <ul className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.items.map((p) => (
          <li key={p.name}>
            <Link to={p.href} className="group block">
              <div className="relative h-[280px] sm:h-[340px] md:h-[23.75rem] 4xl:h-[26rem] overflow-hidden bg-night">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-2 border border-white/25 bg-black/60 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  {p.status === 'Ongoing' ? (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                  ) : p.status === 'Completed' ? (
                    <span className="h-2 w-2 rounded-full bg-zinc-300" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                  )}
                  <span>{p.status}</span>
                </div>
              </div>
              <h3 className="mt-4 sm:mt-5 font-display text-2xl sm:text-[1.875rem] font-medium transition-colors duration-200 group-hover:text-black">{p.name}</h3>
              <p className="mt-1 text-sm text-body">{p.location}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
