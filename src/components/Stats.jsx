import { stats } from '../data/content'

export default function Stats() {
  return (
    <section aria-label="Numbers" className="w-full bg-white text-ink border-b border-line">
      <div className="mx-auto max-w-site px-4 sm:px-6 md:px-10 2xl:px-16 pb-16 pt-16 sm:pb-20 sm:pt-20 md:pb-[6.5rem] md:pt-28">
        <div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-sun via-brand to-gold bg-clip-text font-number text-[clamp(34px,11.8vw,11.5rem)] font-[200] leading-[0.92] tracking-[-0.03em] text-transparent">
          {stats.bigNumber}
        </div>

        <p className="mt-6 font-display text-xl sm:text-2xl font-normal leading-[1.3] text-ink md:mt-8 md:text-[2rem]">
          {stats.caption}
        </p>

        <dl className="mt-10 sm:mt-14 grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10 border-t border-brand/30 pt-8 sm:pt-11 md:mt-20 md:grid-cols-4 md:pt-14">
          {stats.items.map((item) => (
            <div key={item.label} className="min-w-0">
              <dd className="font-number text-3xl min-[360px]:text-4xl sm:text-5xl font-[200] leading-none tracking-[-0.03em] text-sun md:text-[4.25rem]">
                {item.value}
              </dd>
              <dt className="mt-3 text-xs min-[360px]:text-sm leading-normal text-body md:text-base">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
