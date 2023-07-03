import Cookies from "js-cookie";

export const setToken = (token: string) => {
    Cookies.set("TokenX", token)
}

export const getToken = (): string => {
    const token = Cookies.get("TokenX")
    if (token) {
        return token
    }
    return ""
}

export const deleteToken = () => {
    Cookies.remove("TokenX")
}