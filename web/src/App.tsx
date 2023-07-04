import {HashRouter} from "react-router-dom";
import AddRoutes from "./utils/router.tsx";


const App = () => {

    return (
        <>
            <HashRouter>
                <AddRoutes/>
            </HashRouter>
        </>
    )
}

export default App
// <Route path={"/dashboard"} element={<Dashboard/>}/>
