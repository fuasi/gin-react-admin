import { useState } from "react";
import { Avatar , Button , Drawer , Input , Pagination , Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import File from "@/views/backend/file";
import { uploadFile } from "@/apis/fileApis.ts";

const {Search} = Input;

interface Props {
  setSrc: React.Dispatch<React.SetStateAction<string>>
}

interface Result {
  FileDrawer: JSX.Element
  setDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const useFileDrawer = (props: Props): Result => {
  const {setSrc} = props
  const [drawerVisible , setDrawerVisible] = useState<boolean>(false)
  const onSearch = (val: string) => {
    console.log(val)
  }

  const handleUpload = async (file: File) => {
    const form = new FormData()
    form.set("file" , file)
    const {data} = await uploadFile(form)
    console.log(data)
    return false
  }
  return {
    FileDrawer: (
      <Drawer width={650} onClose={() => setDrawerVisible(false)} open={drawerVisible} title={"媒体库"}>
        <div className={"flex items-center justify-center h-20 w-2/3"}>
          <Upload fileList={[]} maxCount={1} name={"file"} beforeUpload={handleUpload}>
            <Button icon={<UploadOutlined/>} type={"primary"}
                    className={"ml-5 mr-8"}>文件上传</Button>
          </Upload>
          <Search className={"w-[240px]"} placeholder="输入文件名/备注名" onSearch={onSearch} enterButton/>
        </div>
        <div className={"flex flex-wrap"}>
          {new Array(20).fill("1").map((item , index) => <div
            className={"w-32 h-32 border-dashed border-blue-200 border-[1px] cursor-pointer rounded-md ml-4 mb-8"}>
            <Avatar src={"/static/images/1700011717.png"} shape={"square"} alt="avatar" className={"w-full h-full"}/>
            <div className={"text-center"}>test.png</div>
          </div>)}
        </div>

        <div className={"flex items-center justify-center"}>
          <Pagination
            className={"mt-8"}
            showSizeChanger
            pageSizeOptions={[20 , 40 , 60 , 80 , 100]}
            defaultCurrent={3}
            total={500}
          />
        </div>
      </Drawer>
    ) ,
    setDrawerVisible
  }
}

export default useFileDrawer
