import logo from '../assets/images/logo.png'
import heroPoster from '../assets/images/hero-poster.jpg'
import aboutImage from '../assets/images/about-architecture.jpg'
import banner from '../assets/images/banner.jpg'
import project1 from '../assets/images/project-1.jpg'
import project2 from '../assets/images/project-2.jpg'
import project3 from '../assets/images/project-3.jpg'
import legacy from '../assets/images/legacy.jpg'
import testimonialBg from '../assets/images/testimonial-bg.jpg'
import founder from '../assets/images/founder.jpg'
import comingSoonImage from '../assets/images/coming-soon.jpg'
import aboutHeroImg from '../assets/images/about-hero.jpg'
import projectsHeroImg from '../assets/images/projects-hero.jpg'
import projectSkyline from '../assets/images/project-skyline.jpg'
import projectResidency from '../assets/images/project-residency.jpg'
import projectGreens from '../assets/images/project-greens.jpg'

export const company = {
  name: 'Uday Developers',
  logo,
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Enquire Now', href: '#contact', isButton: true },
]

export const hero = {
  poster: heroPoster,
  videoSrc: '/videos/hero.mp4',
}

export const about = {
  eyebrow: 'About us',
  title: 'Building places people are proud to call home.',
  paragraphs: [
    'Uday Developers has shaped homes across Pimpri-Chinchwad since 2004. Founded by Mr. Balasaheb Vyankatrao Gaikwad, we plan, build and hand over residential spaces with the same care from blueprint to brick.',
    'Sites are chosen for daily life — near schools, hospitals and the roads families actually use — and finished to a standard that still feels right years after the keys are handed over.',
  ],
  linkLabel: 'Read more',
  linkHref: '/about',
  image: aboutImage,
  imageAlt: 'Contemporary residential building by Uday Developers',
}

export const stats = {
  bigNumber: '10Million+',
  caption: 'sq. ft. thoughtfully designed spaces across Mumbai and Pune',
  items: [
    { value: '44', label: 'Projects Delivered' },
    { value: '81', label: 'Completed Developments' },
    { value: '40+', label: 'Years of Experience' },
    { value: '8,000+', label: 'Happy Families' },
  ],
}

export const tickerPoints = [
  'Spatial Craft',
  'Light Sensitive Architecture',
  'Quiet Living',
  'Architecture First',
  'Bespoke Homes',
  'Biophilia Inspired',
]

export const coreValues = {
  eyebrow: 'Core values',
  items: [
    {
      title: 'Trust',
      text: 'Timelines, specifications and handover kept the way PCMC families have known us since 2004.',
    },
    {
      title: 'Quality',
      text: 'Certified materials, careful workmanship and an earthquake-resistant frame on every home.',
    },
    {
      title: 'Transparency',
      text: 'Clear plans and an open conversation from the first site visit through settlement.',
    },
  ],
}

export const banners = {
  image: banner,
  alt: 'Landscaped garden and clubhouse at a Uday Developers residential community',
}

export const projects = {
  eyebrow: 'Our projects',
  title: 'Homes taking shape',
  allLabel: 'All projects',
  allHref: '/projects',
  items: [
    {
      name: 'Uday Emerald Park',
      location: 'Punawale, Pune',
      status: 'Ongoing',
      image: project1,
      href: '/projects#uday-emerald-park',
    },
    {
      name: 'Uday Royal Park',
      location: 'Kiwale, Pune',
      status: 'Ongoing',
      image: project2,
      href: '/projects#uday-royal-park',
    },
    {
      name: 'Uday Hilltop Residency',
      location: 'Ravet, Pune',
      status: 'Completed',
      image: project3,
      href: '/projects#uday-hilltop-residency',
    },
  ],
}

export const thoughts = {
  eyebrow: 'Thoughts',
  title: 'The Power of Thoughtful Spaces',
  intro: "The best spaces don't demand attention.\nThey quietly make everyday life better.",
  quote: {
    text: 'A home is not built from material alone it is built from memory, silence, and the quality of morning light.',
    author: 'Balasaheb Gaikwad, Founder',
  },
  image: legacy,
  imageAlt: 'Resident seated in a sunlit living room',
}

export const testimonials = {
  eyebrow: 'Testimonials',
  title: 'Client Feedback & Stories',
  subtitle: 'Hear directly from the families and residents who call our communities home.',
  background: testimonialBg,
  items: [
    {
      id: 1,
      clientName: 'Mr. & Mrs. Kulkarni',
      role: 'Resident',
      project: 'Uday Emerald Park',
      location: 'Punawale',
      quote: 'Morning light on the hills, and a home that stays quiet after the drive back from Hinjewadi.',
      poster: testimonialBg,
      videoSrc: '', // Place video in /public/videos/ and set e.g. '/videos/feedback-1.mp4'
      duration: '1:45',
      tag: 'Handover 2023',
    },
    {
      quote: 'We were told what would be built, and that is what we walked into on handover day. Absolute transparency.',
      clientName: 'Dr. Amit & Sneha Patil',
      role: 'Homeowner',
      project: 'Uday Residency',
      location: 'Kiwale',
      poster: project1,
      videoSrc: '',
      duration: '2:12',
      tag: 'Resident 3 Years',
    },
    {
      quote: 'Two decades in Nigdi and Ravet is why the next generation in the family looked here first.',
      clientName: 'The Joshi Family',
      role: 'Family Homeowner',
      project: 'Uday Heights',
      location: 'Ravet',
      poster: project2,
      videoSrc: '',
      duration: '1:30',
      tag: 'Verified Resident',
    },
  ],
}

