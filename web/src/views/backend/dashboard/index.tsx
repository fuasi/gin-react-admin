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

export default DashboardComponent