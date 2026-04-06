import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function BookModel({ tint, hovered = false }) {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y += hovered ? 0.02 : 0.008
    groupRef.current.rotation.x = 0.18 + Math.sin(state.clock.elapsedTime * 1.25) * 0.05
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.6) * 0.08
  })

  return (
    <group ref={groupRef} scale={1.15}>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 2.15, 0.34]} />
        <meshStandardMaterial color={tint} metalness={0.15} roughness={0.42} />
      </mesh>
      <mesh position={[0.72, 0, 0]}>
        <boxGeometry args={[0.14, 2.03, 0.3]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.18} />
      </mesh>
      <mesh position={[-0.77, 0, 0]}>
        <boxGeometry args={[0.04, 2.1, 0.28]} />
        <meshStandardMaterial color="#0f172a" roughness={0.38} />
      </mesh>
    </group>
  )
}

export function BookModelCanvas({ tint, hovered = false, className = '' }) {
  return (
    <div className={`relative h-44 overflow-hidden rounded-[24px] ${className}`}>
      <div className="pointer-events-none absolute inset-x-6 bottom-6 h-14 rounded-full bg-black/10 blur-3xl dark:bg-cyan-300/10" />
      <Canvas camera={{ position: [0, 0, 4.6], fov: 30 }} dpr={[1, 1.5]}>
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={1.8} />
        <directionalLight position={[2.8, 3.2, 4.8]} intensity={2.2} color="#dbeafe" />
        <directionalLight position={[-3.4, -2.8, -4]} intensity={1.1} color="#fef3c7" />
        <BookModel tint={tint} hovered={hovered} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.56, 0]}>
          <circleGeometry args={[1.65, 40]} />
          <meshBasicMaterial color="#0f172a" transparent opacity={0.12} />
        </mesh>
      </Canvas>
    </div>
  )
}
