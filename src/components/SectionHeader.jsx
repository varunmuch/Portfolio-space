import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

// Outlined index numeral + eyebrow + title, shared by every section.
export default function SectionHeader({ index, eyebrow, title, subtitle }) {
  return (
    <motion.div
      className="section-head"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {index && (
        <motion.div
          className="section-index"
          variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {index}
        </motion.div>
      )}
      <div>
        {eyebrow && (
          <motion.div
            className="mono"
            style={{ marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span style={{ width: 28, height: 1, background: 'var(--action)' }} />
            {eyebrow}
          </motion.div>
        )}
        <motion.h2
          className="section-title"
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="section-sub"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
