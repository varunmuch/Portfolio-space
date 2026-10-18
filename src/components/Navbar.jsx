import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './ui.jsx'

const NAV_LINKS = [
  { label: 'About',     id: 'about'     },
  { label: 'Education', id: 'education' },
  { label: 'Projects',  id: 'projects'  },
  { label: 'Contact',   id: 'contact'   },
]

export default function Navbar() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      let current = null
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="nav"
      aria-label="Primary"
      initial={{ opacity: 0, y: -24, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <a href="#hero" className="nav-logo" onClick={e => go(e, 'hero')} aria-label="Back to top">V</a>
      {NAV_LINKS.map(({ label, id }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={e => go(e, id)}
          className={`nav-link${active === id ? ' active' : ''}`}
          aria-current={active === id ? 'true' : undefined}
        >
          {active === id && (
            <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
          )}
          {label}
        </a>
      ))}
    </motion.nav>
  )
}
