import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginLayout from "./views/loginLayout.tsx";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<LoginLayout/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
