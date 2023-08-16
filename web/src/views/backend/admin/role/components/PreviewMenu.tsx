import { Menu } from "antd";
import { MenuItem } from "@/App.tsx";
import { Key, useEffect, useState } from "react";
import { RouterResponse } from "@/apis/baseApis.ts";

interface PreviewMenuProps {
  routers : MenuItem[];
  selected : Key[]
}

const PreviewMenu = ({ routers, selected } : PreviewMenuProps) => {
  const [routerResponse, setRouterResponse] = useState<RouterResponse[]>([])
  useEffect(() => {

    const selectedSet = new Set<Key>()
    for (const num of selected) {
      selectedSet.add(num)
    }
    setRouterResponse(handleMenuData(routers as any as RouterResponse[], selectedSet))
  }, [])
  const handleMenuData = (children : RouterResponse[], selectedSet : Set<Key>) => {
    for (let i = children.length - 1; i >= 0; i--) {
      if (children[i].children) {
        handleMenuData(children[i].children!, selectedSet)
      }
      if (children[i].hidden || !selectedSet.has(children[i].id)) {
        children.splice(i, 1)
      }
    }
    return children
  }
  return (
    <Menu
      mode="inline"
      items={ routerResponse as any as MenuItem[] }/>
  )
}

export default PreviewMenu