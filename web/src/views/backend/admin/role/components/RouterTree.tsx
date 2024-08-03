import { Tree } from "antd";
import { RouterResponse } from "@/apis/common/base.ts";

interface RouterTreeProps {
  routers : RouterResponse[]
}

const RouterTree = ({ routers } : RouterTreeProps) => routers.map(item =>
  <Tree.TreeNode  title={ item.name } key={ item.id }>
    { item.children ? RouterTree({ routers : item.children }) : <></> }
  </Tree.TreeNode>)


export default RouterTree