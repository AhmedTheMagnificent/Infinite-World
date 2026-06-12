import vertexShader from "./shaders/vertex.glsl?raw";
import fragmentShader from "./shaders/fragment.glsl?raw";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const CHUNK_SIZE = 10

export default function Terrain({ debug, chunkX = 0, chunkZ = 0 }) {
    const materialRef = useRef()

    useFrame(() => {
        if (!materialRef.current) return

        const u = materialRef.current.uniforms
        const p = debug.current

        u.uAmplitude.value    = p.uAmplitude
        u.uFrequency.value    = p.uFrequency
        u.uLacunarity.value   = p.uLacunarity
        u.uPersistence.value  = p.uPersistence
        u.uOctaves.value      = p.uOctaves
        u.uHeightScale.value  = p.uHeightScale
        u.uSharpness.value    = p.uSharpness
        u.uChunkOffsetX.value = chunkX * CHUNK_SIZE
        u.uChunkOffsetZ.value = chunkZ * CHUNK_SIZE
    })

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[CHUNK_SIZE, CHUNK_SIZE, 128, 128]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uAmplitude:    { value: debug.current.uAmplitude },
                    uFrequency:    { value: debug.current.uFrequency },
                    uLacunarity:   { value: debug.current.uLacunarity },
                    uPersistence:  { value: debug.current.uPersistence },
                    uOctaves:      { value: debug.current.uOctaves },
                    uHeightScale:  { value: debug.current.uHeightScale },
                    uSharpness:    { value: debug.current.uSharpness },
                    uChunkOffsetX: { value: chunkX * CHUNK_SIZE },
                    uChunkOffsetZ: { value: chunkZ * CHUNK_SIZE },
                }}
            />
        </mesh>
    )
}