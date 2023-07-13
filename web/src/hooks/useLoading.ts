import { useState } from 'react'

export const useLoading = () => {
    const [ loading, setLoading ] = useState(false)
    const withLoading = async (func: () => void) => {
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
