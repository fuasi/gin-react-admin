import {Outlet} from "react-router-dom";

const AdminLayout = () => {
    return (
        <div>
            this is adminview
            <Outlet/>
        </div>
    )
}
export default AdminLayout