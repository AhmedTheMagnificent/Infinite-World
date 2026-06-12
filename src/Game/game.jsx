import Debug from './Debug'
import ChunkManager from './ChunkManager'
import Player from './Player'

export default function Game() {
    const debug = Debug()

    return (
        <>
            <Player />
            <ChunkManager debug={debug} />
        </>

    )
}