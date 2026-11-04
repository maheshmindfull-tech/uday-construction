import { coreValues } from '../data/content'

export default function CoreValues() {
  return (
    <section className="mx-auto max-w-site px-4 sm:px-6 md:px-10 2xl:px-16 py-16 sm:py-20 md:py-28">
      <div className="eyebrow">{coreValues.eyebrow}</div>
      <div className="mt-7 sm:mt-9 grid grid-cols-1 gap-y-6 md:grid-cols-3">
        {coreValues.items.map((item, i) => (
          <div
            key={item.title}
            className={`py-3 md:py-2 ${
              i === 0 ? 'md:pr-10' : 'md:border-l md:border-line md:px-10'
            } ${i === coreValues.items.length - 1 ? 'md:pr-0' : ''}`}
          >
            <h3 className="font-display text-2xl sm:text-[2.125rem] font-medium">{item.title}</h3>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-[0.95rem] leading-[1.7] text-body">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
