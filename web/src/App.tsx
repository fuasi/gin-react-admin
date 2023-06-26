import './App.css'
import {Button} from "antd";
import {userApi} from "./apis";

function App() {

    const handleClick = () => {
        userApi.login({username: "admin", password: "admin"})
    }
    return (
        <div>
            <Button onClick={() => handleClick()}>click me </Button>
        </div>
    )
}

export default App
