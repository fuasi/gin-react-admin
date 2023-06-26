import {request} from "./index.ts";

interface UserModel {
    username: string
    password: string
}

const userApi = {
    login: (query: UserModel) => {
        request({
            url: "/login",
            method: "POST",
            data: query
        })
    }
}

export default userApi