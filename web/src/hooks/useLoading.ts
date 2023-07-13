import { useState } from 'react'

export const useLoading = () => {
    const [ loading, setLoading ] = useState(true)
    const withLoading = async (func: () => void) => {
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
