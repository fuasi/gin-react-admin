import {baseRequestInit, fetchRequest} from "@/apis";
import {getToken} from "@/utils/cookie";

const isLogin = async () => {
    const res = await fetchRequest("/check", baseRequestInit({method: "POST"}))
    console.log(res)
    return res
}
const BackendLayout = async ({children}: {
    children: React.ReactNode
}) => {
    const data: Response<any> = await isLogin()
    // if (data.code !== 20000) {
    //     redirect("/")
    // }
    return (
        <div className={"m-auto w-max text-blue-600 text-6xl h-56"}>
            <p>
                {data.data}
            </p>
            {children}
        </div>
    )
}

export default BackendLayout

