import Styles from "./dashboard.module.scss"
import TitleCard from "./components/TitleCard.tsx";
import QuickEntry from "./components/QuickEntry.tsx";
import Echarts from "@/views/backend/dashboard/components/Echarts.tsx";

const DashboardView = () => {
  return (
    <div className={ Styles.dashboardComponentContainer }>
      <TitleCard/>
      <QuickEntry/>
      <Echarts/>
    </div>
  )
}

export default DashboardView