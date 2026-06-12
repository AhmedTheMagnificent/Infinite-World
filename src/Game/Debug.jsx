import { Pane } from 'tweakpane'
import { useEffect, useRef } from 'react'

export default function Debug() {
    const paramsRef = useRef(null)

    if (!paramsRef.current) {
        paramsRef.current = {
            uAmplitude: 1.0,
            uFrequency: 2.0,
            uLacunarity: 2.0,
            uPersistence: 0.5,
            uOctaves: 5,
            uHeightScale: 1.0,
            uSharpness: 1.0
        }
    }

    useEffect(() => {
        const pane = new Pane()

        pane.addBinding(paramsRef.current, 'uAmplitude', { min: 0, max: 5 })
        pane.addBinding(paramsRef.current, 'uFrequency', { min: 0.1, max: 20 })
        pane.addBinding(paramsRef.current, 'uLacunarity', { min: 1, max: 4 })
        pane.addBinding(paramsRef.current, 'uPersistence', { min: 0, max: 1 })
        pane.addBinding(paramsRef.current, 'uOctaves', { min: 1, max: 8, step: 1 })
        pane.addBinding(paramsRef.current, 'uHeightScale', { min: 0, max: 5 })
        pane.addBinding(paramsRef.current, 'uSharpness', { min: 0.1, max: 5 })

        return () => pane.dispose()
    }, [])

    return paramsRef
}