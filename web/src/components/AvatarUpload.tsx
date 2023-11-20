import { Avatar , Upload } from "antd";
import { useState } from "react";
import useFileDrawer from "@/hooks/useFileDrawer.tsx";

interface Props {
  src?: string
}

const AvatarUpload = ({src}: Props) => {
  const [avatar , setAvatar] = useState<string>("")
  const {FileDrawer , setDrawerVisible} = useFileDrawer({setSrc: setAvatar})
  const onDrawerVisible = () => {
    setDrawerVisible(true)
    return false
  }
  return (
    <div>
      {FileDrawer}
      <div onClick={onDrawerVisible}>
        <Upload
          className={"w-24"}
          name="avatar"
          listType="picture-card"
          openFileDialogOnClick={false}
          showUploadList={false}
          maxCount={1}
          fileList={[]}
        >
          <Avatar src={src} shape={"square"} alt="avatar" style={{width: '100%' , height: "100%"}}/>
        </Upload>
      </div>
    </div>
  )
}

export default AvatarUpload
