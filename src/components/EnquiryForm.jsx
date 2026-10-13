import { useState, useEffect } from 'react'
import { contactForm, projectsPage } from '../data/content'

const inputClass =
  'w-full border border-gray-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 text-base sm:text-sm text-ink placeholder:text-gray-400 focus:border-brand-deep focus:outline-none transition-colors'

const inlineInputClass =
  'mt-2 w-full border border-line bg-white px-4 py-3 text-base sm:text-[15px] text-ink placeholder:text-body/50 transition-colors focus:border-brand-deep focus:outline-none focus:ring-2 focus:ring-brand/20'

const labelClass = 'block text-[11px] font-bold uppercase tracking-[0.16em] text-body'

const projectOptions = projectsPage.items.map((p) => p.name)

async function submitEnquiry(data) {
  if (!contactForm?.endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return
  }
  const res = await fetch(contactForm.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Request failed')
}

export default function EnquiryForm({
  defaultProject = '',
  onProjectChange,
  showVisitDate = false,
  submitLabel = 'Submit Enquiry',
  autoFocus = false,
  inModal = false,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: defaultProject || '',
    message: '',
    visitDate: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (defaultProject) {
      setFormData((prev) => ({ ...prev, project: defaultProject }))
    }
  }, [defaultProject])

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage('')

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.')
      return
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.')
      return
    }
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.')
      return
    }

    setStatus('sending')
    try {
      await submitEnquiry(formData)
      setStatus('sent')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again or call us directly.')
    }
  }

  // --- Modal Form Variant ---
  if (inModal) {
    if (status === 'sent') {
      return (
        <div className="py-6 sm:py-8 text-center flex flex-col items-center animate-hero-in">
          <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-blue-600 text-white mb-3 sm:mb-4">
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
      )
    }

    return (
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
              autoFocus={autoFocus}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter Your Name"
              className={inputClass}
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
              className={inputClass}
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
              className={inputClass}
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
                onChange={(e) => {
                  const val = e.target.value
                  setFormData({ ...formData, project: val })
                  onProjectChange?.(val)
                }}
                className={`${inputClass} appearance-none pr-10 cursor-pointer`}
              >
                <option value="">Select a project</option>
                {projectOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
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
          {errorMessage && (
            <p className="text-xs font-semibold text-sun animate-hero-in">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-1.5 sm:pt-2">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-full border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-[0.18em] py-3 sm:py-3.5 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] shadow-sm hover:shadow-md"
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
                submitLabel
              )}
            </button>
          </div>
        </form>
      </div>
    )
  }

  // --- Inline Form Variant (e.g. on Projects Page) ---
  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-start py-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-3xl font-medium">Thank you.</h3>
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-body">
          Your enquiry has been received. Our sales team will call you within one working day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-sun transition-colors hover:text-brand-deeper"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className={labelClass}>Full name *</span>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          autoFocus={autoFocus}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your name"
          className={inlineInputClass}
        />
      </label>

      <label>
        <span className={labelClass}>Phone *</span>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          maxLength={14}
          value={formData.phone}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 10)
            setFormData({ ...formData, phone: digits })
          }}
          placeholder="+91 98765 43210"
          className={inlineInputClass}
        />
      </label>

      <label>
        <span className={labelClass}>Email *</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="you@example.com"
          className={inlineInputClass}
        />
      </label>

      <label className={showVisitDate ? '' : 'sm:col-span-2'}>
        <span className={labelClass}>Project of interest</span>
        <span className="relative block">
          <select
            name="project"
            value={formData.project}
            onChange={(e) => {
              const val = e.target.value
              setFormData({ ...formData, project: val })
              onProjectChange?.(val)
            }}
            className={`${inlineInputClass} appearance-none pr-10`}
          >
            <option value="">Select a project</option>
            {projectOptions.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-body" width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M1 1l5 5 5-5" />
          </svg>
        </span>
      </label>

      {showVisitDate && (
        <label className="sm:col-span-2">
          <span className={labelClass}>Preferred visit date</span>
          <input
            name="visitDate"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            value={formData.visitDate}
            onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
            className={inlineInputClass}
          />
        </label>
      )}

      {errorMessage && (
        <p className="text-xs font-semibold text-sun sm:col-span-2">
          {errorMessage}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <p className="text-xs text-body">
          We respect your privacy and will never share your details.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 rounded-full border border-blue-600 bg-blue-600 px-7 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-blue-700 hover:border-blue-700 disabled:pointer-events-none disabled:opacity-60 shadow-sm hover:shadow-md cursor-pointer"
        >
          {status === 'sending' ? 'Sending…' : submitLabel}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  )
}
