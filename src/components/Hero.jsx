import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight, FiArrowDown } from 'react-icons/fi'
import { EASE } from './ui.jsx'

const FIRST_NAME = 'Varun'
const LAST_NAME  = 'Muchanapally'
const ROLES      = ['AI systems', 'RAG pipelines', 'multi-agent apps', 'backend architecture']
const TAGLINE    = 'Designing intelligent infrastructure for the next generation of software.'

// Skills that circle the core in the orbit diagram: [label, ring radius %, start angle°]
const ORBIT_NODES = [
  ['Python', 31, 20], ['LLMs', 31, 200],
  ['FastAPI', 41, 110], ['RAG', 41, 290],
  ['React', 50, 60], ['PyTorch', 50, 170], ['AWS', 50, 320],
]
const RING_SPEED = { 31: 40, 41: 60, 50: 90 } // seconds per revolution

const WARP_MS = 2600

// ── Warp-speed intro ───────────────────────────────────────────────────────
function WarpCanvas({ onComplete }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const W = (canvas.width = window.innerWidth)
    const H = (canvas.height = window.innerHeight)

    const stars = Array.from({ length: 900 }, () => ({
      x: (Math.random() - 0.5) * W * 2,
      y: (Math.random() - 0.5) * H * 2,
      z: Math.random() * W,
      pz: 0,
      hue: Math.random() < 0.15 ? 'rgba(253,224,71,' : Math.random() < 0.5 ? 'rgba(125,211,252,' : 'rgba(196,198,240,',
    }))

    const start = performance.now()
    let rafId

    const draw = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / WARP_MS))
      // Accelerate to a peak at ~60%, then brake hard
      const speed = 2 + 55 * (t < 0.6 ? t / 0.6 : Math.pow(1 - (t - 0.6) / 0.4, 2))

      ctx.fillStyle = 'rgba(0,0,0,0.35)' // trails
      ctx.fillRect(0, 0, W, H)

      for (const s of stars) {
        s.pz = s.z
        s.z -= speed
        if (s.z <= 1) { s.z = W; s.pz = W }

        const sx = (s.x / s.z) * (W / 2) + W / 2
        const sy = (s.y / s.z) * (H / 2) + H / 2
        const px = (s.x / s.pz) * (W / 2) + W / 2
        const py = (s.y / s.pz) * (H / 2) + H / 2
        const k = 1 - s.z / W

        ctx.beginPath()
        ctx.strokeStyle = `${s.hue}${0.25 + k * 0.75})`
        ctx.lineWidth = Math.max(0.5, k * 2.5)
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }

      if (t >= 1) { onComplete(); return }
      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [onComplete])

  return (
    <motion.canvas
      ref={canvasRef}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'fixed', inset: 0, zIndex: 50, background: '#000' }}
    />
  )
}

// ── Letter-by-letter name reveal ───────────────────────────────────────────
function SplitLine({ text, delay, className }) {
  return (
    <span className={`line ${className ?? ''}`} aria-hidden="true">
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          className="char"
          initial={{ y: '110%', rotate: 8 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.035, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

function RoleRotator() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(n => (n + 1) % ROLES.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="role-swap aurora-text" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          initial={{ y: 18, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -18, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ display: 'inline-block' }}
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function OrbitDiagram() {
  return (
    <motion.div
      className="orbit-wrap"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.85, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
    >
      {[31, 41, 50].map(r => (
        <div key={r} className="orbit-ring" style={{ width: `${r * 2}%`, height: `${r * 2}%`, transform: 'translate(-50%, -50%)' }} />
      ))}

      {ORBIT_NODES.map(([label, r, angle]) => {
        // Negative delay sets the start angle; the counter-spin keeps labels upright
        const timing = { animationDuration: `${RING_SPEED[r]}s`, animationDelay: `-${(angle / 360) * RING_SPEED[r]}s` }
        return (
          <div key={label} className="orbit-spin" style={timing}>
            <div style={{ position: 'absolute', top: '50%', left: `${50 + r}%` }}>
              <div className="orbit-counter" style={timing}>
                <span className="orbit-node">
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--action)' }} />
                  {label}
                </span>
              </div>
            </div>
          </div>
        )
      })}

      <div className="orbit-core">
        <div>
          <div className="serif-italic" style={{ fontSize: 'clamp(30px, 3.4vw, 44px)', lineHeight: 1 }}>AI</div>
          <div className="mono" style={{ fontSize: 9, marginTop: 6 }}>core</div>
        </div>
      </div>
    </motion.div>
  )
}

function HeroContent() {
  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  })

  return (
    <div className="container hero">
      <div className="hero-copy">
        <motion.div className="status-pill" {...fade(0.1)}>
          <span className="pulse-dot" />
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink)' }}>AI Engineer · Orlando, FL</span>
        </motion.div>

        <h1 className="hero-name" aria-label={`${FIRST_NAME} ${LAST_NAME}`}>
          <SplitLine text={FIRST_NAME} delay={0.2} />
          <SplitLine text={LAST_NAME} delay={0.4} className="serif-italic aurora-text" />
        </h1>

        <motion.div className="hero-role" {...fade(1.0)}>
          <span>I build</span>
          <RoleRotator />
        </motion.div>

        <motion.p className="hero-tagline" {...fade(1.15)}>{TAGLINE}</motion.p>

        <motion.div className="hero-ctas" {...fade(1.3)}>
          <a
            href="#projects"
            className="btn btn-primary"
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Explore projects <FiArrowUpRight className="arrow" />
          </a>
          <a
            href="#contact"
            className="btn btn-ghost"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <OrbitDiagram />

      <motion.a
        href="#about"
        className="scroll-cue"
        aria-label="Scroll to About"
        onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="track" />
        <span className="mono" style={{ fontSize: 9, display: 'flex', alignItems: 'center', gap: 6 }}>
          Scroll <FiArrowDown />
        </span>
      </motion.a>
    </div>
  )
}

export default function Hero({ introDone, onIntroDone }) {
  // Skip the warp entirely for users who prefer reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) onIntroDone()
  }, [onIntroDone])

  // Any key press skips the intro
  useEffect(() => {
    if (introDone) return
    const skip = () => onIntroDone()
    window.addEventListener('keydown', skip)
    return () => window.removeEventListener('keydown', skip)
  }, [introDone, onIntroDone])

  return (
    <>
      <AnimatePresence>
        {!introDone && <WarpCanvas key="warp" onComplete={onIntroDone} />}
      </AnimatePresence>

      <AnimatePresence>
        {!introDone && (
          <motion.button
            key="skip"
            className="btn btn-ghost skip-intro"
            onClick={onIntroDone}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            Skip intro ↵
          </motion.button>
        )}
      </AnimatePresence>

      {introDone ? <HeroContent /> : <div style={{ minHeight: '100vh' }} />}
    </>
  )
}
