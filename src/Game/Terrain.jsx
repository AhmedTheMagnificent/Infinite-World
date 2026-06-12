import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Terrain({ debug }) {
    const materialRef = useRef()

    useFrame(() => {
        if (!materialRef.current) return

        const u = materialRef.current.uniforms

        u.uAmplitude.value = debug.current.uAmplitude
        u.uFrequency.value = debug.current.uFrequency
        u.uLacunarity.value = debug.current.uLacunarity
        u.uPersistence.value = debug.current.uPersistence
        u.uOctaves.value = debug.current.uOctaves
        u.uHeightScale.value = debug.current.uHeightScale
        u.uSharpness.value = debug.current.uSharpness
    })

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 10, 512, 512]} />

            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uAmplitude: { value: 1.0 },
                    uFrequency: { value: 2.0 },
                    uLacunarity: { value: 2.0 },
                    uPersistence: { value: 0.5 },
                    uOctaves: { value: 5 },
                    uHeightScale: { value: 1.0 },
                    uSharpness: { value: 1.0 }
                }}
            />
        </mesh>
    )
}