import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import SectionHeader from './SectionHeader.jsx'
import { Reveal, trackSpotlight, withAlpha } from './ui.jsx'
import { PROJECTS } from '../data/projects.js'

const PATTERN = v => (v.rings ? 'pat-rings' : v.dots ? 'pat-dots' : v.lines ? 'pat-lines' : v.grid ? 'pat-grid' : '')

function ProjectCard({ project, index, featured, reverse }) {
  const { visual } = project
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 20 })

  const onMove = e => {
    trackSpotlight(e)
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <Reveal delay={featured ? 0 : (index % 2) * 0.1} style={{ height: '100%', gridColumn: featured ? '1 / -1' : undefined }}>
      <motion.a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`glass spotlight project-card${featured ? ' featured' : ''}${reverse ? ' reverse' : ''}`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY }}
      >
        <div className="project-visual" style={{ background: visual.bg }}>
          <div className={`pat-layer ${PATTERN(visual)}`} style={{ '--pat': withAlpha(visual.color, 0.22) }} />
          <div
            style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 50% 55%, ${withAlpha(visual.accent, 0.28)}, transparent 60%)`,
            }}
          />
          <span className="mono project-num">{String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
          <span className="project-stat">{project.stat.value} · {project.stat.label}</span>
          <span
            className="project-symbol"
            style={{ color: visual.accent, textShadow: `0 0 40px ${visual.accent}` }}
            aria-hidden="true"
          >
            {visual.symbol}
          </span>
        </div>

        <div className="project-body">
          <span className="mono" style={{ fontSize: 10 }}>{project.tagline}</span>
          <h3 className="project-name">{project.name}</h3>
          <p className="project-desc">{project.description}</p>
          <div className="project-tags">
            {project.tags.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
          <span className="mono project-launch">
            {project.href.includes('github.com') ? 'View on GitHub' : 'Launch project'} <FiArrowUpRight className="arrow" size={14} />
          </span>
        </div>
      </motion.a>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <div className="container">
      <SectionHeader
        index="03"
        eyebrow="Active missions"
        title={<>Selected <span className="serif-italic aurora-text">projects</span></>}
        subtitle="Things I've designed, built, and shipped — from LLM inference internals to multi-agent simulations."
      />
      <div className="projects-grid">
        {PROJECTS.map((p, i) => {
          // First card spans the row; so does the last if it would otherwise sit alone
          const last = i === PROJECTS.length - 1 && i > 0 && (PROJECTS.length - 1) % 2 === 1
          return <ProjectCard key={p.name} project={p} index={i} featured={i === 0 || last} reverse={last} />
        })}
      </div>
    </div>
  )
}
