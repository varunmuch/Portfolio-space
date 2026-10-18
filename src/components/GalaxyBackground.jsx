import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Starfield ────────────────────────────────────────────────
function StarField() {
  const ref = useRef()
  const count = 8000

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)
    const sizes     = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 300
      positions[i * 3 + 1] = (Math.random() - 0.5) * 300
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 20

      // Color variety: blue-white, pure white, warm yellow-white, cool blue
      const t = Math.random()
      if (t < 0.45) {
        // Blue-white
        colors[i * 3]     = 0.75 + Math.random() * 0.25
        colors[i * 3 + 1] = 0.80 + Math.random() * 0.20
        colors[i * 3 + 2] = 1.0
      } else if (t < 0.72) {
        // Pure white
        const v = 0.88 + Math.random() * 0.12
        colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = v
      } else if (t < 0.88) {
        // Warm yellow-white
        colors[i * 3]     = 1.0
        colors[i * 3 + 1] = 0.92 + Math.random() * 0.08
        colors[i * 3 + 2] = 0.70 + Math.random() * 0.20
      } else {
        // Deep blue
        colors[i * 3]     = 0.40 + Math.random() * 0.20
        colors[i * 3 + 1] = 0.55 + Math.random() * 0.20
        colors[i * 3 + 2] = 1.0
      }

      // Vary brightness
      const b = 0.35 + Math.random() * 0.65
      colors[i * 3]     *= b
      colors[i * 3 + 1] *= b
      colors[i * 3 + 2] *= b

      // Vary size — most small, some bright big ones
      sizes[i] = Math.random() < 0.04
        ? 0.35 + Math.random() * 0.25   // bright hero stars
        : 0.08 + Math.random() * 0.14   // normal stars
    }

    return { positions, colors, sizes }
  }, [])

  useFrame(state => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.001
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        vertexColors
        transparent
        opacity={1.0}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ── Milky Way band ────────────────────────────────────────────
function MilkyWay() {
  const count = 6000

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Concentrated band across the sky
      const angle  = Math.random() * Math.PI * 2
      const spread = (Math.random() - 0.5) * 18   // band width
      const r      = 80 + Math.random() * 60

      positions[i * 3]     = Math.cos(angle) * r
      positions[i * 3 + 1] = spread
      positions[i * 3 + 2] = Math.sin(angle) * r * 0.35  // flatten into a band

      // Milky, slightly blue-white
      const v = 0.55 + Math.random() * 0.45
      colors[i * 3]     = v * 0.80
      colors[i * 3 + 1] = v * 0.85
      colors[i * 3 + 2] = v
    }

    return { positions, colors }
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ── Sun ──────────────────────────────────────────────────────
function Sun() {
  const c1 = useRef()
  const c2 = useRef()
  const c3 = useRef()
  const c4 = useRef()
  const coreRef = useRef()

  useFrame(state => {
    const t = state.clock.elapsedTime
    if (c1.current) c1.current.scale.setScalar(1 + Math.sin(t * 1.1) * 0.04)
    if (c2.current) c2.current.scale.setScalar(1 + Math.sin(t * 0.7) * 0.06)
    if (c3.current) c3.current.scale.setScalar(1 + Math.sin(t * 0.4) * 0.09)
    if (c4.current) c4.current.scale.setScalar(1 + Math.sin(t * 0.2) * 0.12)
    if (coreRef.current) coreRef.current.material.opacity = 0.92 + Math.sin(t * 2.3) * 0.08
  })

  return (
    <group position={[0, 0, -6]}>
      <mesh ref={c4}>
        <sphereGeometry args={[11, 32, 32]} />
        <meshBasicMaterial color="#ff1100" transparent opacity={0.008} />
      </mesh>
      <mesh ref={c3}>
        <sphereGeometry args={[7.5, 32, 32]} />
        <meshBasicMaterial color="#ff3300" transparent opacity={0.025} />
      </mesh>
      <mesh ref={c2}>
        <sphereGeometry args={[5.5, 32, 32]} />
        <meshBasicMaterial color="#ff7700" transparent opacity={0.07} />
      </mesh>
      <mesh ref={c1}>
        <sphereGeometry args={[3.8, 32, 32]} />
        <meshBasicMaterial color="#ffbb00" transparent opacity={0.18} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.75, 64, 64]} />
        <meshBasicMaterial color="#ff9900" transparent opacity={0.55} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#ffdd00" />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshBasicMaterial color="#fff176" />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.92} />
      </mesh>
      <pointLight color="#ffffff" intensity={12}  distance={200} decay={0.8} />
      <pointLight color="#fff4aa" intensity={8}   distance={150} decay={1.0} />
      <pointLight color="#ff9900" intensity={4}   distance={80}  decay={1.4} />
      <pointLight color="#ff4400" intensity={2}   distance={50}  decay={1.8} />
    </group>
  )
}

