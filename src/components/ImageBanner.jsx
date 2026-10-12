import { banners } from '../data/content'

export default function ImageBanner() {
  return (
    <section className="h-[240px] w-full overflow-hidden bg-night md:h-[340px]">
      <img src={banners.image} alt={banners.alt} className="h-full w-full object-cover" />
    </section>
  )
}
