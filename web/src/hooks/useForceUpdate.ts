import { useState } from 'react'

export const useForceUpdate = (): [() => void, string] => {
    const [count, setCount] = useState(0)
    return [() => setCount(x => (x + 1) % 10000), count.toString()]
}
