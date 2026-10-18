import { useEffect } from 'react'
import { motion, useMotionValue, useScroll, useSpring } from 'framer-motion'

export const EASE = [0.16, 1, 0.3, 1]

// Fade-and-rise on first scroll into view.
export function Reveal({ children, delay = 0, y = 28, ...rest }) {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// Re-alpha an rgba() or #RRGGBB colour.
export function withAlpha(color, a) {
  if (color.startsWith('#')) return color.slice(0, 7) + Math.round(a * 255).toString(16).padStart(2, '0')
  return color.replace(/[\d.]+\)$/, `${a})`)
}

// Feeds cursor position into the .spotlight CSS gradient.
export function trackSpotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

export function CursorGlow() {
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const sx = useSpring(x, { stiffness: 120, damping: 22 })
  const sy = useSpring(y, { stiffness: 120, damping: 22 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const move = e => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} />
}
