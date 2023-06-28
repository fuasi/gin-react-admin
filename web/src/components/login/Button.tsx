'use client'
import {Button} from 'antd'
import {baseRequestInit, fetchRequest} from "@/apis";

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
            <Button onClick={() => handleClick()} type="primary" danger>
                Primary
            </Button>
        </div>
    )
}

export default LoginFormComponent