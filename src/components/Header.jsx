import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { company, navLinks, footer } from '../data/content'
import { useContact } from '../context/ContactContext'

export default function Header() {
  const { openContact } = useContact()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Track scroll state for sleek compressed navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-white/95 py-2 backdrop-blur-md md:py-2.5'
          : 'border-b border-line/70 bg-white/90 py-2.5 backdrop-blur-md md:py-3'
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-5 md:px-10">
        {/* Transparent, Proportional Logo */}
        <Link
          to="/"
          aria-label={`${company.name} home`}
          className="group flex items-center transition-opacity hover:opacity-90"
        >
          <img
            src={company.logo}
            alt={company.name}
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 md:h-11"
          />
        </Link>

        {/* Desktop Navigation Tabs */}
        <nav aria-label="Main Navigation" className="hidden items-center gap-7 md:flex lg:gap-9">
          <ul className="flex items-center gap-7 lg:gap-8">
            {navLinks
              .filter((link) => !link.isButton)
              .map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href)

                return (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className={`relative py-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 lg:text-xs ${
                        isActive
                          ? 'text-blue-600 font-bold'
                          : 'text-ink/80 hover:text-blue-600'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-blue-600" />
                      )}
                    </Link>
                  </li>
                )
              })}
          </ul>

          {/* Contact Us (Button) - Slim & Refined */}
          {navLinks
            .filter((link) => link.isButton)
            .map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  openContact()
                }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-600 bg-blue-600 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-blue-700 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm hover:shadow-md"
              >
                <span>{btn.label}</span>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ))}
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2.5 md:hidden">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              openContact()
            }}
            className="rounded-full border border-blue-600 bg-blue-600 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-700 cursor-pointer active:scale-95 shadow-sm"
          >
            Enquire Now
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-sand"
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="border-b border-line bg-white px-6 py-5 md:hidden"
        >
          <ul className="space-y-3.5">
            {navLinks.map((link) => {
              if (link.isButton) {
                return (
                  <li key={link.label} className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpen(false)
                        setTimeout(() => {
                          openContact()
                        }, 80)
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-blue-600 bg-blue-600 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-blue-700 cursor-pointer active:scale-95 shadow-sm"
                    >
                      <span>{link.label}</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </li>
                )
              }

              const isActive =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)

              return (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                      isActive ? 'text-blue-600 font-bold' : 'text-ink/80 hover:text-blue-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Social Links inside Mobile Drawer */}
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-body">
              Follow Us:
            </span>
            <div className="flex items-center gap-2">
              {footer.socials?.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line bg-sand px-2.5 py-1 text-[11px] font-semibold text-ink transition-colors hover:border-orange-500 hover:text-orange-600"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
