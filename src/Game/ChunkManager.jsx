import { useFrame, useThree } from '@react-three/fiber'
import { useState, useRef, useEffect } from 'react'
import Chunk from './Chunk'
import { CHUNK_SIZE } from './Terrain'

const RENDER_DISTANCE = 2

function getChunksAround(cx, cz) {
    const next = []
    for (let x = cx - RENDER_DISTANCE; x <= cx + RENDER_DISTANCE; x++) {
        for (let z = cz - RENDER_DISTANCE; z <= cz + RENDER_DISTANCE; z++) {
            next.push({ chunkX: x, chunkZ: -z, key: `${x},${z}` })
        }
    }
    return next
}

export default function ChunkManager({ debug }) {
    const camera = useThree((state) => state.camera)  // ← direct selector, more reliable
    const [chunks, setChunks] = useState(() => getChunksAround(0, 0))  // ← spawn immediately
    const lastCamChunk = useRef({ x: null, z: null })

    useEffect(() => {
        console.log('ChunkManager mounted, camera:', camera.position)
        console.log('Initial chunks:', chunks.map(c => c.key))
    }, [])

    useFrame(() => {
        const camChunkX = Math.floor(camera.position.x / CHUNK_SIZE)
        const camChunkZ = Math.floor(camera.position.z / CHUNK_SIZE)

        if (
            camChunkX === lastCamChunk.current.x &&
            camChunkZ === lastCamChunk.current.z
        ) return

        lastCamChunk.current = { x: camChunkX, z: camChunkZ }

        console.log('Chunk update → camera world:', camera.position.x.toFixed(1), camera.position.z.toFixed(1))
        console.log('Chunk update → chunk coords:', camChunkX, camChunkZ)

        setChunks(getChunksAround(camChunkX, camChunkZ))
    })

    return (
        <>
            {chunks.map(({ chunkX, chunkZ, key }) => (
                <Chunk key={key} chunkX={chunkX} chunkZ={chunkZ} debug={debug} />
            ))}
        </>
    )
}