// ── Orbit ring ───────────────────────────────────────────────
function OrbitRing({ radius, tilt = 0 }) {
  const geometry = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 256; i++) {
      const a = (i / 256) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [radius])

  return (
    <group rotation={[tilt, 0, 0]}>
      <line geometry={geometry}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.055} />
      </line>
    </group>
  )
}

// ── Saturn / Uranus rings ────────────────────────────────────
function PlanetRings({ bands, color, tiltX, tiltZ = 0.3 }) {
  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      {bands.map(([radius, tube, opacity], i) => (
        <mesh key={i}>
          <torusGeometry args={[radius, tube, 3, 140]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
      ))}
    </group>
  )
}

// ── Moon ─────────────────────────────────────────────────────
function Moon({ orbitR, size, speed, color, initialAngle }) {
  const ref = useRef()
  useFrame(state => {
    const a = initialAngle + state.clock.elapsedTime * speed
    if (ref.current) {
      ref.current.position.x = Math.cos(a) * orbitR
      ref.current.position.z = Math.sin(a) * orbitR
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 20, 20]} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  )
}

// ── Atmosphere ───────────────────────────────────────────────
function Atmosphere({ size, color, opacity }) {
  return (
    <mesh>
      <sphereGeometry args={[size * 1.10, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.FrontSide} />
    </mesh>
  )
}

// ── Planet ───────────────────────────────────────────────────
function Planet({ orbitRadius, size, color, emissive, speed, initialAngle, axialTilt = 0, orbitTilt = 0, rings = null, moons = [], atmosphere = null }) {
  const orbitRef  = useRef()
  const planetRef = useRef()

  useFrame(state => {
    const t = state.clock.elapsedTime
    if (orbitRef.current)  orbitRef.current.rotation.y  = initialAngle + t * speed
    if (planetRef.current) planetRef.current.rotation.y = t * 0.2
  })

  return (
    <group rotation={[orbitTilt, 0, 0]}>
      <group ref={orbitRef}>
        <group position={[orbitRadius, 0, -6]}>
          {atmosphere && <Atmosphere size={size} color={atmosphere.color} opacity={atmosphere.opacity} />}
          <mesh ref={planetRef} rotation={[axialTilt, 0, 0]}>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.12} roughness={0.80} metalness={0.05} />
          </mesh>
          {rings && <PlanetRings bands={rings.bands} color={rings.color} tiltX={rings.tiltX} tiltZ={rings.tiltZ} />}
          {moons.map((m, i) => <Moon key={i} {...m} />)}
        </group>
      </group>
    </group>
  )
}

// ── Asteroid belt ─────────────────────────────────────────────
function AsteroidBelt() {
  const ref   = useRef()
  const count = 1400

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle  = Math.random() * Math.PI * 2
      const radius = 13.0 + (Math.random() - 0.5) * 3.0
      arr[i * 3]     = Math.cos(angle) * radius
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.5
      arr[i * 3 + 2] = Math.sin(angle) * radius
    }
    return arr
  }, [])

  useFrame(state => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.006
  })

  return (
    <points ref={ref} position={[0, 0, -6]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#aa9977" transparent opacity={0.65} sizeAttenuation />
    </points>
  )
}

