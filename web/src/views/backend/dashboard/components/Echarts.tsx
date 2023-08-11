import { Card, List, Typography } from "antd";
import DashboardComponents from "@/views/backend/dashboard/components/Dashboard.module.scss";
import EChartsReact from "echarts-for-react";

const option = {
    xAxis : {
        type : 'category',
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis : {
        type : 'value'
    },
    series : [
        {
            data : [120, 200, 150, 80, 70, 110, 130],
            type : 'bar'
        }
    ]
};


const data = [
    'Racing car sprays burning fuel into crowd. Japanese princess to wed commoner.',
    'Japanese princess to wed commoner. Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash. Japanese princess to wed commoner.',
    'Man charged over missing wedding girl. Japanese princess to wed commoner.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
];
const Echarts = () => {

    return (
        <Card title={<span style={{ fontWeight : 'normal', fontSize : '18px' }}>数据统计</span>}
              bodyStyle={{ height : "600px" }}
              className={`${DashboardComponents.dashboardCard} mt-4 w-full`}>
            <div className={"flex justify-center items-center flex-row"}>
                <EChartsReact style={{ height : "560px", width : "75%" }} option={option}/>
                <List
                    style={{ width : "25%", height : "420px", overflow : "auto" }}
                    header={<div className={"text-2xl"}>公告栏</div>}
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text mark>[{new Date().toLocaleDateString()}]</Typography.Text> {item}
                        </List.Item>
                    )}
                />
            </div>
        </Card>
    )
}

export default Echarts