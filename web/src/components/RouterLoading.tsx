import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RouterLoading = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  useEffect(() => {
    const timeAlert = setTimeout(() => {
      messageApi.open({
        type : "success",
        content : "加载超时,即将跳转到登录页面,请重新进行登录!",
        duration : 2
      }).then(() => {
        navigate("/login")
      })
    }, 10000)
    return () => {
      clearTimeout(timeAlert)
    }
  }, [])
  return (
    <div className={ "flex justify-center items-center" }>
      { contextHolder }
      <Spin tip="正在加载页面中......" style={ { position : "fixed" } } size="large">
        <div className="content"/>
      </Spin>
    </div>
  )
}


export default RouterLoading