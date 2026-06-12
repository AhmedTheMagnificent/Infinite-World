import { Canvas } from '@react-three/fiber'
import Game from './Game/game.jsx'
import './App.css'

export default function App() {
    return (
        <Canvas camera={{ position: [0, 6, 10], fov: 60 }}>
            
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
            <Game />
        </Canvas>
    )
}