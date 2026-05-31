import { Canvas } from '@react-three/fiber'
import Cube from './Game/game.jsx'
import './App.css'

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Cube />
    </Canvas>
  )
}
