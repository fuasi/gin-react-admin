import {Spin} from "antd";

const RouterLoadingComponent = () => {
    return (
        <div className={"flex justify-center items-center"}>
            <Spin tip="正在加载页面中......" style={{position: "fixed"}} size="large">
                <div className="content"/>
            </Spin>
        </div>
    )
}


export default RouterLoadingComponent