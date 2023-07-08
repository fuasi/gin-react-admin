const tokenKey = 'tokenKey'
export const setToken = (token: string) => {
    return localStorage.setItem(tokenKey, token)
}

export const getToken = (): string => {
    return localStorage.getItem(tokenKey) || ''
}

export const deleteToken = () => {
    return localStorage.removeItem(tokenKey)
}
