import Terrain, { CHUNK_SIZE } from "./Terrain";

export default function Chunk({ chunkX, chunkZ, debug }) {
    return (
        <Terrain debug={debug} chunkX={chunkX} chunkZ={chunkZ} />
    )
}