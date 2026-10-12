import { coreValues } from '../data/content'

export default function CoreValues() {
  return (
    <section className="mx-auto max-w-site px-5 py-20 md:px-10 md:py-28">
      <div className="eyebrow">{coreValues.eyebrow}</div>
      <div className="mt-9 flex flex-wrap">
        {coreValues.items.map((item, i) => (
          <div
            key={item.title}
            className={`min-w-[240px] flex-[1_1_280px] py-4 md:py-2 ${
              i === 0 ? 'md:pr-10' : 'md:border-l md:border-line md:px-10'
            } ${i === coreValues.items.length - 1 ? 'md:pr-0' : ''}`}
          >
            <h3 className="font-display text-[34px] font-medium">{item.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-body">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
