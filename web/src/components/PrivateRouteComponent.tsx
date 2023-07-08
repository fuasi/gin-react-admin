import {Navigate} from "react-router-dom";
import {getToken} from "@/utils/token.ts";


const PrivateRoute = ({children}: { children: React.ReactNode }) => {
    if (!getToken()) {
        return <Navigate replace to={"/login"}/>
    }
    return children
}
export default PrivateRoute
