import { Avatar , Upload } from "antd";

interface Props {
  src?: string
}

const AvatarUpload = ({src}: Props) => {
  return (
    <div>
      <Upload
        className={"w-24"}
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        maxCount={1}
        fileList={[]}
      >
        <Avatar src={src} shape={"square"} alt="avatar" style={{width: '100%' , height: "100%"}}/>
      </Upload>
    </div>
  )
}

export default AvatarUpload
