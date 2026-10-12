import { stats } from '../data/content'

export default function Stats() {
  return (
    <section aria-label="Numbers" className="w-full bg-gradient-to-b from-peach via-cream to-glow/60 text-ink">
      <div className="mx-auto max-w-site px-5 pb-20 pt-20 md:px-10 md:pb-[104px] md:pt-28">
        <div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-sun via-brass to-brass-light bg-clip-text font-number text-[18vw] font-[200] leading-[0.9] tracking-[-0.03em] text-transparent md:text-[clamp(68px,17.5vw,272px)]">
          {stats.bigNumber}
        </div>

        <p className="mt-6 font-display text-2xl font-normal leading-[1.3] text-ink md:mt-8 md:text-[32px]">
          {stats.caption}
        </p>

        <dl className="mt-14 flex flex-wrap gap-x-8 gap-y-10 border-t border-brass/30 pt-11 md:mt-20 md:pt-14">
          {stats.items.map((item) => (
            <div key={item.label} className="min-w-[150px] flex-[1_1_200px]">
              <dd className="font-number text-5xl font-[200] leading-none tracking-[-0.03em] text-sun md:text-[68px]">
                {item.value}
              </dd>
              <dt className="mt-3.5 text-sm leading-normal text-body md:text-base">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
