import {getRequest, postRequest} from "@/apis/index";
import internal from "stream";

interface LoginRequest {
    username: string
    password: string
}

const userApi = {
    login: (params: LoginRequest) => {
        return postRequest<LoginRequest, string>({
            url: "/login",
            data: params
        })
    },
    checkLogin: () => {
        return postRequest({
            url: "/check",
        })
    }

}
export default userApi
