import { Avatar, Image, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

interface UploadProps {
  avatarURL : string;
  image? : string;
  loading : boolean;
  setUpload : (avatarURL : string, file : File) => void;
}

const UploadComponent = (props : UploadProps) => {
  const { loading, setUpload, image, avatarURL } = props
  const uploadButton = (
    <div>
      { loading ? <LoadingOutlined/> : <PlusOutlined/> }
      <div style={ { marginTop : 8 } }>Upload</div>
    </div>
  );

  const beforeUpload = (file : File) => {
    const url = URL.createObjectURL(new Blob([file as BlobPart], { type : file.type }))
    setUpload(url, file)
    return false
  }

  return (
    <div className={ "flex" }>
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={ false }
        maxCount={ 1 }
        beforeUpload={ beforeUpload }
        fileList={ [] }
      >
        { image ? <Avatar shape={ "square" } src={ image } alt="avatar"
                          style={ { width : '100%', height : "100%" } }/> : uploadButton }
      </Upload>
      <div>
        <Image width={ 100 } preview={ { maskClassName : "rounded-2xl" } } className={ "rounded-2xl" }
               src={ avatarURL }/>
      </div>
    </div>
  )
}
export default UploadComponent