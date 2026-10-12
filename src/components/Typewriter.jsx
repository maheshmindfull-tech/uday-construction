import { useEffect, useState } from 'react'

export default function Typewriter({ lines, className = '' }) {
  const fullText = lines.join('\n')
  const [charCount, setCharCount] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout

    if (!isDeleting && charCount < fullText.length) {
      timeout = setTimeout(() => setCharCount((n) => n + 1), 95)
    } else if (!isDeleting && charCount === fullText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2600)
    } else if (isDeleting && charCount > 0) {
      timeout = setTimeout(() => setCharCount((n) => n - 1), 45)
    } else if (isDeleting && charCount === 0) {
      timeout = setTimeout(() => setIsDeleting(false), 700)
    }

    return () => clearTimeout(timeout)
  }, [charCount, isDeleting, fullText.length])

  let offset = 0
  const segments = lines.map((line) => {
    const start = offset
    offset += line.length + 1
    return { line, start, visible: line.slice(0, Math.max(0, charCount - start)) }
  })
  const cursorLine = Math.max(0, segments.findLastIndex((seg) => charCount >= seg.start))

  return (
    <h1 aria-label={lines.join(' ')} className={`font-display font-medium tracking-[-0.02em] text-white select-none ${className}`}>
      {segments.map((seg, i) => (
        <span
          key={seg.line}
          aria-hidden="true"
          className={`block text-4xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-[84px] ${i > 0 ? 'mt-2' : ''}`}
        >
          <span>{seg.visible}</span>
          {i === cursorLine && (
            <span className="ml-2 inline-block h-[0.8em] w-[3.5px] animate-pulse bg-brass-light align-middle" />
          )}
        </span>
      ))}
    </h1>
  )
}
