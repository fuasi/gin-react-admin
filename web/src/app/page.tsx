import LoginButton from "@/components/login/Button";


const Login = async () => {
    return (
        <div>
            <div className={"m-auto w-10/12 text-6xl bg-blue-300 h-56 text-center"}>
                this is Login Page
                <LoginButton/>
            </div>
        </div>
    )
}

export default Login