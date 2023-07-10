import { Card } from 'antd';
import Styles from './QuickEntryComponent.module.scss'
import DashboardComponents from './DashboardComponents.module.scss'
import { SettingTwoTone } from "@ant-design/icons";

const QuickEntryComponent = () => {
    const array = new Array(5)
    array.fill(1)
    return (
        <Card title={<span style={{ fontWeight : 'normal', fontSize : '18px' }}>快捷入口</span>}
              className={`${DashboardComponents.dashboardCard} mt-4 h-full w-full overflow-hidden`}>
            <div className={'flex justify-around items-center'}>
                {new Array(5).fill(null).map((_, idx) => (
                    <div key={idx} className={Styles.buttonBorderStyle}>
                        <div className={"rounded-md bg-blue-300 w-12 h-12 flex justify-center items-center"}>
                            <SettingTwoTone style={{ fontSize : 24 }}/>
                        </div>
                        <div className={"mt-3"}>
                            用户管理
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default QuickEntryComponent
