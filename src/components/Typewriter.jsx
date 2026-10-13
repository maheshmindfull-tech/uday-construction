import { useEffect, useState, useMemo } from 'react'

export default function Typewriter({ lines, className = '' }) {
  // Animation phases: 'dropping' | 'settled' | 'rising'
  const [phase, setPhase] = useState('dropping')
  const [droppedIndex, setDroppedIndex] = useState(0)

  // Split lines into structured character objects with global indices
  const linesData = useMemo(() => {
    let globalIndex = 0
    return lines.map((line, lineIndex) => {
      const chars = line.split('').map((char) => {
        const item = {
          char: char === ' ' ? '\u00A0' : char,
          isSpace: char === ' ',
          globalIndex,
          lineIndex,
        }
        globalIndex++
        return item
      })
      return { line, lineIndex, chars }
    })
  }, [lines])

  const allChars = useMemo(() => {
    return linesData.flatMap((l) => l.chars)
  }, [linesData])

  const totalChars = allChars.length

  useEffect(() => {
    let timeout

    if (phase === 'dropping') {
      if (droppedIndex < totalChars) {
        // Drop distinct single letter all the way from top navbar area
        const isSpace = allChars[droppedIndex]?.isSpace
        const delay = isSpace ? 40 : 105 // 105ms spacing creates a continuous, visible single-letter gravity shower
        timeout = setTimeout(() => {
          setDroppedIndex((prev) => prev + 1)
        }, delay)
      } else {
        // All individual letters have plummeted down and landed; switch to settled
        timeout = setTimeout(() => {
          setPhase('settled')
        }, 400)
      }
    } else if (phase === 'settled') {
      // Pause so user comfortably reads the complete headline
      timeout = setTimeout(() => {
        setPhase('rising')
      }, 2600)
    } else if (phase === 'rising') {
      // Letters glide back up line-by-line as requested ("varti jatana thik ahe")
      const riseDuration = lines.length * 140 + 450
      timeout = setTimeout(() => {
        setDroppedIndex(0)
        setPhase('dropping')
      }, riseDuration)
    }

    return () => clearTimeout(timeout)
  }, [phase, droppedIndex, totalChars, lines.length, allChars])

  return (
    <h1
      aria-label={lines.join(' ')}
      className={`font-display font-medium tracking-[-0.02em] text-white select-none ${className}`}
    >
      {linesData.map((lineObj, i) => (
        <span
          key={lineObj.line}
          aria-hidden="true"
          className={`relative block overflow-visible leading-[1.12] pb-1 sm:pb-2 text-4xl sm:text-6xl md:text-7xl lg:text-[84px] ${
            i > 0 ? 'mt-2' : ''
          }`}
        >
          {/* Static invisible text preserves full line height & width in DOM (Zero layout shift) */}
          <span className="invisible select-none opacity-0 pointer-events-none" aria-hidden="true">
            {lineObj.line}
          </span>

          {/* Kinetic character overlay: Letters fall from the TOP navbar area like falling objects */}
          <span className="absolute left-0 top-0 whitespace-nowrap">
            {lineObj.chars.map((item, charIdx) => {
              let style = {}

              if (phase === 'dropping') {
                if (item.globalIndex < droppedIndex) {
                  // Already dropped from the top and settled in place
                  style = {
                    transform: 'translateY(0%)',
                    opacity: 1,
                  }
                } else if (item.globalIndex === droppedIndex) {
                  // Actively plummeting down from the top navbar area like a falling object
                  style = {
                    animation: 'gravityObjectDrop 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
                  }
                } else {
                  // Waiting to drop (hidden high up at navbar level)
                  style = {
                    transform: 'translateY(-240px)',
                    opacity: 0,
                    pointerEvents: 'none',
                  }
                }
              } else if (phase === 'settled') {
                // Fully formed words visible
                style = {
                  transform: 'translateY(0%)',
                  opacity: 1,
                }
              } else if (phase === 'rising') {
                // Glide back up line by line in a clean unified wave
                style = {
                  transform: 'translateY(-80px)',
                  opacity: 0,
                  filter: 'blur(3px)',
                  transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease, filter 0.35s ease',
                  transitionDelay: `${item.lineIndex * 140 + charIdx * 12}ms`,
                }
              }

              return (
                <span
                  key={charIdx}
                  className="inline-block will-change-transform"
                  style={style}
                >
                  {item.char}
                </span>
              )
            })}
          </span>
        </span>
      ))}
    </h1>
  )
}
