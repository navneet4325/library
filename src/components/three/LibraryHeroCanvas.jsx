import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const BOOKS = [
  { color: '#38bdf8', position: [-0.95, -0.15, -0.08], speed: 1.1 },
  { color: '#34d399', position: [-0.4, -0.05, 0.1], speed: 1.25 },
  { color: '#f59e0b', position: [0.2, 0.05, -0.1], speed: 1.35 },
  { color: '#fb7185', position: [0.8, 0.12, 0.12], speed: 1.5 },
]

const PARTICLES = [
  [-1.8, 1.4, -1],
  [-1.1, 1.8, 0.4],
  [-0.2, 1.25, -0.8],
  [0.6, 1.7, 0.8],
  [1.2, 1.35, -0.5],
  [1.8, 1.65, 0.2],
  [-1.5, -0.2, 0.5],
  [1.5, -0.4, -0.6],
]

function FloatingBook({ color, position, speed, index }) {
  const bookRef = useRef(null)

  useFrame((state) => {
    if (!bookRef.current) {
      return
    }

    bookRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + index) * 0.12
    bookRef.current.rotation.y = state.clock.elapsedTime * (0.22 + index * 0.04)
    bookRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.08
  })

  return (
    <group ref={bookRef} position={position}>
      <mesh>
        <boxGeometry args={[0.78, 2.1, 0.34]} />
        <meshStandardMaterial color={color} roughness={0.38} metalness={0.18} />
      </mesh>
      <mesh position={[0.35, 0, 0.08]}>
        <boxGeometry args={[0.08, 1.96, 0.28]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.16} />
      </mesh>
    </group>
  )
}

function LibraryScene() {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y = state.pointer.x * 0.42 + Math.sin(state.clock.elapsedTime * 0.24) * 0.1
    groupRef.current.rotation.x = state.pointer.y * -0.18 + Math.cos(state.clock.elapsedTime * 0.18) * 0.04
  })

  return (
    <group ref={groupRef}>
      {BOOKS.map((book, index) => (
        <FloatingBook key={book.color} {...book} index={index} />
      ))}

      <mesh position={[0, -1.45, 0]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[4.8, 0.32, 2]} />
        <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.2} />
      </mesh>

      {PARTICLES.map((position, index) => (
        <mesh key={`${position.join('-')}-${index}`} position={position}>
          <sphereGeometry args={[0.04 + index * 0.003, 16, 16]} />
          <meshBasicMaterial color="#7dd3fc" transparent opacity={0.72} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.72, 0]}>
        <circleGeometry args={[3.25, 48]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.16} />
      </mesh>
    </group>
  )
}

export function LibraryHeroCanvas() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[32px]">
      <Canvas camera={{ position: [0, 0.6, 6], fov: 34 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.55} />
        <directionalLight position={[4, 6, 3]} intensity={2.8} color="#dbeafe" />
        <directionalLight position={[-4, -3, -2]} intensity={1.25} color="#fef3c7" />
        <LibraryScene />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-12 bottom-0 h-24 rounded-full bg-cyan-400/10 blur-3xl" />
    </div>
  )
}
