import { banners } from '../data/content'

export default function ImageBanner() {
  return (
    <section className="h-[220px] sm:h-[260px] md:h-[21.25rem] 3xl:h-[25rem] 4xl:h-[28rem] w-full overflow-hidden bg-night">
      <img src={banners.image} alt={banners.alt} className="h-full w-full object-cover" />
    </section>
  )
}
