import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Education from './components/Education.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Navbar from './components/Navbar.jsx'
import GalaxyBackground from './components/GalaxyBackground.jsx'
import { CursorGlow, ScrollProgress } from './components/ui.jsx'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const finishIntro = useCallback(() => setIntroDone(true), [])

  return (
    <>
      {/* Fixed galaxy canvas behind everything */}
      <GalaxyBackground />
      <CursorGlow />

      <AnimatePresence>
        {introDone && <Navbar key="nav" />}
      </AnimatePresence>
      {introDone && <ScrollProgress />}

      <main style={{ position: 'relative', zIndex: 2 }}>
        <section id="hero">
          <Hero introDone={introDone} onIntroDone={finishIntro} />
        </section>
        {introDone && (
          <>
            <section id="about"><About /></section>
            <section id="education"><Education /></section>
            <section id="projects"><Projects /></section>
            {/* <section id="certifications"><Certifications /></section> */}
            <section id="contact"><Contact /></section>
          </>
        )}
      </main>
    </>
  )
}
