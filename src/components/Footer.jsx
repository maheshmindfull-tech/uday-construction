import { Link } from 'react-router-dom'
import { company, footer } from '../data/content'

export default function Footer() {
  return (
    <footer id="contact" className="bg-white text-ink border-t border-line">
      <div className="h-1 w-full bg-gradient-to-r from-sun via-brand to-gold" />

      <div className="mx-auto max-w-site px-5 pb-10 pt-14 md:px-10 md:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-brand/25 pb-10">
          <div className="max-w-md">
            <Link to="/" aria-label={`${company.name} home`} className="inline-block transition-opacity hover:opacity-90">
              <img src={company.logo} alt={company.name} className="h-16 w-auto object-contain md:h-20" />
            </Link>
            <p className="mt-6 text-[15px] leading-relaxed text-body">{footer.blurb}</p>
          </div>
          <p className="font-display text-3xl leading-none text-sun md:text-4xl">{footer.since}</p>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-sun">Visit</h2>
            <ul className="mt-5 space-y-6">
              {footer.offices.map((office) => (
                <li key={office.title}>
                  <p className="text-sm font-semibold text-ink">{office.title}</p>
                  {office.lines.map((line) => (
                    <p key={line} className="mt-1 text-sm leading-relaxed text-body">
                      {line}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-sun">Call</h2>
            <ul className="mt-5 space-y-5">
              {footer.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className="group block">
                    <span className="block text-sm text-body">{phone.label}</span>
                    <span className="mt-1 block text-lg font-light tracking-[0.02em] text-ink transition-colors group-hover:text-sun">
                      {phone.display}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-sun">Write</h2>
            <ul className="mt-5 space-y-5">
              {footer.emails.map((email) => (
                <li key={email.address}>
                  <a href={`mailto:${email.address}`} className="group block">
                    <span className="block text-sm text-body">{email.label}</span>
                    <span className="mt-1 block text-sm text-ink underline decoration-brand/50 underline-offset-4 transition-colors group-hover:text-sun">
                      {email.address}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-sun">Explore</h2>
            <ul className="mt-5 space-y-3">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-sun"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand/25 pt-6 text-[13px] text-body">
          <span>© {footer.copyright}</span>
          <span className="tracking-[0.08em]">Pradhikaran · Nigdi · Pimpri-Chinchwad</span>
        </div>
      </div>
    </footer>
  )
}
