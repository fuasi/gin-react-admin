'use client'
import {baseRequestInit, fetchRequest} from "@/apis";
import {handleClientScriptLoad} from "next/script";
import {Button} from "antd";

const LoginFormComponent = () => {
    const handleClick = async () => {
        // const res = await fetchRequest("/check", baseRequestInit({
        //     method: "POST",
        //     body: JSON.stringify({username: "admin", password: "admin"})
        // }))
        // console.log(res)
    }
    return (
        <div>
            <Button onClick={() => handleClick()}>click me</Button>
        </div>
    )
}

export default LoginFormComponent