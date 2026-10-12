import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { contactForm, footer } from '../data/content'
import EnquiryForm from '../components/EnquiryForm'

const ContactContext = createContext({ openContact: () => {} })

export function useContact() {
  return useContext(ContactContext)
}

function ContactModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 md:p-8" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <div className="absolute inset-0 bg-night/55 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative my-auto flex w-full max-w-4xl flex-col overflow-hidden bg-white shadow-2xl motion-safe:animate-hero-in md:flex-row">
        <div className="h-1 w-full bg-gradient-to-r from-sun via-brand to-gold md:hidden" />

        <aside className="hidden flex-[0_0_300px] flex-col justify-between bg-neutral-50 p-8 md:flex border-r border-line">
          <div>
            <div className="eyebrow text-sun">Contact us</div>
            <p className="mt-6 text-[15px] leading-relaxed text-body">{contactForm.text}</p>
          </div>
          <div className="space-y-5">
            {footer.phones.map((phone) => (
              <a key={phone.href} href={phone.href} className="group block">
                <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-body">{phone.label}</span>
                <span className="mt-1 block text-lg font-light tracking-[0.02em] text-ink transition-colors group-hover:text-sun">{phone.display}</span>
              </a>
            ))}
            <a href={`mailto:${footer.emails[0].address}`} className="block text-sm text-ink underline decoration-brand/50 underline-offset-4 transition-colors hover:text-sun">
              {footer.emails[0].address}
            </a>
          </div>
        </aside>

        <div className="relative flex-1 p-6 sm:p-8 md:p-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact form"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand-deep hover:text-sun"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <h2 id="contact-modal-title" className="pr-10 font-display text-[34px] font-medium leading-[1.1] md:text-[40px]">
            {contactForm.title}
          </h2>
          <div className="mt-7">
            <EnquiryForm defaultProject={project} autoFocus />
          </div>
        </div>
      </div>
    </div>
  )
}

export function ContactProvider({ children }) {
  const [state, setState] = useState({ open: false, project: '' })
  const openContact = useCallback((project = '') => setState({ open: true, project }), [])
  const closeContact = useCallback(() => setState((s) => ({ ...s, open: false })), [])

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      {state.open && <ContactModal project={state.project} onClose={closeContact} />}
    </ContactContext.Provider>
  )
}
