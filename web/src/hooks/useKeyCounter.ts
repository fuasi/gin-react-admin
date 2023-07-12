import { useState } from 'react'

export const useKeyCounter = () => {
    const [ key, setKey ] = useState(0)

    return {
        key,
        incr: () => setKey(x => x + 1),
        decr: () => setKey(x => x - 1),
    }
}
