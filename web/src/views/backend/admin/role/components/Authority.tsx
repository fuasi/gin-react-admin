import { Key , useEffect , useState } from "react";
import { Tree } from "antd";
import { RoleApis } from "@/apis/roleApis.ts";
import { Api } from "@/apis/apiApis.ts";

interface RoleAuthorityProps {
  roleAuthority: RoleApis;
  checkedKeys: Key[];
  setCheckedKeys: React.Dispatch<React.SetStateAction<Key[]>>;
}

export type AuthorityTree = {
  id: Key;
  icon?: string;
  apiComment: string;
  children: Api[];
  required?: boolean
}


const Authority = ({roleAuthority , checkedKeys , setCheckedKeys}: RoleAuthorityProps) => {
  const [authorityTree , setAuthorityTree] = useState<AuthorityTree[]>([]);

  useEffect(() => {
    const authority = new Map<string , Api[]>()
    console.log(roleAuthority.apis)
    for (const api of roleAuthority.apis) {
      if (authority.get(api.apiGroup)) {
        authority.set(api.apiGroup , [...authority.get(api.apiGroup)! , api])
        continue;
      }
      authority.set(api.apiGroup , [api])
    }
    const authorityTree: AuthorityTree[] = []
    for (const authorityElement of authority) {
      authorityTree.push({id: authorityElement[0] , apiComment: authorityElement[0] , children: authorityElement[1]})
    }
    setAuthorityTree(authorityTree)
    // handleRoleAuthorityData(roleAuthority.apis, authority)
  } , [])
  const onCheck = (checked: Key[]) => {
    setCheckedKeys(checked as Key[])
  }

  return (<div>
    {authorityTree.length > 0 && <Tree
        checkable
        titleRender={(authority) => <div>{!authority.required ? authority.apiComment :
          <>
            {authority.apiComment}
            <span className={"text-red-400"}>(必选)</span>
          </>}
        </div>
        }
        fieldNames={{title: "apiComment" , key: "id"}}
        selectable={false}
        defaultExpandAll={true}
        defaultExpandParent={true}
        autoExpandParent={true}
        onCheck={(key) => onCheck(key as Key[])}
        treeData={authorityTree}
        checkedKeys={checkedKeys}
    />}
  </div>)
}
export default Authority
