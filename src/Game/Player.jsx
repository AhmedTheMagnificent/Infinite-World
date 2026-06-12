import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const MOVE_SPEED = 5
const CAMERA_DISTANCE = 8
const CAMERA_HEIGHT = 4
const keys = {}

export const playerPos = { current: new THREE.Vector3(0, 2, 0) } // ← shared ref

export default function Player() {
    const meshRef = useRef()
    const { camera } = useThree()
    const playerAngle = useRef(0)
    const direction = useRef(new THREE.Vector3())

    useEffect(() => {
        const onKeyDown = (e) => { keys[e.code] = true }
        const onKeyUp   = (e) => { keys[e.code] = false }
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup',   onKeyUp)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup',   onKeyUp)
        }
    }, [])

    useFrame((_, delta) => {
        if (!meshRef.current) return

        if (keys['ArrowLeft'])  playerAngle.current += 2 * delta
        if (keys['ArrowRight']) playerAngle.current -= 2 * delta

        direction.current.set(0, 0, 0)
        if (keys['ArrowUp'])   direction.current.z = -1
        if (keys['ArrowDown']) direction.current.z =  1

        direction.current
            .applyEuler(new THREE.Euler(0, playerAngle.current, 0))
            .multiplyScalar(MOVE_SPEED * delta)

        playerPos.current.add(direction.current)

        meshRef.current.position.copy(playerPos.current)
        meshRef.current.rotation.y = playerAngle.current

        const camOffset = new THREE.Vector3(
            Math.sin(playerAngle.current) * CAMERA_DISTANCE,
            CAMERA_HEIGHT,
            Math.cos(playerAngle.current) * CAMERA_DISTANCE
        )
        camera.position.copy(playerPos.current).add(camOffset)
        camera.lookAt(playerPos.current)
    })

    return (
        <group ref={meshRef}>
            <mesh position={[0, 1, 0]}>
                <capsuleGeometry args={[0.4, 1, 8, 16]} />
                <meshStandardMaterial color="#4a90d9" />
            </mesh>
            <mesh position={[0.15, 1.55, -0.35]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <mesh position={[-0.15, 1.55, -0.35]}>
                <sphereGeometry args={[0.08]} />
                <meshStandardMaterial color="white" />
            </mesh>
        </group>
    )
}