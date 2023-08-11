import Logo from "../components/Logo.tsx";
import LoginForm from "./components/LoginForm.tsx";


const LoginLayout = () => {
    return (
        <div className={"w-screen h-screen flex"}>
            <div className={"bg-blue-500 w-7/12 h-full flex justify-center items-center"}>
                <Logo/>
            </div>
            <div className={"flex m-auto justify-center items-center"}>
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginLayout
