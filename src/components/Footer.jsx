import { Link } from 'react-router-dom'
import { company, footer } from '../data/content'

function InstagramIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function YouTubeIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function FacebookIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function renderSocialIcon(type) {
  if (type === 'instagram') return <InstagramIcon />
  if (type === 'youtube') return <YouTubeIcon />
  if (type === 'facebook') return <FacebookIcon />
  return null
}

export default function Footer() {
  const socials = footer.socials || []

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

            {/* Social Media Links under Logo */}
            <div className="mt-7 flex items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-body mr-1">
                Follow Us:
              </span>
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${social.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-cream text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600"
                >
                  {renderSocialIcon(social.type)}
                </a>
              ))}
            </div>
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
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/70">Call</h2>
            <ul className="mt-5 space-y-5">
              {footer.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className="group block">
                    <span className="block text-sm text-body">{phone.label}</span>
                    <span className="mt-1 block text-lg font-medium tracking-[0.02em] text-ink transition-colors group-hover:text-blue-600">
                      {phone.display}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/70">Write</h2>
            <ul className="mt-5 space-y-5">
              {footer.emails.map((email) => (
                <li key={email.address}>
                  <a href={`mailto:${email.address}`} className="group block">
                    <span className="block text-sm text-body">{email.label}</span>
                    <span className="mt-1 block text-sm font-medium text-ink underline decoration-line/80 underline-offset-4 transition-colors group-hover:text-blue-600 group-hover:decoration-blue-500">
                      {email.address}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/70">Explore</h2>
            <ul className="mt-5 space-y-3">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brand/25 pt-6 text-[13px] text-body">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {footer.copyright}</span>
            <span className="hidden sm:inline text-line">&bull;</span>
            <span className="tracking-[0.08em]">Pradhikaran · Nigdi · Pimpri-Chinchwad</span>
          </div>

          {/* Social Media Links in bottom bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-body">Social:</span>
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-ink transition-all hover:border-orange-500 hover:text-orange-600"
                >
                  <span className="text-orange-500">{renderSocialIcon(social.type)}</span>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
