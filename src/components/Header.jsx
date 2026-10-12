import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { company, navLinks } from '../data/content'
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
          ? 'border-b border-line bg-cream/95 py-2 shadow-[0_6px_24px_rgba(226,57,17,0.08)] backdrop-blur-md md:py-2.5'
          : 'border-b border-line/70 bg-cream/90 py-2.5 backdrop-blur-md md:py-3'
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
                          ? 'text-sun'
                          : 'text-ink/75 hover:text-sun'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-sun to-brass" />
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
                onClick={() => openContact()}
                className="inline-flex items-center gap-2 rounded-full border border-brass bg-brass px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-sm transition-all duration-300 hover:border-brass-dark hover:bg-brass-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
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
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/contact"
            className="rounded-full border border-brass bg-brass px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white"
          >
            Contact
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-peach"
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
          className="border-b border-line bg-cream px-6 py-5 shadow-xl md:hidden"
        >
          <ul className="space-y-3.5">
            {navLinks.map((link) => {
              if (link.isButton) {
                return (
                  <li key={link.label} className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false)
                        openContact()
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-brass bg-brass py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-md transition-colors hover:bg-brass-dark"
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
                      isActive ? 'text-sun' : 'text-ink/75 hover:text-sun'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
