import "./self.scss"
import SelfInfo from "@/views/backend/self/components/SelfInfo.tsx";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import Bind from "@/views/backend/self/components/Bind.tsx";

const SelfView = () => {
  const TabItems : TabsProps['items'] = [
    {
      key : "1",
      label : "账号绑定",
      children : <Bind/>
    }
  ]

  return (
    <div className={ "flex" }>
      <div className={ "layout-container w-1/3 h-full min-w-[320px]" }>
        <SelfInfo/>
      </div>
      <div className={ "layout-container w-full h-full min-w-[420px]" }>
        <Tabs items={ TabItems }/>
      </div>
    </div>
  )
}

export default SelfView