import {cookies} from "next/headers";

export const setToken = (token: string) => {
    cookies().set("TokenX", token)
}

export const getToken = (): string => {
    const token = cookies().get("TokenX")
    if (token?.value) {
        return token.value
    }
    return ""
}

export const deleteToken = () => {
    cookies().set("TokenX", "")
}