// ── Planet data ───────────────────────────────────────────────
const PLANETS = [
  { name: 'Mercury', orbitRadius: 4.0,  size: 0.28, color: '#b5a9a0', emissive: '#554840', speed: 0.055, initialAngle: 0.6, axialTilt: 0.03 },
  { name: 'Venus',   orbitRadius: 5.8,  size: 0.46, color: '#e2c97e', emissive: '#8a6010', speed: 0.040, initialAngle: 2.1, axialTilt: 3.1,  atmosphere: { color: '#f0d880', opacity: 0.14 } },
  { name: 'Earth',   orbitRadius: 7.8,  size: 0.50, color: '#1a4499', emissive: '#051530', speed: 0.032, initialAngle: 4.2, axialTilt: 0.41, atmosphere: { color: '#6699ff', opacity: 0.13 }, moons: [{ orbitR: 0.85, size: 0.13, speed: 0.18, color: '#bbbbbb', initialAngle: 1.0 }] },
  { name: 'Mars',    orbitRadius: 10.0, size: 0.38, color: '#c1440e', emissive: '#6b1500', speed: 0.025, initialAngle: 1.4, axialTilt: 0.44, atmosphere: { color: '#e06030', opacity: 0.07 }, moons: [{ orbitR: 0.65, size: 0.055, speed: 0.40, color: '#888888', initialAngle: 0.5 }, { orbitR: 0.90, size: 0.040, speed: 0.28, color: '#777777', initialAngle: 2.8 }] },
  { name: 'Jupiter', orbitRadius: 16.5, size: 1.40, color: '#c88b5a', emissive: '#5a3010', speed: 0.015, initialAngle: 3.5, axialTilt: 0.05, atmosphere: { color: '#ddaa70', opacity: 0.09 }, moons: [{ orbitR: 1.80, size: 0.14, speed: 0.22, color: '#ddaa44', initialAngle: 0.0 }, { orbitR: 2.20, size: 0.12, speed: 0.16, color: '#ddccaa', initialAngle: 2.0 }, { orbitR: 2.65, size: 0.16, speed: 0.11, color: '#aaaaaa', initialAngle: 4.0 }, { orbitR: 3.10, size: 0.11, speed: 0.08, color: '#887766', initialAngle: 1.5 }] },
  { name: 'Saturn',  orbitRadius: 22.0, size: 1.20, color: '#e4d191', emissive: '#7a6010', speed: 0.010, initialAngle: 5.8, axialTilt: 0.47, atmosphere: { color: '#f0e0a0', opacity: 0.08 }, rings: { bands: [[1.65, 0.28, 0.45], [2.05, 0.22, 0.35], [2.45, 0.16, 0.25], [2.80, 0.10, 0.15]], color: '#d4c070', tiltX: Math.PI / 2.5, tiltZ: 0.25 }, moons: [{ orbitR: 3.2, size: 0.20, speed: 0.09, color: '#ddddcc', initialAngle: 0.8 }, { orbitR: 3.8, size: 0.10, speed: 0.06, color: '#aaaaaa', initialAngle: 3.2 }] },
  { name: 'Uranus',  orbitRadius: 27.5, size: 0.90, color: '#7de8e8', emissive: '#1a6666', speed: 0.007, initialAngle: 2.2, axialTilt: 1.71, atmosphere: { color: '#aaffff', opacity: 0.12 }, rings: { bands: [[1.25, 0.10, 0.30], [1.45, 0.07, 0.22], [1.62, 0.05, 0.15]], color: '#88dddd', tiltX: Math.PI / 2.0, tiltZ: 0.1 }, moons: [{ orbitR: 1.8, size: 0.09, speed: 0.14, color: '#aacccc', initialAngle: 1.5 }, { orbitR: 2.2, size: 0.07, speed: 0.10, color: '#99bbbb', initialAngle: 4.0 }] },
  { name: 'Neptune', orbitRadius: 32.5, size: 0.86, color: '#2244dd', emissive: '#080e55', speed: 0.005, initialAngle: 4.9, axialTilt: 0.49, atmosphere: { color: '#4466ff', opacity: 0.13 }, moons: [{ orbitR: 1.4, size: 0.13, speed: 0.12, color: '#99aacc', initialAngle: 2.2 }] },
]

// ── Camera rig — glides through the system as the page scrolls ─
const LOOK_AT = new THREE.Vector3(0, 0, -6)

function CameraRig() {
  const target = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ camera, pointer, size }) => {
    // Shift the projection so the sun sits right of the text column (or low-right on phones)
    const wide = size.width > 960
    camera.setViewOffset(size.width, size.height, wide ? -size.width * 0.2 : -size.width * 0.3, wide ? 0 : -size.height * 0.22, size.width, size.height)

    const max = document.documentElement.scrollHeight - window.innerHeight
    const p   = max > 0 ? window.scrollY / max : 0
    target.set(
      Math.sin(p * Math.PI) * 14 + pointer.x * 1.6,
      18 - p * 13 + pointer.y * 1.2,
      30 - Math.sin(p * Math.PI) * 9,
    )
    camera.position.lerp(target, 0.04)
    camera.lookAt(LOOK_AT)
  })
  return null
}

// ── Scene ─────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.18} color="#223366" />
      <StarField />
      <MilkyWay />
      <Sun />
      <AsteroidBelt />
      {PLANETS.map(p => <OrbitRing key={p.name + '-ring'} radius={p.orbitRadius} tilt={p.orbitTilt || 0} />)}
      {PLANETS.map(p => <Planet key={p.name} {...p} />)}
    </>
  )
}

// ── Export ────────────────────────────────────────────────────
export default function GalaxyBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 18, 30], fov: 58 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
        eventSource={document.body}
        eventPrefix="client"
        style={{ background: '#03030a' }}
      >
        <Scene />
      </Canvas>

      {/* Lighter vignette — just enough to keep text readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 46%, transparent 20%, rgba(3,3,10,0.45) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Extra dimming on narrow screens, where text sits over the whole scene */}
      <div className="galaxy-dim" />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '28vh',
        background: 'linear-gradient(to bottom, transparent, #03030a)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}