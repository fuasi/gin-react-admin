import { autorun, observable } from 'mobx'
import { TabItem } from "@/views/backend/backendLayout.tsx";

const tokenKey = 'token'
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

const setHistory = (history : TabItem[]) => {
  return localStorage.setItem(historyKey, JSON.stringify(history))
}
const getHistory = () : TabItem[] => {
  return JSON.parse(localStorage.getItem(historyKey) || '[]')
}

export const deleteHistory = () => {
  historyStore.history = [];
  return localStorage.removeItem(historyKey)
}

const tokenStore = observable({
  token : getToken() || undefined,
}, {})


const historyStore = observable({
  history : getHistory() || undefined
})


window.addEventListener('storage', e => {
  if (e.key == tokenKey) {
    tokenStore.token = e.newValue || ""
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
  if (historyStore.history) {
    setHistory(historyStore.history)
  } else {
    deleteHistory()
  }
})


export {
  tokenStore,
  historyStore
}


