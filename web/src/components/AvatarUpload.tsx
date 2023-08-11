import { Avatar, Image, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { UploadComponentProp } from "@/components/TableModal.tsx";

interface UploadProps {
  previewAvatar : string;
  image? : string;
  loading : boolean;
  setUpload : React.Dispatch<React.SetStateAction<UploadComponentProp>>;
  imageWidth? : number
}

const AvatarUpload = (props : UploadProps) => {
  const { loading, setUpload, image, previewAvatar, imageWidth } = props
  const uploadButton = (
    <div>
      { loading ? <LoadingOutlined/> : <PlusOutlined/> }
      <div style={ { marginTop : 8 } }>Upload</div>
    </div>
  );

  const beforeUpload = (file : File) => {
    const url = URL.createObjectURL(new Blob([file as BlobPart], { type : file.type }))
    setUpload({ previewAvatar : url, file })
    return false
  }

  return (
    <div className={ "flex" }>
      <Upload
        className={ "w-24" }
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
      <div className={ "ml-4 w-full h-full" } hidden={ previewAvatar === "" }>
        <Image width={ imageWidth ? imageWidth : 100 } preview={ { maskClassName : "rounded-2xl" } }
               className={ "rounded-2xl" }
               src={ previewAvatar }/>
      </div>
    </div>
  )
}
export default AvatarUpload