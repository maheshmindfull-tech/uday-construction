import { useEffect, useState } from 'react'

export default function Typewriter({ lines, className = '' }) {
  const fullText = lines.join('\n')
  const [charCount, setCharCount] = useState(fullText.length)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout

    if (!isDeleting && charCount < fullText.length) {
      timeout = setTimeout(() => setCharCount((n) => n + 1), 90)
    } else if (!isDeleting && charCount === fullText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2400)
    } else if (isDeleting && charCount > 0) {
      timeout = setTimeout(() => setCharCount((n) => n - 1), 45)
    } else if (isDeleting && charCount === 0) {
      timeout = setTimeout(() => setIsDeleting(false), 650)
    }

    return () => clearTimeout(timeout)
  }, [charCount, isDeleting, fullText.length])

  let offset = 0
  const segments = lines.map((line) => {
    const start = offset
    offset += line.length + 1
    const visible = line.slice(0, Math.max(0, charCount - start))
    return { line, start, visible }
  })

  const cursorLine = Math.max(0, segments.findLastIndex((seg) => charCount >= seg.start))

  return (
    <h1
      aria-label={lines.join(' ')}
      className={`font-display font-medium tracking-[-0.02em] text-white select-none ${className}`}
    >
      {segments.map((seg, i) => (
        <span
          key={seg.line}
          aria-hidden="true"
          className={`relative block text-4xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-[84px] ${
            i > 0 ? 'mt-2' : ''
          }`}
        >
          {/* Static invisible text ALWAYS reserves full line height & width in the DOM:
              Prevents ANY up-down movement, height collapse, or layout jumping during typing and backspacing */}
          <span className="invisible select-none opacity-0 pointer-events-none" aria-hidden="true">
            {seg.line}
          </span>

          {/* Absolute positioned typing/backspacing text overlay */}
          <span className="absolute left-0 top-0 whitespace-nowrap">
            <span>{seg.visible}</span>
            {i === cursorLine && (
              <span
                aria-hidden="true"
                className="ml-2.5 inline-block h-[0.78em] w-[3.5px] md:w-[4px] animate-pulse bg-gold align-middle"
              />
            )}
          </span>
        </span>
      ))}
    </h1>
  )
}
