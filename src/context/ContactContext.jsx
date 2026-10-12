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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: project || '',
    whatsapp: true,
    call: false,
  })
  const [status, setStatus] = useState('idle')

  // Find initial active index based on passed project name
  const initialIndex = project
    ? projectList.findIndex((p) => p.name.toLowerCase() === project.toLowerCase())
    : 0
  const [activeIndex, setActiveIndex] = useState(initialIndex !== -1 ? initialIndex : 0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(!project)
  const [isHovered, setIsHovered] = useState(false)

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

  // Auto-play timer for image carousel animation
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projectList.length)
    }, 3800)

    return () => clearInterval(timer)
  }, [isAutoPlaying, isHovered])

  // When user changes the dropdown project
  const handleProjectSelect = (projectName) => {
    setFormData((prev) => ({ ...prev, project: projectName }))
    if (projectName) {
      const idx = projectList.findIndex((p) => p.name === projectName)
      if (idx !== -1) {
        setActiveIndex(idx)
        setIsAutoPlaying(false) // Focus on user-chosen project
      }
    } else {
      setIsAutoPlaying(true) // Resume cycling if "Select a project" is re-selected
    }
  }

  // When user clicks an indicator bar at the bottom of the image
  const handleIndicatorClick = (idx) => {
    setActiveIndex(idx)
    const selectedItem = projectList[idx]
    if (selectedItem) {
      setFormData((prev) => ({ ...prev, project: selectedItem.name }))
    }
    setIsAutoPlaying(false)
  }

  // Submit enquiry
  const handleSubmit = async (e) => {
    e.preventDefault()
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
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      {/* Blurred dark backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative my-auto w-full max-w-[860px] overflow-hidden bg-white border border-line flex flex-col md:flex-row min-h-[500px] max-h-[94vh] motion-safe:animate-hero-in">
        {/* Left Side: Animated Project Showcase with Indicator Bars */}
        <div
          className="relative w-full md:w-1/2 min-h-[260px] md:min-h-[500px] bg-night overflow-hidden select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {projectList.map((p, idx) => {
            const isActive = idx === activeIndex
            return (
              <div
                key={p.name}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover"
                />
                {/* Cinematic dark gradients for top and bottom readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />

                {/* Top Right Project Watermark / Branding (inspired by screenshot) */}
                <div className="absolute top-5 right-5 z-20 text-right text-white">
                  <div className="flex items-center justify-end gap-1.5 text-gold">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      Uday Developers
                    </span>
                  </div>
                  <div className="mt-0.5 font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                    {p.name.replace('Uday ', '')}
                  </div>
                  <div className="text-[11px] font-medium tracking-wider text-white/80 uppercase">
                    {p.location}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Bottom Dash Indicator Bars (Active bar highlighted in lime like screenshot) */}
          <div className="absolute bottom-5 inset-x-0 z-20 flex items-center justify-center gap-2">
            {projectList.map((p, idx) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handleIndicatorClick(idx)}
                aria-label={`View ${p.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-8 bg-[#b4cd34]'
                    : 'w-4 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Clean "Enquire Now" Form */}
        <div className="relative w-full md:w-1/2 p-6 sm:p-8 md:p-9 flex flex-col justify-center bg-white overflow-y-auto">
          {/* Close button "✕" at top right */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry modal"
            className="absolute right-5 top-5 p-1 text-gray-500 hover:text-ink transition-colors"
          >
            <svg
              width="22"
              height="22"
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

          {status === 'sent' ? (
            <div className="py-6 text-center flex flex-col items-center animate-hero-in">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#b4cd34] text-ink mb-4">
                <svg
                  width="24"
                  height="24"
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
              <h3 className="font-sans text-2xl font-bold text-ink">Thank you!</h3>
              <p className="mt-2 text-sm text-body max-w-xs leading-relaxed">
                Your enquiry has been received. Our sales advisor will connect with you via{' '}
                {formData.whatsapp ? 'WhatsApp' : 'phone call'} shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full border border-line bg-cream px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-ink hover:border-brand-deep hover:text-sun transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              <h2
                id="enquiry-modal-title"
                className="font-sans text-2xl sm:text-[28px] font-medium tracking-tight text-ink pr-8"
              >
                Enquire Now
              </h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-[13px] font-semibold text-gray-800 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter Your Name"
                    className="w-full border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-gray-400 focus:border-brand-deep focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[13px] font-semibold text-gray-800 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-gray-400 focus:border-brand-deep focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone Number with inline Whatsapp / Call options */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[13px] font-semibold text-gray-800">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.whatsapp}
                          onChange={(e) =>
                            setFormData({ ...formData, whatsapp: e.target.checked })
                          }
                          className="h-3.5 w-3.5 rounded border-gray-300 text-brand-deep accent-blue-600 cursor-pointer"
                        />
                        <span className="text-[12px] text-gray-700">Whatsapp</span>
                      </label>
                      <span className="text-gray-300">|</span>
                      <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.call}
                          onChange={(e) =>
                            setFormData({ ...formData, call: e.target.checked })
                          }
                          className="h-3.5 w-3.5 rounded border-gray-300 text-brand-deep accent-blue-600 cursor-pointer"
                        />
                        <span className="text-[12px] text-gray-700">Call</span>
                      </label>
                      <span
                        title="Select your preferred communication channels"
                        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-[10px] text-gray-500 cursor-help"
                      >
                        i
                      </span>
                    </div>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={10}
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
                      setFormData({ ...formData, phone: digits })
                    }}
                    placeholder="Enter your 10-digit number"
                    className="w-full border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-gray-400 focus:border-brand-deep focus:outline-none transition-colors"
                  />
                </div>

                {/* Interested In */}
                <div>
                  <label className="block text-[13px] font-semibold text-gray-800 mb-1">
                    Interested In
                  </label>
                  <div className="relative">
                    <select
                      name="project"
                      value={formData.project}
                      onChange={(e) => handleProjectSelect(e.target.value)}
                      className="w-full appearance-none border border-gray-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-ink focus:border-brand-deep focus:outline-none cursor-pointer transition-colors"
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

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-[#b4cd34] hover:bg-[#a2ba2c] text-ink font-bold text-sm py-3 transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <>
                        <span>Submitting…</span>
                        <svg
                          className="h-4 w-4 animate-spin text-ink"
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
                      'Submit'
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
  const openContact = useCallback((project = '') => setState({ open: true, project }), [])
  const closeContact = useCallback(() => setState((s) => ({ ...s, open: false })), [])

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      {state.open && <ContactModal project={state.project} onClose={closeContact} />}
    </ContactContext.Provider>
  )
}
