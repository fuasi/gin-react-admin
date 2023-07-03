import LogoComponent from "../components/LogoComponent.tsx";
import LoginFormComponent from "./components/LoginFormComponent.tsx";


const LoginLayout = () => {
    return (
        <div className={"w-screen h-screen flex"}>
            <div className={"bg-blue-500 w-7/12 h-full flex justify-center items-center"}>
                <LogoComponent/>
            </div>
            <div className={"flex m-auto justify-center items-center"}>
                <LoginFormComponent/>
            </div>
        </div>
    )
}

export default LoginLayout
