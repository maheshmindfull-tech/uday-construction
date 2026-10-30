import { useState } from 'react'
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
    <section aria-label="Frequently Asked Questions" className="w-full bg-white border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="eyebrow justify-center text-sun">Clear Answers</div>
            <h2 className="section-title mt-5">Frequently Asked Questions</h2>
            <p className="mt-4 text-base text-body">
              Everything you need to know about our residential projects, site visits, and booking process.
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
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center border border-line bg-cream text-sun transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
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
      </div>
    </section>
  )
}
