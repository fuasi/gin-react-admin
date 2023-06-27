import {GetStaticProps, InferGetStaticPropsType} from "next";
import {userApi} from "@/apis";
import {setToken} from "@/utils/cookie";
import {Button} from "antd";

const Login = ({ans}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const handleClick = async () => {
        const {data} = await userApi.login({username: "admin", password: "admin"})
        console.log(data)
        setToken(data)
    }

    const handleCheckLogin = async () => {
        await userApi.checkLogin().catch(res => {
            console.log(res)
        })

    }

    return (
        <div className={"m-auto w-56 bg-blue-300 h-56"}>
            <Button onClick={() => handleClick()}>
                this button click start login
            </Button>
            <Button className={"mt-12"} onClick={() => handleCheckLogin()}>
                this button click check login
            </Button>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {}
    }
}

export default Login