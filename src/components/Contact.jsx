import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiCopy, FiCheck, FiArrowUp } from 'react-icons/fi'
import SectionHeader from './SectionHeader.jsx'
import { Reveal, trackSpotlight } from './ui.jsx'

const EMAIL = 'varunmuchanapally@gmail.com'

const SOCIALS = [
  { label: 'GitHub',   handle: 'varunmuchanapally', href: 'https://github.com/varunmuchanapally', desc: 'Code & open source',   Icon: FiGithub   },
  { label: 'LinkedIn', handle: 'varun-pm',          href: 'https://www.linkedin.com/in/varun-pm/', desc: 'Professional network', Icon: FiLinkedin },
  { label: 'Email',    handle: EMAIL,               href: `mailto:${EMAIL}`,                      desc: 'Fastest reply',        Icon: FiMail     },
]

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <button className="btn btn-ghost" onClick={copy} aria-label="Copy email address">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'done' : 'copy'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: copied ? '#4ADE80' : undefined }}
        >
          {copied ? <><FiCheck /> Copied</> : <><FiCopy /> Copy email</>}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Contact() {
  return (
    <div className="container">
      <SectionHeader index="04" eyebrow="Comms array" title="Contact" />

      <Reveal>
        <h3 className="contact-hero">
          Let's build something <span className="serif-italic aurora-text">intelligent</span> together.
        </h3>
      </Reveal>

      <Reveal delay={0.1} className="email-row">
        <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
          Say hello <FiArrowUpRight className="arrow" />
        </a>
        <CopyEmail />
      </Reveal>

      <div className="social-grid">
        {SOCIALS.map(({ label, handle, href, desc, Icon }, i) => (
          <Reveal key={label} delay={i * 0.08}>
            <a
              className="glass spotlight social-card"
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              onMouseMove={trackSpotlight}
            >
              <div className="social-top">
                <span className="social-icon"><Icon size={20} /></span>
                <FiArrowUpRight className="arrow" size={22} />
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, marginBottom: 10 }}>{desc}</div>
                <div className="social-label">{label}</div>
                <div className="social-handle">{handle}</div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <footer className="footer">
        <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Varun Muchanapally · Built with React, Framer Motion & Three.js
        </span>
        <a
          href="#hero"
          className="mono"
          style={{ fontSize: 10, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          Back to orbit <FiArrowUp />
        </a>
      </footer>
    </div>
  )
}
