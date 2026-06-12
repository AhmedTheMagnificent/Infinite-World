import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const MOVE_SPEED = 5
const CAMERA_DISTANCE = 6
const CAMERA_HEIGHT = 4
const MOUSE_SENSITIVITY = 0.002

const keys = {}

export default function Player() {
    const meshRef = useRef()
    const { camera, gl } = useThree()

    const direction = useRef(new THREE.Vector3())
    const playerPos = useRef(new THREE.Vector3(0, 0, 0))
    const playerAngle = useRef(0)

    useEffect(() => {
        const onKeyDown = (e) => { keys[e.code] = true }
        const onKeyUp = (e) => { keys[e.code] = false }

        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [])

    // Mouse look
    useEffect(() => {
        const canvas = gl.domElement

        const onMouseMove = (e) => {
            playerAngle.current -= e.movementX * MOUSE_SENSITIVITY
        }

        canvas.addEventListener('mousemove', onMouseMove)

        return () => {
            canvas.removeEventListener('mousemove', onMouseMove)
        }
    }, [gl])

    useFrame((_, delta) => {
        if (!meshRef.current) return

        direction.current.set(0, 0, 0)

        // Forward / backward
        if (keys['ArrowUp']) direction.current.z -= 1
        if (keys['ArrowDown']) direction.current.z += 1

        // STRAFE left / right (no rotation change)
        if (keys['ArrowLeft']) direction.current.x -= 1
        if (keys['ArrowRight']) direction.current.x += 1

        // Convert local movement → world movement based on camera angle
        direction.current
            .applyEuler(new THREE.Euler(0, playerAngle.current, 0))
            .normalize()
            .multiplyScalar(MOVE_SPEED * delta)

        playerPos.current.add(direction.current)

        // Apply to mesh
        meshRef.current.position.copy(playerPos.current)
        meshRef.current.rotation.y = playerAngle.current

        // Camera follow
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
            <mesh position={[0, 0, 0]}>
                <capsuleGeometry args={[0.4, 1, 8, 16]} />
                <meshStandardMaterial color="#4a90d9" />
            </mesh>
        </group>
    )
}