import { useEffect, useState } from 'react'

function easeOutExpo(value) {
  return value === 1 ? 1 : 1 - 2 ** (-10 * value)
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 900,
  decimals = 0,
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let frameId = 0
    let startTime = 0

    function animateFrame(timestamp) {
      if (!startTime) {
        startTime = timestamp
      }

      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easedProgress = easeOutExpo(progress)
      const nextValue = Number(value) * easedProgress
      setDisplayValue(nextValue)

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animateFrame)
      }
    }

    frameId = window.requestAnimationFrame(animateFrame)
    return () => window.cancelAnimationFrame(frameId)
  }, [duration, value])

  return (
    <span className="font-display text-3xl font-semibold tracking-tight text-[var(--text-primary)] lg:text-4xl">
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  )
}
