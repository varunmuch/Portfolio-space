import { motion } from 'framer-motion'
import { FiCode, FiCpu, FiDatabase, FiServer, FiLayout, FiCloud, FiLayers } from 'react-icons/fi'
import SectionHeader from './SectionHeader.jsx'
import { Reveal, trackSpotlight, EASE } from './ui.jsx'
import { PROJECTS } from '../data/projects.js'

const SKILL_GROUPS = [
  { label: 'AI & LLM Systems',      Icon: FiCpu,      wide: true, skills: ['LLMs', 'RAG', 'AI Agents', 'LangChain', 'LlamaIndex', 'Hugging Face', 'PyTorch'] },
  { label: 'Languages',             Icon: FiCode,     skills: ['Python', 'Java', 'TypeScript', 'SQL', 'C++', 'JavaScript', 'R'] },
  { label: 'Vector DB & Retrieval', Icon: FiLayers,   skills: ['FAISS', 'Pinecone', 'Weaviate', 'ChromaDB'] },
  { label: 'Backend & APIs',        Icon: FiServer,   skills: ['FastAPI', 'Flask', 'Node.js', 'Express.js', 'REST APIs'] },
  { label: 'Frontend & Apps',       Icon: FiLayout,   skills: ['React', 'Tailwind CSS', 'Streamlit'] },
  { label: 'Cloud & AI Platforms',  Icon: FiCloud,    skills: ['AWS SageMaker', 'Azure OpenAI', 'Azure SQL'] },
  { label: 'Data & Databases',      Icon: FiDatabase, skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ETL'] },
]

const STATS = [
  { value: '3.9',                       label: 'M.S. GPA' },
  { value: String(PROJECTS.length),     label: 'Live projects' },
  { value: `${SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0)}+`, label: 'Technologies' },
]

const MARQUEE = ['Retrieval-Augmented Generation', 'Multi-Agent Systems', 'Backend Architecture', 'LLM Engineering', 'Full-Stack Products']

function SkillCard({ group, delay }) {
  const { Icon } = group
  return (
    <Reveal delay={delay} className={`glass spotlight skill-card${group.wide ? ' wide' : ''}`} onMouseMove={trackSpotlight}>
      <div className="skill-card-head" style={{ position: 'relative' }}>
        <span className="skill-icon"><Icon size={16} /></span>
        <span className="mono" style={{ color: 'var(--ink)' }}>{group.label}</span>
        <span className="mono" style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>
          {String(group.skills.length).padStart(2, '0')}
        </span>
      </div>
      <motion.div
        className="skill-list"
        style={{ position: 'relative' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: delay + 0.15 } } }}
      >
        {group.skills.map(s => (
          <motion.span
            key={s}
            className="chip"
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {s}
          </motion.span>
        ))}
      </motion.div>
    </Reveal>
  )
}

export default function About() {
  return (
    <>
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="Pilot dossier"
          title={<>About <span className="serif-italic aurora-text">me</span></>}
        />

        <div className="about-grid">
          <Reveal className="glass bio-card">
            <div className="mono" style={{ marginBottom: 22 }}>// Biography</div>
            <p className="bio-lead">
              I'm Varun, an AI Engineer bridging the gap between{' '}
              <span className="serif-italic aurora-text">deep research</span> and functional products.
            </p>
            <p style={{ marginTop: 20, color: 'var(--text-secondary)', fontSize: 16 }}>
              I optimize the invisible systems that power the next generation of intelligent software —
              from retrieval pipelines and agent orchestration to the APIs and interfaces that put them in people's hands.
            </p>

            <div className="stats">
              {STATS.map(s => (
                <div key={s.label} className="stat">
                  <div className="stat-value">{s.value}</div>
                  <div className="mono stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="skills-grid">
            {SKILL_GROUPS.map((g, i) => (
              <SkillCard key={g.label} group={g} delay={(i % 2) * 0.08} />
            ))}
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="marquee-item">
              {m} <span className="marquee-star">✦</span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
