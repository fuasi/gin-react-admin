import {Navigate} from "react-router-dom";
import {getToken} from "../utils/cookie.ts";


const PrivateRoute = ({children}: { children: React.ReactNode }) => {
    if (!getToken()) {
        return <Navigate replace to={"/login"}></Navigate>
    }
    return children
}
export default PrivateRoute