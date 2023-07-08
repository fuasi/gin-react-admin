import { observable, autorun } from 'mobx'
import { deleteToken, getToken, setToken } from '@/utils/token'

const tokenStore = observable({
    token: getToken(),
}, {})

autorun(() => {
    if (tokenStore.token)
        setToken(tokenStore.token)
    else {
        deleteToken()
    }
})


export {
    tokenStore
}
