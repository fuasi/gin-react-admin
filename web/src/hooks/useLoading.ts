import {useState} from 'react'

export const useLoading = (initLoading = false) => {
    const [loading, setLoading] = useState(initLoading)
    const withLoading = async (func: () => Promise<void> | void) => {
        setLoading(true)
        try {
            await func()
        } finally {
            setLoading(false)
        }
    }
    return {
        loading,
        withLoading
    }
}
