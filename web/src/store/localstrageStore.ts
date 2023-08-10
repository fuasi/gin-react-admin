import { autorun, observable } from 'mobx'
import { User } from "@/apis/userApis.ts";
import { TabItem } from "@/views/backend/backendLayout.tsx";

const tokenKey = 'token'
const userKey = 'user'
const historyKey = 'history'
const setToken = (token : string) => {
  return localStorage.setItem(tokenKey, token)
}

const getToken = () : string => {
  return localStorage.getItem(tokenKey) || ''
}

export const deleteToken = () => {
  tokenStore.token = undefined
  return localStorage.removeItem(tokenKey)
}

const getUser = () : User | undefined => {
  return JSON.parse(localStorage.getItem(userKey) || '{}') || undefined
}

const setUser = (user : User) => {
  return localStorage.setItem(userKey, JSON.stringify(user))
}

export const deleteUser = () => {
  userStore.user = undefined
  return localStorage.removeItem(userKey)
}

const setHistory = (history : TabItem[]) => {
  return localStorage.setItem(historyKey, JSON.stringify(history))
}
const getHistory = () : TabItem[] => {
  const result : TabItem[] = JSON.parse(localStorage.getItem(historyKey) || '[]')

  return result
}

export const deleteHistory = () => {
  historyStore.history = [];
  return localStorage.removeItem(historyKey)
}

const tokenStore = observable({
  token : getToken() || undefined,
}, {})

const userStore = observable({
  user : getUser() || undefined
}, {})


const historyStore = observable({
  history : getHistory() || undefined
})


window.addEventListener('storage', e => {
  if (e.key == tokenKey) {
    tokenStore.token = e.newValue || ""
  }
  if (e.key == userKey) {
    userStore.user = JSON.parse(e.newValue || '{}')
  }
  if (e.key == historyKey) {
    historyStore.history = JSON.parse(e.newValue || '[]')
  }
})


autorun(() => {
  if (tokenStore.token) {
    setToken(tokenStore.token)
  } else {
    deleteToken()
  }
  if (userStore.user) {
    setUser(userStore.user)
  } else {
    deleteUser()
  }
  if (historyStore.history) {
    setHistory(historyStore.history)
  } else {
    deleteHistory()
  }
})


export {
  tokenStore,
  userStore,
  historyStore
}


