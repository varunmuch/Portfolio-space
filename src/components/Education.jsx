import { motion } from 'framer-motion'
import { FiMapPin, FiCalendar, FiAward } from 'react-icons/fi'
import SectionHeader from './SectionHeader.jsx'
import { Reveal, trackSpotlight, EASE } from './ui.jsx'

const EDUCATION = [
  {
    degree:     'M.S. in Computer Science',
    university: 'University of Central Florida',
    location:   'Orlando, FL',
    gpa:        3.9,
    gpaMax:     4.0,
    start:      new Date(2024, 7, 1),  // Aug 2024
    end:        new Date(2026, 4, 1),  // May 2026
  },
  // {
  //   degree:     'B.Tech. in Computer Science',
  //   university: 'B V Raju Institute of Technology',
  //   location:   'Hyderabad, India',
  //   gpa:        8.05,
  //   gpaMax:     10,
  //   start:      new Date(2020, 7, 1),
  //   end:        new Date(2024, 5, 1),
  // },
]

const fmt = d => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

function GpaGauge({ gpa, max }) {
  const R = 86
  const C = 2 * Math.PI * R
  return (
    <div className="gauge" aria-label={`GPA ${gpa} out of ${max}`}>
      <svg width="210" height="210" viewBox="0 0 210 210" style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="gpa-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C4C6F0" />
            <stop offset="50%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>
        </defs>
        <circle cx="105" cy="105" r={R} fill="none" stroke="rgba(166,168,205,0.12)" strokeWidth="10" />
        <circle cx="105" cy="105" r={R} fill="none" stroke="rgba(166,168,205,0.25)" strokeWidth="1" strokeDasharray="2 6" transform="scale(0.86) translate(17 17)" />
        <motion.circle
          cx="105" cy="105" r={R} fill="none"
          stroke="url(#gpa-grad)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * (1 - gpa / max) }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
        />
      </svg>
      <div className="gauge-center">
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, lineHeight: 1 }}>{gpa.toFixed(1)}</div>
          <div className="mono" style={{ fontSize: 9, marginTop: 6 }}>GPA / {max.toFixed(1)}</div>
        </div>
      </div>
    </div>
  )
}

function EducationCard({ ed }) {
  const now      = Date.now()
  const progress = Math.min(1, Math.max(0, (now - ed.start) / (ed.end - ed.start)))
  const complete = progress >= 1

  return (
    <Reveal>
      <div className="glass spotlight edu-card" onMouseMove={trackSpotlight}>
        <div style={{ position: 'relative' }}>
          <span className="edu-badge">
            <FiAward size={12} /> {complete ? 'Mission complete' : 'In progress'}
          </span>
          <h3 className="edu-uni">{ed.university}</h3>
          <div className="serif-italic aurora-text" style={{ fontSize: 'clamp(20px, 2.2vw, 26px)' }}>{ed.degree}</div>

          <div className="edu-meta">
            <span className="chip"><FiCalendar size={13} /> {fmt(ed.start)} — {fmt(ed.end)}</span>
            <span className="chip"><FiMapPin size={13} /> {ed.location}</span>
          </div>

          <div className="timeline">
            <div className="mono" style={{ fontSize: 10 }}>Flight path</div>
            <div className="timeline-bar">
              <motion.div
                className="timeline-fill"
                initial={{ width: 0 }}
                whileInView={{ width: `${progress * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
              />
              <motion.div
                className="timeline-ship"
                initial={{ left: 0 }}
                whileInView={{ left: `${progress * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.4, ease: EASE }}
              />
            </div>
            <div className="timeline-labels">
              <span className="mono" style={{ fontSize: 9, color: 'var(--text-muted)' }}>Launch · {fmt(ed.start)}</span>
              <span className="mono" style={{ fontSize: 9, color: 'var(--text-muted)' }}>Landing · {fmt(ed.end)}</span>
            </div>
          </div>
        </div>

        <GpaGauge gpa={ed.gpa} max={ed.gpaMax} />
      </div>
    </Reveal>
  )
}

export default function Education() {
  return (
    <div className="container">
      <SectionHeader
        index="02"
        eyebrow="Training records"
        title={<>Edu<span className="serif-italic aurora-text">cation</span></>}
      />
      <div style={{ display: 'grid', gap: 24 }}>
        {EDUCATION.map(ed => <EducationCard key={ed.university} ed={ed} />)}
      </div>
    </div>
  )
}
