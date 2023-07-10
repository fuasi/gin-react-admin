import { observable } from 'mobx'

const userStorage = observable({
    id : '',
    avatar : '',
    name : ''
})


export {
    userStorage
}
