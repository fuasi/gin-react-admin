import { Avatar , Upload } from "antd";
import { useEffect , useState } from "react";
import useFileDrawer from "@/hooks/useFileDrawer.tsx";

interface Props {
  src?: string
}

const FileUpload = ({src}: Props) => {
  const [avatar , setAvatar] = useState<string>(src ? src : "")
  const {FileDrawer , setDrawerVisible} = useFileDrawer({setSrc: setAvatar})

  const onDrawerVisible = () => {
    setDrawerVisible(true)
    return false
  }
  useEffect(() => {
    if (src) {
      setAvatar(src)
    }
  } , [src])

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
          <Avatar src={avatar} shape={"square"} alt="avatar" style={{width: '100%' , height: "100%"}}/>
        </Upload>
      </div>
    </div>
  )
}

export default FileUpload
