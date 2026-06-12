import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Cube() {
  const cubeRef = useRef()

  useFrame(() => {
    cubeRef.current.rotation.x += 0.01
    cubeRef.current.rotation.y += 0.013
  })

  return (
    <>
      <mesh ref={cubeRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1]} />
        <meshNormalMaterial />
      </mesh>
      
    </>
  )
}