import { useState } from 'react'

// fix nm
export const useLoading = (initLoading = false) => {
    const [ loading, setLoading ] = useState(initLoading)
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
