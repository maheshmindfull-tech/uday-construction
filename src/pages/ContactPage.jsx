import { useEffect, useState } from 'react'
import { contactForm, footer, projectsPage } from '../data/content'
import Reveal from '../components/Reveal'
import Typewriter from '../components/Typewriter'
import aboutHeroBg from '../assets/images/about-hero.jpg'

const inputClass =
  'mt-2 w-full border border-line bg-cream/50 px-4 py-3 text-[15px] text-ink placeholder:text-body/50 transition-all duration-200 focus:border-brand-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20'

const labelClass = 'block text-[11px] font-bold uppercase tracking-[0.16em] text-body'

const INQUIRY_TYPES = [
  { id: 'visit', label: 'Book Site Visit' },
  { id: 'pricing', label: 'Pricing & Brochure' },
  { id: 'general', label: 'General Inquiry' },
  { id: 'partner', label: 'Channel Partner' },
]

const TIME_SLOTS = [
  'Morning (10:00 AM – 1:00 PM)',
  'Afternoon (1:00 PM – 4:00 PM)',
  'Evening (4:00 PM – 7:00 PM)',
]

const CONFIGURATIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Any Configuration']

const FAQS = [
  {
    question: 'How quickly can I expect a response after submitting my enquiry?',
    answer:
      'Our dedicated property advisor will review your preferences and get in touch with you within one to two working hours (during business hours from 9:30 AM to 7:00 PM).',
  },
  {
    question: 'Are sample flats available for viewing at the project sites?',
    answer:
      'Yes, fully furnished show residences are open for walk-throughs at our ongoing projects including Uday Emerald Park in Punawale and Uday Royal Park in Kiwale. We recommend scheduling a slot in advance for a private guided tour.',
  },
  {
    question: 'Are Uday Developers projects MahaRERA registered?',
    answer:
      'All ongoing and delivered developments strictly comply with MahaRERA regulations and local development authorities. RERA registration numbers and verified documentation are provided for every unit.',
  },
  {
    question: 'Do you provide home loan support and banking assistance?',
    answer:
      'Yes, all our projects have tie-ups with leading nationalized and private financial institutions including SBI, HDFC, ICICI, and Axis Bank for swift loan approvals and competitive interest rates.',
  },
]

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState('visit')
  const [formStatus, setFormStatus] = useState('idle')
  const [referenceId, setReferenceId] = useState('')
  const [selectedOfficeTab, setSelectedOfficeTab] = useState('site')
  const [openFaq, setOpenFaq] = useState(null)
  const [sendWhatsApp, setSendWhatsApp] = useState(true)

  useEffect(() => {
    document.title = 'Contact Us — Uday Developers | Pune & PCMC'
    window.scrollTo(0, 0)
    return () => {
      document.title = 'Uday Developers'
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    data.inquiryType = inquiryType
    data.sendWhatsApp = sendWhatsApp

    setFormStatus('sending')

    try {
      if (contactForm.endpoint) {
        const res = await fetch(contactForm.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error('Submission failed')
      } else {
        // Simulated realistic response delay
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      const generatedId = `UD-${Math.floor(10000 + Math.random() * 90000)}`
      setReferenceId(generatedId)
      form.reset()
      setFormStatus('sent')
    } catch {
      setFormStatus('error')
    }
  }

  const projectNames = [...projectsPage.items.map((p) => p.name), 'General Inquiry (Any Project)']

  return (
    <article className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[500px] w-full overflow-hidden bg-night py-24 pt-36 md:min-h-[580px] md:py-32 md:pt-44">
        <img
          src={aboutHeroBg}
          alt="Uday Developers architectural excellence"
          className="absolute inset-0 h-full w-full object-cover object-center md:object-[center_35%]"
        />

        {/* Ambient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-night/80 via-ember/40 to-night/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />

        <div className="relative mx-auto flex max-w-site flex-col justify-center px-5 md:px-10">
          <div className="eyebrow text-gold">GET IN TOUCH</div>

          <div className="mt-6 flex min-h-[105px] items-center sm:mt-8 sm:min-h-[145px] md:min-h-[175px] lg:min-h-[205px]">
            <Typewriter lines={['Connect With Us,', 'Visit Our Spaces']} />
          </div>

          <p className="mt-6 max-w-2xl font-display text-xl font-normal leading-relaxed text-cream drop-shadow-sm md:mt-8 md:text-2xl lg:text-[28px]">
            Have a question about our residences or planning a site visit? Our advisors in Nigdi and Punawale are here to guide you with complete transparency.
          </p>
        </div>
      </section>

      {/* Quick Action Contact Cards */}
      <section aria-label="Direct contact channels" className="relative -mt-12 z-20 mx-auto max-w-site px-5 md:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Direct Helpline */}
          <div className="group border border-line/80 bg-white p-7 shadow-[0_12px_32px_rgba(226,57,17,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-sun transition-transform duration-300 group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h2 className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-sun">Call Sales & Visits</h2>
            <div className="mt-3 space-y-2">
              {footer.phones.map((phone) => (
                <a
                  key={phone.href}
                  href={phone.href}
                  className="block text-xl font-light tracking-[0.02em] text-ink transition-colors hover:text-sun"
                >
                  {phone.display}
                  <span className="block text-xs font-medium text-body/80">{phone.label}</span>
                </a>
              ))}
            </div>
            <p className="mt-4 border-t border-line pt-3 text-xs text-body">
              Mon – Sat: 9:30 AM to 7:00 PM <br />
              Sunday: By Site Appointment
            </p>
          </div>

          {/* Card 2: Email Inquiries */}
          <div className="group border border-line/80 bg-white p-7 shadow-[0_12px_32px_rgba(226,57,17,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-sun transition-transform duration-300 group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <h2 className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-sun">Email Inquiries</h2>
            <div className="mt-3 space-y-3">
              {footer.emails.map((email) => (
                <a
                  key={email.address}
                  href={`mailto:${email.address}`}
                  className="group/mail block"
                >
                  <span className="block text-base font-medium text-ink underline decoration-brand/40 underline-offset-4 transition-colors group-hover/mail:text-sun">
                    {email.address}
                  </span>
                  <span className="text-xs text-body">{email.label} Desk</span>
                </a>
              ))}
            </div>
            <p className="mt-4 border-t border-line pt-3 text-xs text-body">
              Expected email response within 24 business hours with project floor plans.
            </p>
          </div>

          {/* Card 3: WhatsApp Instant Connect */}
          <div className="group border border-line/80 bg-white p-7 shadow-[0_12px_32px_rgba(226,57,17,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:col-span-2 lg:col-span-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-emerald-600 transition-transform duration-300 group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <h2 className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">WhatsApp Instant Chat</h2>
            <p className="mt-3 text-sm leading-relaxed text-body">
              Receive immediate PDF brochures, high-res floor plans, and route maps directly on your phone.
            </p>
            <a
              href="https://wa.me/919552569646?text=Hi%2C%20I%20am%20interested%20in%20learning%20more%20about%20Uday%20Developers%20projects."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-700 transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:shadow-md"
            >
              <span>Chat on WhatsApp</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className="mt-4 border-t border-line pt-3 text-xs text-body">
              Direct interaction with our dedicated sales desk.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section id="form" className="mx-auto max-w-site px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Context, Trust Points, Visit Promise */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow text-sun">Direct Dialogue</div>
              <h2 className="section-title mt-5">Let’s begin the conversation.</h2>
              <p className="mt-6 text-base leading-[1.8] text-body">
                Whether you are looking for your family’s next home, seeking detailed floor plans, or booking a weekend site inspection, our team provides straightforward guidance without aggressive sales pitches.
              </p>
            </Reveal>

            {/* Value Pillars */}
            <div className="mt-10 space-y-6">
              <Reveal delay={80}>
                <div className="flex items-start gap-4 border-l-2 border-brand-deep pl-4">
                  <div>
                    <h3 className="font-display text-xl font-medium text-ink">Zero Brokerage & Direct Dealing</h3>
                    <p className="mt-1 text-sm leading-relaxed text-body">
                      Deal directly with Uday Developers’ authorized sales team for authentic pricing and transparent payment schedules.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="flex items-start gap-4 border-l-2 border-brand-deep pl-4">
                  <div>
                    <h3 className="font-display text-xl font-medium text-ink">Personal Guided Walkthrough</h3>
                    <p className="mt-1 text-sm leading-relaxed text-body">
                      Experience the sample flats, inspect structural columns, and view the actual ventilation patterns before making a decision.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex items-start gap-4 border-l-2 border-brand-deep pl-4">
                  <div>
                    <h3 className="font-display text-xl font-medium text-ink">Established PCMC Heritage</h3>
                    <p className="mt-1 text-sm leading-relaxed text-body">
                      Over 40 years of regional experience, 44 delivered projects, and 8,000+ satisfied homeowners across Mumbai and Pune.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Quick Call Box */}
            <div className="mt-10 bg-gradient-to-br from-sand via-cream to-sand p-6 border border-line">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-sun">Prefer calling right away?</span>
              <p className="mt-2 text-2xl font-light text-ink">+91 95525 69646</p>
              <p className="mt-1 text-xs text-body">Our team is available right now to answer your inquiries.</p>
            </div>
          </div>

          {/* Right Column: Embedded Contact Us Form Container */}
          <div className="lg:col-span-7">
            <div className="border border-line bg-white p-6 shadow-[0_20px_50px_rgba(226,57,17,0.08)] sm:p-9 md:p-11">
              <div className="border-b border-line pb-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sun">Online Enquiry Form</span>
                <h3 className="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl">
                  {inquiryType === 'visit'
                    ? 'Schedule a Private Site Visit'
                    : inquiryType === 'pricing'
                    ? 'Request Pricing & Detailed Brochure'
                    : inquiryType === 'partner'
                    ? 'Channel Partner / Landowner Collaboration'
                    : 'Send Us Your Query'}
                </h3>
                <p className="mt-2 text-sm text-body">
                  Select your inquiry purpose and share your requirements below.
                </p>

                {/* Inquiry Type Selector Pills */}
                <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Inquiry Type">
                  {INQUIRY_TYPES.map((type) => {
                    const active = inquiryType === type.id
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setInquiryType(type.id)}
                        className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                          active
                            ? 'bg-gradient-to-r from-sun to-brand-deep text-white shadow-sm'
                            : 'border border-line bg-cream/60 text-body hover:border-brand-deep hover:text-sun'
                        }`}
                      >
                        {type.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Form Content or Thank You Screen */}
              {formStatus === 'sent' ? (
                <div role="status" className="flex flex-col items-start py-10 animate-hero-in">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-sun to-brand-deep text-white shadow-lg shadow-sun/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </span>
                  <div className="mt-6">
                    <span className="inline-block rounded-full bg-sand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-sun">
                      Reference ID: {referenceId}
                    </span>
                    <h3 className="mt-3 font-display text-3xl font-medium sm:text-4xl text-ink">Thank you for reaching out!</h3>
                    <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-body">
                      Your inquiry has been successfully transmitted to our senior sales desk. An advisor will contact you within one business day with the requested information.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6 w-full">
                    <a
                      href="https://wa.me/919552569646?text=Hi%2C%20I%20just%20submitted%20an%20enquiry%20on%20your%20website."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-600 bg-emerald-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-emerald-700"
                    >
                      <span>Connect on WhatsApp</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>

                    <button
                      type="button"
                      onClick={() => setFormStatus('idle')}
                      className="text-xs font-bold uppercase tracking-[0.16em] text-sun transition-colors hover:text-brand-deeper"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 grid gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <label className="sm:col-span-2">
                    <span className={labelClass}>Full Name *</span>
                    <input
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Ramesh Kulkarni"
                      className={inputClass}
                    />
                  </label>

                  {/* Phone Number */}
                  <label>
                    <span className={labelClass}>Mobile Number *</span>
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

                  {/* Email */}
                  <label>
                    <span className={labelClass}>Email Address</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="ramesh@example.com"
                      className={inputClass}
                    />
                  </label>

                  {/* Project of Interest */}
                  <label className="sm:col-span-2">
                    <span className={labelClass}>Project of Interest *</span>
                    <span className="relative block">
                      <select name="project" defaultValue="" required className={`${inputClass} appearance-none pr-10`}>
                        <option value="">Select a project address</option>
                        {projectNames.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-body"
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden="true"
                      >
                        <path d="M1 1l5 5 5-5" />
                      </svg>
                    </span>
                  </label>

                  {/* Conditional: Preferred Configuration for pricing/brochure */}
                  {inquiryType === 'pricing' && (
                    <label className="sm:col-span-2">
                      <span className={labelClass}>Preferred Configuration</span>
                      <span className="relative block">
                        <select name="configuration" defaultValue="2 BHK" className={`${inputClass} appearance-none pr-10`}>
                          {CONFIGURATIONS.map((cfg) => (
                            <option key={cfg} value={cfg}>{cfg}</option>
                          ))}
                        </select>
                        <svg className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-body" width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                          <path d="M1 1l5 5 5-5" />
                        </svg>
                      </span>
                    </label>
                  )}

                  {/* Conditional: Site Visit Date & Slot */}
                  {inquiryType === 'visit' && (
                    <>
                      <label>
                        <span className={labelClass}>Preferred Visit Date *</span>
                        <input
                          name="visitDate"
                          type="date"
                          required
                          min={new Date().toISOString().slice(0, 10)}
                          className={inputClass}
                        />
                      </label>

                      <label>
                        <span className={labelClass}>Preferred Time Slot</span>
                        <span className="relative block">
                          <select name="timeSlot" defaultValue={TIME_SLOTS[0]} className={`${inputClass} appearance-none pr-10`}>
                            {TIME_SLOTS.map((slot) => (
                              <option key={slot} value={slot}>{slot}</option>
                            ))}
                          </select>
                          <svg className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-body" width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                            <path d="M1 1l5 5 5-5" />
                          </svg>
                        </span>
                      </label>
                    </>
                  )}

                  {/* Detailed Message / Requirements */}
                  <label className="sm:col-span-2">
                    <span className={labelClass}>Your Message / Requirements</span>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder={
                        inquiryType === 'visit'
                          ? 'Specify any specific requirements or number of family members attending the visit...'
                          : inquiryType === 'pricing'
                          ? 'Any particular floor preference, budget range, or handover timeline?'
                          : 'Tell us how we can help...'
                      }
                      className={`${inputClass} resize-none`}
                    />
                  </label>

                  {/* WhatsApp Opt-in Checkbox */}
                  <div className="sm:col-span-2 flex items-start gap-3 pt-1">
                    <input
                      id="whatsapp-optin"
                      type="checkbox"
                      checked={sendWhatsApp}
                      onChange={(e) => setSendWhatsApp(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-line text-brand-deep focus:ring-brand"
                    />
                    <label htmlFor="whatsapp-optin" className="text-xs text-body leading-relaxed cursor-pointer select-none">
                      Send project brochure, floor plans, and pricing sheet directly to my WhatsApp number for easy offline viewing.
                    </label>
                  </div>

                  {/* Action Row */}
                  <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                    <p className="text-xs text-body">
                      {formStatus === 'error' ? (
                        <span className="font-semibold text-sun">
                          Submission failed. Please call +91 95525 69646 or retry.
                        </span>
                      ) : (
                        'Your privacy is respected. No spam guaranteed.'
                      )}
                    </p>

                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="inline-flex items-center gap-2 rounded-full border border-brand-deep bg-brand-deep px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-deeper hover:bg-brand-deeper hover:shadow-xl disabled:pointer-events-none disabled:opacity-60"
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <span>Submitting…</span>
                          <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>{inquiryType === 'visit' ? 'Confirm Site Visit' : 'Send Enquiry'}</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations & Interactive Guide */}
      <section aria-label="Our office locations" className="w-full bg-gradient-to-b from-sand to-cream py-20 md:py-28 border-t border-line">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <Reveal>
              <div className="eyebrow text-sun">Our Presence</div>
              <h2 className="section-title mt-5">Visit our physical offices.</h2>
            </Reveal>

            {/* Office Switcher Tabs */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedOfficeTab('site')}
                className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
                  selectedOfficeTab === 'site'
                    ? 'bg-gradient-to-r from-sun to-brand-deep text-white shadow-md shadow-sun/20'
                    : 'border border-line bg-white text-body hover:border-brand-deep hover:text-sun'
                }`}
              >
                Site Office (Punawale)
              </button>
              <button
                type="button"
                onClick={() => setSelectedOfficeTab('corp')}
                className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
                  selectedOfficeTab === 'corp'
                    ? 'bg-gradient-to-r from-sun to-brand-deep text-white shadow-md shadow-sun/20'
                    : 'border border-line bg-white text-body hover:border-brand-deep hover:text-sun'
                }`}
              >
                Corporate Office (Nigdi)
              </button>
            </div>
          </div>

          {/* Office Details & Visual Map Card */}
          <div className="mt-12 grid gap-8 lg:grid-cols-12 items-center">
            {/* Office Description */}
            <div className="lg:col-span-5 bg-white border border-line p-8 md:p-10 shadow-sm">
              {selectedOfficeTab === 'site' ? (
                <div>
                  <span className="inline-block rounded-full bg-sand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sun">
                    Experience Lounge & Sample Flats
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-medium text-ink">
                    Uday Emerald Park Experience Center
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-body">
                    Survey No. 50/6, Punawale, Pune, Maharashtra 411033.
                  </p>

                  <div className="mt-6 space-y-3 text-xs text-body border-t border-line pt-5">
                    <p className="flex items-center gap-2">
                      <span className="font-bold text-ink">Key Landmarks:</span> Near Mumbai-Bengaluru Highway, minutes from Hinjewadi IT Park.
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-bold text-ink">Visiting Hours:</span> Open All 7 Days: 9:30 AM to 7:00 PM.
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-bold text-ink">Facilities:</span> Dedicated Visitor Parking, Model Flat Walkthrough, Audio-Visual Lounge.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="https://maps.google.com/?q=Punawale+Pune+Uday+Developers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-brand-deep bg-brand-deep px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm hover:bg-brand-deeper"
                    >
                      <span>Open in Google Maps</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                    <a
                      href={footer.phones[0].href}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-ink hover:text-sun"
                    >
                      <span>Call Site Manager</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="inline-block rounded-full bg-sand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sun">
                    Headquarters & Documentation
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-medium text-ink">
                    Uday Developers Corporate Office
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-body">
                    Sant Tukaram Vyapar Sankul, Shop 22/23, Near Savali Hotel, Nigdi, Pune, Maharashtra 411044.
                  </p>

                  <div className="mt-6 space-y-3 text-xs text-body border-t border-line pt-5">
                    <p className="flex items-center gap-2">
                      <span className="font-bold text-ink">Key Landmarks:</span> Near Savali Hotel, walking distance to Nigdi Pradhikaran bus terminus.
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-bold text-ink">Office Hours:</span> Monday to Saturday: 10:00 AM to 6:30 PM.
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-bold text-ink">Services:</span> Legal Agreements, Documentation, Allotments & Management Desk.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="https://maps.google.com/?q=Sant+Tukaram+Vyapar+Sankul+Nigdi+Pune"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-brand-deep bg-brand-deep px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm hover:bg-brand-deeper"
                    >
                      <span>Open in Google Maps</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                    <a
                      href={footer.phones[1].href}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-ink hover:text-sun"
                    >
                      <span>Call Corporate Desk</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Visual Location Frame / Map Simulation */}
            <div className="lg:col-span-7 h-[380px] md:h-[440px] overflow-hidden border border-line bg-night relative shadow-lg">
              <iframe
                title="Office Location Map"
                src={
                  selectedOfficeTab === 'site'
                    ? 'https://maps.google.com/maps?q=Punawale%2C%20Pune&t=&z=14&ie=UTF8&iwloc=&output=embed'
                    : 'https://maps.google.com/maps?q=Nigdi%20Pune%20Sant%20Tukaram%20Vyapar%20Sankul&t=&z=14&ie=UTF8&iwloc=&output=embed'
                }
                className="w-full h-full border-0 filter contrast-[1.05] opacity-90 transition-opacity duration-500 hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-md text-xs font-semibold text-ink flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sun animate-ping" />
                <span>{selectedOfficeTab === 'site' ? 'Punawale Site Location' : 'Nigdi Corporate Headquarters'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section aria-label="Frequently Asked Questions" className="mx-auto max-w-site px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="eyebrow justify-center text-sun">Clear Answers</div>
            <h2 className="section-title mt-5">Frequently Asked Questions</h2>
            <p className="mt-4 text-base text-body">
              Everything you need to know before visiting our sites or reserving your home.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div
                key={faq.question}
                className="border border-line bg-white transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-ink sm:text-lg pr-4 font-display">
                    {faq.question}
                  </span>
                  <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-line bg-cream text-sun transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-line/60 px-6 pb-6 pt-3 text-sm leading-relaxed text-body">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </article>
  )
}
