import Styles from "./dashboard.module.scss"
import TitleCardComponent from "./components/TitleCardComponent.tsx";
import QuickEntryComponent from "./components/QuickEntryComponent.tsx";
import EchartsComponent from "@/views/backend/dashboard/components/EchartsComponent.tsx";

const DashboardComponent = () => {
    return (
        <div className={Styles.dashboardComponentContainer}>
            <TitleCardComponent/>
            <QuickEntryComponent/>
            <EchartsComponent/>
        </div>
    )
}
// <div style={{
//     margin: '16px 16px',
//     padding: 24,
//     minHeight: 200,
//     background: colorBgContainer,
// }}>
//     this is dashboard
// </div>


export default DashboardComponent