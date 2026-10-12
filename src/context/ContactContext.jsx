import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { projectsPage } from '../data/content'
import EnquiryForm from '../components/EnquiryForm'

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
  const [selectedProject, setSelectedProject] = useState(safeProject || '')

  // Find initial active index based on passed project name
  const initialIndex = safeProject
    ? projectList.findIndex((p) => p.name.toLowerCase() === safeProject.toLowerCase())
    : 0
  const [activeIndex, setActiveIndex] = useState(initialIndex !== -1 ? initialIndex : 0)

  // Strict pointer-down guard to prevent mobile phantom tap dismissals
  const isBackdropPointerDownRef = useRef(false)
  const [canClose, setCanClose] = useState(false)

  useEffect(() => {
    // 350ms lock on mounting ensures mobile tap gestures (touchstart -> touchend -> simulated click) cannot dismiss modal
    const t = setTimeout(() => setCanClose(true), 350)
    return () => clearTimeout(t)
  }, [])

  // Keep project synced if prop updates
  useEffect(() => {
    if (safeProject) {
      setSelectedProject(safeProject)
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

  // When user changes the dropdown project in EnquiryForm: immediately jump to project image
  const handleProjectSelect = (projectName) => {
    setSelectedProject(projectName)
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
    const item = projectList[idx]
    if (item) {
      setSelectedProject(item.name)
    }
  }

  // Only consider as backdrop press if interaction started directly on the backdrop container
  const handleBackdropPointerDown = (e) => {
    isBackdropPointerDownRef.current = e.target === e.currentTarget
  }

  // Only close if BOTH pointerdown AND click occurred on the backdrop, and grace period passed
  const handleOverlayClick = (e) => {
    if (canClose && isBackdropPointerDownRef.current && e.target === e.currentTarget) {
      onClose()
    }
    isBackdropPointerDownRef.current = false
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-2.5 sm:p-5 md:p-8 overflow-y-auto overscroll-contain bg-black/75 backdrop-blur-sm"
      onPointerDown={handleBackdropPointerDown}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      {/* Modal Dialog Card - explicitly stops click bubbling and cursor-default */}
      <div
        className="relative z-10 w-full max-w-[860px] my-3 sm:my-auto bg-white border border-line flex flex-col md:flex-row shadow-none motion-safe:animate-hero-in cursor-default"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Floating Close button: top-right corner on both mobile (over image) and desktop (over form) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          aria-label="Close enquiry modal"
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 md:top-4 md:right-4 z-40 flex h-9 w-9 sm:h-9 sm:w-9 md:h-auto md:w-auto items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/85 md:rounded-none md:bg-transparent md:text-gray-500 md:hover:text-ink md:p-1 cursor-pointer"
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

                {/* Project Watermark / Branding */}
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

        {/* Right Side: Linked EnquiryForm component */}
        <div className="relative w-full md:w-1/2 p-5 sm:p-7 md:p-9 flex flex-col justify-center bg-white overflow-y-auto">
          <EnquiryForm
            inModal
            defaultProject={selectedProject}
            onProjectChange={handleProjectSelect}
            onClose={onClose}
          />
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
