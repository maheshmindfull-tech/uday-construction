import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

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
    question: 'Are Uday Construction projects MahaRERA registered?',
    answer:
      'All ongoing and delivered developments strictly comply with MahaRERA regulations and local development authorities. RERA registration numbers and verified documentation are provided for every unit.',
  },
  {
    question: 'Do you provide home loan support and banking assistance?',
    answer:
      'Yes, all our projects have tie-ups with leading nationalized and private financial institutions including SBI, HDFC, ICICI, and Axis Bank for swift loan approvals and competitive interest rates.',
  },
  {
    question: 'What is the construction quality and timeline assurance at Uday Construction?',
    answer:
      'With over 35 years of engineering legacy and 10M+ sq.ft. developed across Pune and PCMC, we ensure earthquake-resistant RCC frame structures, branded fittings, and strict adherence to project handover schedules.',
  },
]

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <section aria-label="Frequently Asked Questions" className="w-full bg-white border-t border-line py-16 sm:py-20 md:py-28">
      <div className="site-pad mx-auto max-w-site">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left Side: Heading, Eyebrow & Description */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <Reveal>
              <div className="eyebrow text-sun">Clear Answers</div>
              <h2 className="section-title mt-4 sm:mt-5 text-left">Frequently Asked Questions</h2>
              <p className="mt-4 text-base leading-relaxed text-body md:text-lg text-left">
                Everything you need to know about our residential projects, site visits, and booking process.
              </p>
              
              <div className="mt-8 border-t border-line/80 pt-6 hidden sm:block">
                <p className="text-xs font-bold uppercase tracking-wider text-ink">Have a specific enquiry?</p>
                <p className="mt-1.5 text-sm text-body leading-relaxed">
                  Our sales advisors are ready to assist with customized floor plans and site visit arrangements.
                </p>
                <Link
                  to="/contact"
                  className="mt-3.5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-body transition-colors hover:text-black"
                >
                  Contact Project Desk
                  <svg width="14" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M0 5h17M13 1l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Accordion Questions */}
          <div className="space-y-4 lg:col-span-7">
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
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-neutral-50/70"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-ink sm:text-lg pr-4 font-display">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center border border-line bg-cream text-sun transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-sun text-white border-sun' : ''
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-line/60 px-5 pb-6 pt-4 text-sm sm:text-[15px] leading-relaxed text-body bg-neutral-50/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
