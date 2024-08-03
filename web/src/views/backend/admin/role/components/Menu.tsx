import { Key, useEffect, useState } from "react";
import { Drawer, Tag, Tree } from "antd";
import { RoleRouterTree } from "@/apis/system/role.ts";
import PreviewMenu from "@/views/backend/admin/role/components/PreviewMenu.tsx";
import { HandleRouterInfo, IconComponent } from "@/utils/router.tsx";
import { CheckedKey } from "@/views/backend/admin/role";

interface RoleMenuProps {
  roleRouterTree: RoleRouterTree;
  setRoleRouterTree: React.Dispatch<React.SetStateAction<RoleRouterTree>>;
  checkMenu: boolean;
  setCheckMenu: () => void;
  checkedKeys: CheckedKey
  setCheckedKeys: React.Dispatch<React.SetStateAction<CheckedKey>>
}


const Menu = ( {
                 setRoleRouterTree,
                 checkMenu,
                 setCheckMenu,
                 roleRouterTree,
                 checkedKeys,
                 setCheckedKeys
               }: RoleMenuProps ) => {
  const [onCheckStrictly, setOnCheckStrictly] = useState<boolean>(true)
  useEffect(() => {
    setOnCheckStrictly(false)
  }, [])
  const onCheck = ( checkedKeysValue: { checked: Key[], halfChecked: Key[] } | Key[], halfChecked: any ) => {
    setCheckedKeys({ keys: checkedKeysValue as Key[], parent: halfChecked.halfCheckedKeys });
  };
  const onSelect = ( selectKeys: Key[] ) => {
    if (selectKeys.length >= 1 && selectKeys[0] !== roleRouterTree.defaultRouterId) {
      setRoleRouterTree(tree => {
        return { ...tree, defaultRouterId: selectKeys[0] as number }
      })
    }
  }
  return (<div>
    <Drawer destroyOnClose onClose={setCheckMenu} open={checkMenu}>
      <PreviewMenu routers={HandleRouterInfo({ handleRouterInfo: roleRouterTree.routers })}
                   selected={[...checkedKeys.keys, ...checkedKeys.parent!]}/>
    </Drawer>
    {roleRouterTree.routers.length > 0 && <Tree
        checkable
        fieldNames={{ title: "name", key: "id" }}
        defaultExpandAll={true}
        defaultExpandParent={true}
        autoExpandParent={true}
        onCheck={onCheck}
        onSelect={onSelect}
        titleRender={( node ) => <div>
          <IconComponent icon={node.icon || ''}/>
          <span className={"ml-2"}>
          {!node.required ? node.name:
              <>
                {node.name}
                <span className={"text-red-400"}>(必选)</span>
              </>}
          </span>
          {node.id === roleRouterTree.defaultRouterId && <Tag color={"blue"} className={"ml-4"}>角色首页</Tag>}
        </div>
        }
        checkStrictly={onCheckStrictly}
        treeData={roleRouterTree.routers}
        checkedKeys={checkedKeys.keys}
    >
    </Tree>}
  </div>)
}

export default Menu