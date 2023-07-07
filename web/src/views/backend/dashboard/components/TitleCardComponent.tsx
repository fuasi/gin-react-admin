import Styles from "./TitleCardComponent.module.scss";
import Work from "../../../../assets/work.svg";
import {Card} from "antd";
import DashboardComponents from "./DashboardComponents.module.scss"

const TitleCardComponent = () => {
    return (
        <Card className={`w-full overflow-hidden ${DashboardComponents.dashboardCard}`} style={{height: "280px"}}>
            <div className={"flex flex-row justify-between"}>
                <div style={{minWidth: "600px"}}>
                    <div>
                        <span className={`text-2xl`}>
                            早安，管理员
                        </span>
                    </div>
                    <div className={"mt-4"}>
                        <span className={`text-gray-400`}>
                            今日晴，0℃ - 10℃，天气寒冷，注意添加衣物。
                        </span>
                    </div>
                </div>
                <img className={Styles.titleImage} src={Work} alt={""}/>
            </div>
        </Card>
    )
}
export default TitleCardComponent