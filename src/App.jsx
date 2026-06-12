import { Canvas } from '@react-three/fiber'
// import Cube from './Game/Game.jsx'
import './App.css'
import { OrbitControls } from '@react-three/drei'
import Terrain from './Game/Terrain.jsx'
import Debug from './Game/Debug.jsx'

export default function App() {
  const debug = Debug();
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* <Cube /> */}
      <Terrain debug={debug} />
      <OrbitControls />
    </Canvas>
  )
}
