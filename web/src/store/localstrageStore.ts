import { observable, autorun } from 'mobx'

const tokenKey = 'tokenKey'
const setToken = (token: string) => {
    return localStorage.setItem(tokenKey, token)
}

const getToken = (): string => {
    return localStorage.getItem(tokenKey) || ''
}

const deleteToken = () => {
    return localStorage.removeItem(tokenKey)
}

const tokenStore = observable({
    token : getToken(),
}, {})

window.addEventListener('storage', e => {
    if (e.key == tokenKey) {
        tokenStore.token = e.newValue || ""
    }
})


autorun(() => {
    if (tokenStore.token) {
        setToken(tokenStore.token)
    } else {
        deleteToken()
    }
})


export {
    tokenStore
}
