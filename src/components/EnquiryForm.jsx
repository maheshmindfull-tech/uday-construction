import { useState } from 'react'
import { contactForm, projectsPage } from '../data/content'

const inputClass =
  'mt-2 w-full border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-body/50 transition-colors focus:border-brand-deep focus:outline-none focus:ring-2 focus:ring-brand/20'

const labelClass = 'block text-[11px] font-bold uppercase tracking-[0.16em] text-body'

const projectOptions = [...projectsPage.items.map((p) => p.name), 'Not sure yet']

async function submitEnquiry(data) {
  if (!contactForm.endpoint) {
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

export default function EnquiryForm({ defaultProject = '', showVisitDate = false, submitLabel = 'Send enquiry', autoFocus = false }) {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('sending')
    try {
      await submitEnquiry(data)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-start py-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-sun to-brand-deep text-white">
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
        <input name="name" type="text" required autoComplete="name" autoFocus={autoFocus} placeholder="Your name" className={inputClass} />
      </label>

      <label>
        <span className={labelClass}>Phone *</span>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          pattern="(\+91[\s\-]?)?[6-9]\d{4}[\s\-]?\d{5}"
          title="Enter a valid 10-digit Indian mobile number"
          placeholder="+91 98765 43210"
          className={inputClass}
        />
      </label>

      <label>
        <span className={labelClass}>Email</span>
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={inputClass} />
      </label>

      <label className={showVisitDate ? '' : 'sm:col-span-2'}>
        <span className={labelClass}>Project of interest</span>
        <span className="relative block">
          <select name="project" defaultValue={defaultProject} className={`${inputClass} appearance-none pr-10`}>
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
        <label>
          <span className={labelClass}>Preferred visit date</span>
          <input name="visitDate" type="date" min={new Date().toISOString().slice(0, 10)} className={inputClass} />
        </label>
      )}

      <label className="sm:col-span-2">
        <span className={labelClass}>Message</span>
        <textarea name="message" rows={3} placeholder="Tell us what you are looking for" className={`${inputClass} resize-none`} />
      </label>

      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <p className="text-xs text-body">
          {status === 'error' ? (
            <span className="text-sun">Something went wrong. Please call us or try again.</span>
          ) : (
            'We never share your details.'
          )}
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 rounded-full border border-brand-deep bg-brand-deep px-7 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-deeper hover:bg-brand-deeper disabled:pointer-events-none disabled:opacity-60"
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
