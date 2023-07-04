import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const DashboardComponent = () => {
    const navigate = useNavigate()
    return (
        <div>
            this is dashboard
            <Button onClick={() => navigate("/user")}>
                click me
            </Button>
        </div>
    )
}


export default DashboardComponent