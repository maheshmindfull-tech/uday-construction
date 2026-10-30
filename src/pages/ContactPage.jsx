import { useEffect, useState } from 'react'
import { contactForm, footer, projectsPage } from '../data/content'
import Reveal from '../components/Reveal'
import Typewriter from '../components/Typewriter'
import aboutHeroBg from '../assets/images/about-hero.jpg'

const inputClass =
  'mt-1.5 w-full border border-line bg-cream/50 px-4 py-2.5 text-[15px] text-ink placeholder:text-body/50 transition-all duration-200 focus:border-brand-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20'

const labelClass = 'block text-[11px] font-bold uppercase tracking-[0.16em] text-body'



export default function ContactPage() {
  const [formStatus, setFormStatus] = useState('idle')
  const [referenceId, setReferenceId] = useState('')

  const [sendWhatsApp, setSendWhatsApp] = useState(true)

  useEffect(() => {
    document.title = 'Contact Us — Uday Construction | Pune & PCMC'
    window.scrollTo(0, 0)
    return () => {
      document.title = 'Uday Construction'
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    data.sendWhatsApp = sendWhatsApp

    setFormStatus('sending')

    try {
      if (contactForm?.endpoint) {
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
          alt="Uday Construction architectural excellence"
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

          <p className="mt-6 max-w-2xl font-display text-xl font-normal leading-relaxed text-cream md:mt-8 md:text-2xl lg:text-[28px]">
            Have a question about our residences or planning a visit? Our property advisors in Nigdi Pradhikaran are here to guide you with complete transparency.
          </p>
        </div>
      </section>

      {/* Quick Action Contact Cards */}
      <section aria-label="Direct contact channels" className="relative -mt-12 z-20 mx-auto max-w-site px-5 md:px-10">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Card 1: Visit Us */}
          <div className="group border border-line/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-ink transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h2 className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-ink/70">Visit Our Office</h2>
            <div className="mt-3 space-y-1 text-base font-medium text-ink">
              {footer.offices[0].lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <p className="mt-4 border-t border-line pt-3 text-xs text-body">
              Mon – Sat: 9:30 AM to 7:00 PM <br />
              Sunday: By Site Appointment
            </p>
          </div>

          {/* Card 2: Email Inquiries */}
          <div className="group border border-line/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-ink transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-50 group-hover:text-blue-600">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <h2 className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-ink/70">Email Inquiries</h2>
            <div className="mt-3 space-y-3">
              {footer.emails.map((email) => (
                <a
                  key={email.address}
                  href={`mailto:${email.address}`}
                  className="group/mail block"
                >
                  <span className="block text-base font-medium text-ink underline decoration-line/80 underline-offset-4 transition-colors group-hover/mail:text-blue-600 group-hover/mail:decoration-blue-500">
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
                      Deal directly with Uday Construction’ authorized sales team for authentic pricing and transparent payment schedules.
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

          </div>

          {/* Right Column: Embedded Contact Us Form Container */}
          <div className="lg:col-span-7">
            <div className="border border-line bg-white p-5 sm:p-7 md:p-8">
              <div className="border-b border-line pb-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sun">Online Enquiry Form</span>
                <h3 className="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl">
                  Send Us an Enquiry
                </h3>
                <p className="mt-2 text-sm text-body">
                  Please share your details below and our property advisor will connect with you shortly.
                </p>
              </div>

              {/* Form Content or Thank You Screen */}
              {formStatus === 'sent' ? (
                <div role="status" className="flex flex-col items-start py-10 animate-hero-in">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-sun to-brand-deep text-white">
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
                    <button
                      type="button"
                      onClick={() => setFormStatus('idle')}
                      className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600 transition-colors hover:text-orange-700 cursor-pointer"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 grid gap-3.5 sm:grid-cols-2">
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

                  {/* Detailed Message / Requirements */}
                  <label className="sm:col-span-2">
                    <span className={labelClass}>Your Message / Requirements</span>
                    <textarea
                      name="message"
                      rows={2}
                      placeholder="Tell us how we can help or specify any particular requirements..."
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
                  <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
                    <p className="text-xs text-body">
                      {formStatus === 'error' ? (
                        <span className="font-semibold text-sun">
                          Submission failed. Please email us or retry.
                        </span>
                      ) : (
                        'Your privacy is respected. No spam guaranteed.'
                      )}
                    </p>

                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="inline-flex items-center gap-2 rounded-full border border-orange-600 bg-orange-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-700 hover:bg-orange-700 disabled:pointer-events-none disabled:opacity-60 shadow-sm hover:shadow-md cursor-pointer"
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
                          <span>Send Enquiry</span>
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

      {/* Office Location & Interactive Map */}
      <section aria-label="Our office location" className="w-full bg-white py-20 md:py-28 border-t border-line">
        <div className="mx-auto max-w-site px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <Reveal>
              <div className="eyebrow text-sun">Our Presence</div>
              <h2 className="section-title mt-5">Visit our office.</h2>
            </Reveal>
            <div className="text-right">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sun">
                Pimpri-Chinchwad &middot; Pune
              </span>
            </div>
          </div>

          {/* Office Details & Visual Map Card */}
          <div className="mt-12 grid gap-8 lg:grid-cols-12 items-center">
            {/* Office Description */}
            <div className="lg:col-span-5 bg-white border border-line p-8 md:p-10">
              <div>
                <span className="inline-block rounded-full bg-sand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sun">
                  Headquarters & Office
                </span>
                <h3 className="mt-4 font-display text-3xl font-medium text-ink">
                  Uday Construction
                </h3>
                <p className="mt-4 text-[15px] font-medium leading-relaxed text-ink">
                  MQ27+6Q9, GPRA Quarters, Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411044
                </p>

                <div className="mt-6 border-t border-line pt-5">
                  <dl className="grid grid-cols-[100px_1fr] sm:grid-cols-[115px_1fr] gap-x-4 gap-y-3.5 text-xs text-body">
                    <dt className="font-bold text-ink">Location:</dt>
                    <dd className="m-0 leading-relaxed">GPRA Quarters, Pradhikaran, Nigdi, Pimpri-Chinchwad.</dd>

                    <dt className="font-bold text-ink">Office Hours:</dt>
                    <dd className="m-0 leading-relaxed">Monday to Saturday: 9:30 AM to 7:00 PM (Sunday by Appointment).</dd>

                    <dt className="font-bold text-ink">Services:</dt>
                    <dd className="m-0 leading-relaxed">Project Enquiries, Documentation, Site Visit Coordination & Customer Support.</dd>
                  </dl>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://maps.google.com/?q=MQ27%2B6Q9%2C+GPRA+Quarters%2C+Pradhikaran%2C+Nigdi%2C+Pimpri-Chinchwad%2C+Maharashtra+411044"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-orange-600 bg-orange-600 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white hover:border-orange-700 hover:bg-orange-700 transition-colors shadow-sm"
                  >
                    <span>Open in Google Maps</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                </div>

                {/* Social Media Links */}
                <div className="mt-6 flex items-center gap-2 border-t border-line/70 pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-body mr-1">
                    Social:
                  </span>
                  {footer.socials?.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink transition-all hover:border-orange-500 hover:text-orange-600 shadow-sm"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Location Frame / Embedded Map */}
            <div className="lg:col-span-7 h-[380px] md:h-[440px] overflow-hidden border border-line bg-night relative">
              <iframe
                title="Office Location Map"
                src="https://maps.google.com/maps?q=MQ27%2B6Q9%2C%20GPRA%20Quarters%2C%20Pradhikaran%2C%20Nigdi%2C%20Pimpri-Chinchwad%2C%20Maharashtra%20411044&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-[1.05] opacity-90 transition-opacity duration-500 hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-ink flex items-center gap-2 shadow-none border border-line/60">
                <span className="h-2 w-2 rounded-full bg-sun animate-ping" />
                <span>MQ27+6Q9 &middot; Pradhikaran, Nigdi</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
