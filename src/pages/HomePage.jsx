import Hero from '../components/Hero'
import About from '../components/About'
import Stats from '../components/Stats'
import Ticker from '../components/Ticker'
import CoreValues from '../components/CoreValues'
import ImageBanner from '../components/ImageBanner'
import Projects from '../components/Projects'
import Thoughts from '../components/Thoughts'
import ComingSoonBanner from '../components/ComingSoonBanner'
import Testimonials from '../components/Testimonials'
import Reveal from '../components/Reveal'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <Stats />
      </Reveal>
      <Ticker />
      <Reveal>
        <CoreValues />
      </Reveal>
      <Reveal>
        <ImageBanner />
      </Reveal>
      <Reveal>
        <Projects />
      </Reveal>
      <Reveal>
        <Thoughts />
      </Reveal>
      <ComingSoonBanner />
      <Reveal>
        <Testimonials />
      </Reveal>
    </>
  )
}
