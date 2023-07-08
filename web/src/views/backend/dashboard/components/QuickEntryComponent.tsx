import { Button, Card } from 'antd';
import Styles from './QuickEntryComponent.module.scss'
import DashboardComponents from './DashboardComponents.module.scss'

const QuickEntryComponent = () => {
    const array = new Array(5)
    array.fill(1)
    return (
        <Card title={ <span style={ { fontWeight: 'normal', fontSize: '18px' } }>快捷入口</span> }
              className={ `${ DashboardComponents.dashboardCard } mt-4 w-full overflow-hidden` }
              style={ { height: '240px', width: '100%' } }>
            <div className={ 'flex justify-around items-center' }>
                { new Array(5).fill(null).map(() => (
                    <div className={ Styles.buttonStyle }>
                        <div>
                            <Button>CLICK ME</Button>
                        </div>
                        <div>
                            用户管理
                        </div>
                    </div>
                )) }
            </div>
        </Card>
    )
}

export default QuickEntryComponent
