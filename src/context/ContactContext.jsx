import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { projectsPage, contactForm } from '../data/content'

const ContactContext = createContext({ openContact: () => {} })

export function useContact() {
  return useContext(ContactContext)
}

const projectList = projectsPage.items.map((p) => ({
  name: p.name,
  location: p.location,
  typology: p.typology,
  image: p.image,
}))

function ContactModal({ project = '', onClose }) {
  const safeProject = typeof project === 'string' ? project : ''
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: safeProject || '',
  })
  const [status, setStatus] = useState('idle')
  const [formError, setFormError] = useState('')

  // Find initial active index based on passed project name
  const initialIndex = safeProject
    ? projectList.findIndex((p) => p.name.toLowerCase() === safeProject.toLowerCase())
    : 0
  const [activeIndex, setActiveIndex] = useState(initialIndex !== -1 ? initialIndex : 0)

  // Keep project synced if prop updates
  useEffect(() => {
    if (safeProject) {
      setFormData((prev) => ({ ...prev, project: safeProject }))
      const idx = projectList.findIndex((p) => p.name.toLowerCase() === safeProject.toLowerCase())
      if (idx !== -1) setActiveIndex(idx)
    }
  }, [safeProject])

  // Escape key handler and lock body scroll
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

  // Continuous auto-play carousel animation with soft gentle timing
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projectList.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  // When user changes the dropdown project: immediately jump to the project image while keeping animation running
  const handleProjectSelect = (projectName) => {
    setFormData((prev) => ({ ...prev, project: projectName }))
    if (projectName) {
      const idx = projectList.findIndex((p) => p.name === projectName)
      if (idx !== -1) {
        setActiveIndex(idx)
      }
    }
  }

  // When user clicks an indicator bar at the bottom of the image
  const handleIndicatorClick = (idx) => {
    setActiveIndex(idx)
  }

  // Submit enquiry with clear feedback
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!formData.name.trim()) {
      setFormError('Please enter your name.')
      return
    }
    if (!formData.email.trim()) {
      setFormError('Please enter your email address.')
      return
    }
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.')
      return
    }

    setStatus('sending')
    try {
      if (contactForm.endpoint) {
        await fetch(contactForm.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(formData),
        })
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600))
      }
      setStatus('sent')
    } catch {
      setStatus('error')
      setFormError('Something went wrong. Please try again or call sales directly.')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-5 md:p-8 overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      {/* Blurred dark backdrop - explicitly z-0 */}
      <div
        className="fixed inset-0 z-0 bg-black/65 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card - explicitly z-10, fully responsive flex-col on mobile, flex-row on desktop */}
      <div
        className="relative z-10 my-auto w-full max-w-[860px] overflow-hidden bg-white border border-line flex flex-col md:flex-row max-h-[92vh] sm:max-h-[94vh] motion-safe:animate-hero-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close button: top-right corner on both mobile (over image) and desktop (over form) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close enquiry modal"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5 z-30 flex h-8 w-8 sm:h-9 sm:w-9 md:h-auto md:w-auto items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/70 md:rounded-none md:bg-transparent md:text-gray-500 md:hover:text-ink md:p-1 cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Animated Project Showcase (compact on mobile, expansive on desktop) */}
        <div className="relative w-full md:w-1/2 h-[170px] sm:h-[220px] md:h-auto md:min-h-[500px] shrink-0 bg-night overflow-hidden select-none">
          {projectList.map((p, idx) => {
            const isActive = idx === activeIndex
            return (
              <div
                key={p.name}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className={`h-full w-full object-cover transition-transform duration-[4500ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
                {/* Cinematic dark gradients for top and bottom readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />

                {/* Project Watermark / Branding: top-left on mobile to avoid close button, top-right on desktop */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:right-5 md:left-auto md:text-right z-20 text-white transition-opacity duration-700 ease-in-out pr-12 md:pr-0">
                  <div className="flex items-center md:justify-end gap-1.5 text-gold">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">
                      Uday Developers
                    </span>
                  </div>
                  <div className="mt-0.5 font-display text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-white leading-tight">
                    {p.name.replace('Uday ', '')}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium tracking-wider text-white/80 uppercase">
                    {p.location}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Bottom Dash Indicator Bars */}
          <div className="absolute bottom-2.5 sm:bottom-4 md:bottom-5 inset-x-0 z-20 flex items-center justify-center gap-1.5 sm:gap-2">
            {projectList.map((p, idx) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handleIndicatorClick(idx)}
                aria-label={`View ${p.name}`}
                className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ease-in-out cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 sm:w-8 bg-gradient-to-r from-sun to-brand-deep'
                    : 'w-3.5 sm:w-4 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Clean "Enquire Now" Form (scrollable on mobile if needed) */}
        <div className="relative w-full md:w-1/2 p-5 sm:p-7 md:p-9 flex flex-col justify-center bg-white overflow-y-auto">
          {status === 'sent' ? (
            <div className="py-6 sm:py-8 text-center flex flex-col items-center animate-hero-in">
              <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-r from-sun to-brand-deep text-white mb-3 sm:mb-4">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-ink">Thank you!</h3>
              <p className="mt-2 text-xs sm:text-sm text-body max-w-xs leading-relaxed">
                Your enquiry has been received. Our sales advisor will connect with you shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 sm:mt-6 rounded-full border border-line bg-cream px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-ink hover:border-brand-deep hover:text-sun transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              <h2
                id="enquiry-modal-title"
                className="font-sans text-xl sm:text-2xl md:text-[28px] font-medium tracking-tight text-ink pr-10"
              >
                Enquire Now
              </h2>

              <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-gray-800 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter Your Name"
                    className="w-full border border-gray-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 text-base sm:text-sm text-ink placeholder:text-gray-400 focus:border-brand-deep focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-gray-800 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 text-base sm:text-sm text-ink placeholder:text-gray-400 focus:border-brand-deep focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-gray-800 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={14}
                    value={formData.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
                      setFormData({ ...formData, phone: digits })
                    }}
                    placeholder="Enter your 10-digit number"
                    className="w-full border border-gray-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 text-base sm:text-sm text-ink placeholder:text-gray-400 focus:border-brand-deep focus:outline-none transition-colors"
                  />
                </div>

                {/* Interested In */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-gray-800 mb-1">
                    Interested In
                  </label>
                  <div className="relative">
                    <select
                      name="project"
                      value={formData.project}
                      onChange={(e) => handleProjectSelect(e.target.value)}
                      className="w-full appearance-none border border-gray-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 pr-10 text-base sm:text-sm text-ink focus:border-brand-deep focus:outline-none cursor-pointer transition-colors"
                    >
                      <option value="">Select a project</option>
                      {projectList.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                      <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M1 1.5L6 6.5L11 1.5" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Inline Validation Error Notice */}
                {formError && (
                  <p className="text-xs font-semibold text-sun animate-hero-in">
                    {formError}
                  </p>
                )}

                {/* Submit Button */}
                <div className="pt-1.5 sm:pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full rounded-full border border-brand-deep bg-gradient-to-r from-sun to-brand-deep hover:from-brand-deep hover:to-brand-deeper text-white font-bold text-xs uppercase tracking-[0.18em] py-3 sm:py-3.5 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    {status === 'sending' ? (
                      <>
                        <span>Submitting…</span>
                        <svg
                          className="h-4 w-4 animate-spin text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                      </>
                    ) : (
                      'Submit Enquiry'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function ContactProvider({ children }) {
  const [state, setState] = useState({ open: false, project: '' })
  const openContact = useCallback((project = '') => {
    const projectName = typeof project === 'string' ? project : ''
    setState({ open: true, project: projectName })
  }, [])
  const closeContact = useCallback(() => setState((s) => ({ ...s, open: false })), [])

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      {state.open && <ContactModal project={state.project} onClose={closeContact} />}
    </ContactContext.Provider>
  )
}