export const contactForm = {
  // Set to a form endpoint (e.g. Formspree) to receive enquiries; empty shows the thank-you state only.
  endpoint: '',
  title: 'Let’s find your home.',
  text: 'Share a few details and our sales team will call you back within one working day.',
}

export const footer = {
  copyright: 'Uday Developers. All rights reserved.',
  since: 'Building trust since 2004',
  blurb:
    'Homes across Pimpri-Chinchwad, planned and handed over with the same care from blueprint to brick.',
  offices: [
    {
      title: 'Corporate office',
      lines: ['Sant Tukaram Vyapar Sankul, Shop 22/23', 'Near Savali Hotel, Nigdi, Pune 411044'],
    },
    {
      title: 'Site office',
      lines: ['Uday Emerald Park, Survey No. 50/6', 'Punawale, Pune 411033'],
    },
  ],
  phones: [
    { label: 'Sales & site visits', display: '+91 95525 69646', href: 'tel:+919552569646' },
    { label: 'Enquiries', display: '+91 95525 69647', href: 'tel:+919552569647' },
  ],
  emails: [
    { label: 'Sales', address: 'sales@udayconstruction.co.in' },
    { label: 'Office', address: 'info@udayconstruction.co.in' },
  ],
  links: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export const aboutPage = {
  eyebrow: 'Legacy & philosophy',
  title: 'Building places people are proud to call home.',
  portrait: founder,
  portraitAlt: 'Founder portrait for Uday Developers',
  founder: 'Mr. Balasaheb Vyankatrao Gaikwad',
  role: 'Founder',
  paragraphs: [
    'Since 2004, Uday Developers has built homes across Pimpri-Chinchwad for the week a family actually lives — the school, the hospital, the road home.',
    'The work starts on paper and ends at the keys. What is drawn, specified and promised is what gets built.',
    'That is the idea Mr. Balasaheb Vyankatrao Gaikwad began with, and it is still how a site is chosen and a home is handed over.',
  ],
  nonNegotiable: {
    title: 'What we hold as non-negotiable.',
    items: [
      {
        num: '01',
        title: 'Architecture before commerce',
        text: 'Every design decision precedes every financial one. We will not compromise form for margin. If the numbers do not work at our standards, we do not build it.',
      },
      {
        num: '02',
        title: 'Restraint as language',
        text: 'We believe in the power of subtraction. Removing the unnecessary until only the essential remains — this is our design discipline.',
      },
      {
        num: '03',
        title: 'Nature as co-designer',
        text: 'Light, wind, water, and vegetation are not afterthoughts. They are the primary materials from which we design. The land speaks first.',
      },
      {
        num: '04',
        title: 'Craft over speed',
        text: 'We have never delivered a project we were not proud of. This sometimes means we take longer. We are entirely at peace with that.',
      },
    ],
  },
  galaxy: ['Trust', 'Light', 'Home', 'Quality', 'PCMC', 'Craft', 'Legacy', 'Promise', 'Family', 'Brick'],
  comingSoon: {
    eyebrow: 'Coming soon',
    title: 'The next address',
    text: 'A new home in Pimpri-Chinchwad is on the board. The name will be shared when the land, the plan and the promise are ready to stand together.',
    image: comingSoonImage,
    imageAlt: 'A new Uday Developers residence at first light',
  },
}

export const projectsPage = {
  hero: {
    eyebrow: 'Our projects',
    typeLines: ['Crafted Spaces,', 'Lasting Homes'],
    text: 'Ongoing, completed and upcoming residences across Pimpri-Chinchwad.',
    image: projectsHeroImg,
    imageAlt: 'Uday Developers residential towers at sunset over Pune',
  },
  intro: {
    eyebrow: 'Portfolio',
    title: 'Two decades of addresses, one standard.',
    text: 'From Nigdi to Tathawade, each project is planned around daily life: the school run, the hospital nearby, the road home. Explore what is being built today, what families already call home, and what comes next.',
  },
  filters: ['All', 'Ongoing', 'Completed', 'Coming Soon'],
  items: [
    {
      slug: 'uday-emerald-park',
      name: 'Uday Emerald Park',
      location: 'Punawale, Pune',
      status: 'Ongoing',
      typology: '2 & 3 BHK Residences',
      image: project1,
      imageAlt: 'Uday Emerald Park residential towers in Punawale',
      text: 'A high-rise community planned around open green courtyards, close to the Mumbai–Bengaluru highway and the Hinjewadi IT corridor.',
    },
    {
      slug: 'uday-royal-park',
      name: 'Uday Royal Park',
      location: 'Kiwale, Pune',
      status: 'Ongoing',
      typology: '2 BHK Residences',
      image: project2,
      imageAlt: 'Uday Royal Park residential towers in Kiwale',
      text: 'Contemporary towers designed for cross-ventilation and long views, a short drive from Ravet, Dehu Road and the expressway.',
    },
    {
      slug: 'uday-skyline',
      name: 'Uday Skyline',
      location: 'Wakad, Pune',
      status: 'Ongoing',
      typology: '2 & 3 BHK Residences',
      image: projectSkyline,
      imageAlt: 'Uday Skyline residential tower nearing completion in Wakad',
      text: 'A single landmark tower with glass-railed balconies on every home, minutes from the Hinjewadi IT park and Wakad’s schools.',
    },
    {
      slug: 'uday-hilltop-residency',
      name: 'Uday Hilltop Residency',
      location: 'Ravet, Pune',
      status: 'Completed',
      typology: '1 & 2 BHK Residences',
      image: project3,
      imageAlt: 'Uday Hilltop Residency, a completed community in Ravet',
      text: 'A completed community where families have settled in — handed over to the specification that was drawn and promised.',
    },
    {
      slug: 'uday-residency',
      name: 'Uday Residency',
      location: 'Kiwale, Pune',
      status: 'Completed',
      typology: '1 & 2 BHK Residences',
      image: projectResidency,
      imageAlt: 'Uday Residency gated society with tree-lined internal roads in Kiwale',
      text: 'A gated society with tree-lined internal roads and a children’s play area, now home to families for several years.',
    },
    {
      slug: 'uday-heights',
      name: 'Uday Heights',
      location: 'Ravet, Pune',
      status: 'Completed',
      typology: '2 BHK Residences',
      image: aboutImage,
      imageAlt: 'Uday Heights contemporary residential building in Ravet',
      text: 'Clean contemporary lines and generous daylight, built for families who wanted Ravet’s calm with the city close at hand.',
    },
    {
      slug: 'uday-greens',
      name: 'Uday Greens',
      location: 'Tathawade, Pune',
      status: 'Coming Soon',
      typology: '3 & 4 BHK Residences',
      image: projectGreens,
      imageAlt: 'Upcoming Uday Greens towers with vertical gardens in Tathawade',
      text: 'Twin towers with vertical gardens and a podium-level pool. Details will be shared as approvals are completed.',
    },
    {
      slug: 'uday-riverside',
      name: 'Uday Riverside',
      location: 'Moshi, Pune',
      status: 'Coming Soon',
      typology: '2 & 3 BHK Residences',
      image: comingSoonImage,
      imageAlt: 'Upcoming Uday Riverside residence at first light',
      text: 'A quieter address planned along open green edges. Register your interest to hear first when bookings open.',
    },
  ],
  visit: {
    eyebrow: 'Plan a site visit',
    title: 'See the home before you decide.',
    text: 'Walk the site, see the sample flat and talk to the people building it. Our sales team will arrange a visit at a time that suits your family.',
  },
}

export const projectGallery = {
  eyebrow: 'Project Gallery',
  title: 'Spaces shaped with conviction',
  subtitle: 'A photographic journey through our residential developments, living environments, and architectural craftsmanship across PCMC.',
  categories: ['All', 'Ongoing', 'Completed', 'Architecture'],
  items: [
    {
      id: 1,
      title: 'Uday Emerald Park',
      category: 'Ongoing',
      type: '2 & 3 BHK Premium Homes',
      location: 'Punawale, Pune',
      image: project1,
      caption: 'Thoughtfully planned high-rise community with open green courtyards.',
    },
    {
      id: 2,
      title: 'Clubhouse & Landscape Pavilions',
      category: 'Architecture',
      type: 'Amenities & Greenery',
      location: 'Punawale',
      image: banner,
      caption: 'Private serene pavilion designed with natural stone and lush native plantations.',
    },
    {
      id: 3,
      title: 'Uday Royal Park',
      category: 'Ongoing',
      type: 'Modern Residential Towers',
      location: 'Kiwale, Pune',
      image: project2,
      caption: 'Contemporary towers offering unobstructed skyline vistas and cross-ventilation.',
    },
    {
      id: 4,
      title: 'Signature Twilight Facade',
      category: 'Architecture',
      type: 'Architectural Lighting & Form',
      location: 'Ravet, Pune',
      image: aboutHeroImg,
      caption: 'Warm ambient lighting highlighting refined architectural proportions at dusk.',
    },
    {
      id: 5,
      title: 'Uday Hilltop Residency',
      category: 'Completed',
      type: 'Delivered Community',
      location: 'Ravet, Pune',
      image: project3,
      caption: 'Successfully delivered residential community with happy families in residence.',
    },
    {
      id: 6,
      title: 'Contemporary Residential Craft',
      category: 'Completed',
      type: 'Completed Residences',
      location: 'Pimpri-Chinchwad',
      image: aboutImage,
      caption: 'Finished to exacting specifications that endure through decades of family life.',
    },
  ],
}
