import Styles from './TitleCard.module.scss';
import Work from '@/assets/work.svg';
import { Card } from 'antd';
import DashboardComponents from './Dashboard.module.scss'

const TitleCard = () => {
    const date = new Date()
    const getCurrentDateMessage = () => {
        if (date.getHours() >= 6 && date.getHours() <= 12) {
            return "早安"
        } else if (date.getHours() < 16) {
            return "中午好"
        } else if (date.getHours() <= 18) {
            return "下午好"
        }
        return "晚上好"
    }
    return (
        <Card className={`w-full overflow-hidden ${DashboardComponents.dashboardCard}`}
              style={{ height : '280px' }}>
            <div className={'flex flex-row justify-between'}>
                <div style={{ minWidth : '600px' }}>
                    <div>
                        <span className={`text-2xl`}>
                            {getCurrentDateMessage()}，管理员
                        </span>
                    </div>
                    <div className={'mt-4'}>
                        <span className={`text-gray-400`}>
                            今日晴，0℃ - 10℃，天气寒冷，注意添加衣物。
                        </span>
                    </div>
                </div>
                <img className={Styles.titleImage} src={Work} alt={''}/>
            </div>
        </Card>
    )
}
export default TitleCard
