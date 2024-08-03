import { useEffect , useState } from "react";
import { Alert , Avatar , Button , Drawer , Form , Input , Modal , Pagination , Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  ActionFile ,
  deleteFile ,
  FileCondition ,
  FileModel ,
  getFileList ,
  updateFile ,
  uploadFile
} from "@/apis/common/file.ts";
import { GetList , SearchQuery } from "@/apis/common/base.ts";
import { notificationActiveSuccess } from "@/utils/notification.tsx";
import { getErrorMessage , reportError } from "@/utils/error.ts";

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
  const [files , setFiles] = useState<GetList<FileModel>>({
    list: [] ,
    total: 0
  })
  const [pageInfo , setPageInfo] = useState<SearchQuery<FileCondition>>({
    page: 1 , pageSize: 8 , condition: {fileName: ""}
  })

  const [isUpdate , setIsUpdate] = useState<boolean>(false)

  const userForm = Form.useFormInstance();
  const [fileForm] = Form.useForm();
  useEffect(() => {
    handleGetFileList(pageInfo)
  } , [])

  const handleGetFileList = async (query: SearchQuery<FileCondition>) => {
    const {data} = await getFileList(query)
    setFiles(data)
  }

  const onSearch = async (val: string) => {
    await handleGetFileList({...pageInfo , condition: {fileName: val}})
    setPageInfo(res => {
      return {
        ...res , condition: {
          fileName: val
        }
      }
    })
  }

  const handleUpload = async (file: File) => {
    const form = new FormData()
    form.set("file" , file)
    await uploadFile(form)
    await handleGetFileList(pageInfo)
    return false
  }

  const handlePageSearch = async (page: number , pageSize: number) => {
    setPageInfo(res => {
      return {...res , page , pageSize}
    })
    await handleGetFileList({page , pageSize , condition: pageInfo.condition})
  }

  const handleSelectFile = (fileUrl: string) => {
    setSrc(fileUrl)
    if (userForm) {
      userForm.setFieldValue("avatar" , fileUrl)
    }
    setDrawerVisible(false)
  }

  const handleUpdateFile = async () => {
    fileForm.validateFields(["id" , "fileName"]).then(async (res: ActionFile) => {
      await updateFile({
        id: res.id ,
        fileName: res.fileName
      })
      setIsUpdate(false)
      notificationActiveSuccess("修改")
      await handleGetFileList(pageInfo)
    })
  }

  const handleDeleteFile = async () => {
    try {
      await deleteFile({id: fileForm.getFieldsValue(true).id})
      notificationActiveSuccess("删除")
      await handleGetFileList(pageInfo)
    } catch (err) {
      reportError({active: "删除" , message: getErrorMessage(err)})
    } finally {
      setIsUpdate(false)
    }
  }

  return {
    FileDrawer: (
      <Drawer width={650} onClose={() => setDrawerVisible(false)} open={drawerVisible} title={"媒体库"}>
        <Alert
          message="点击文件所对应的名字,可更改该文件的名字,或者删除该文件"
          banner
        />
        <Modal onCancel={() => setIsUpdate(false)} title={"信息"} open={isUpdate} footer={[
          <Button key="cancal" onClick={() => setIsUpdate(false)}>
            取消
          </Button> ,
          <Button onClick={handleDeleteFile} danger key="remove" type={"primary"}>
            删除
          </Button> ,
          <Button
            key="update"
            type="primary"
            onClick={handleUpdateFile}
          >
            提交
          </Button> ,
        ]}>
          <Form
            form={fileForm}
            layout="vertical">
            <Form.Item label="id" hidden required name={"id"}>
              <Input placeholder="Id"/>
            </Form.Item>
            <Form.Item rules={[{required: true , message: '请输入文件名 / 备注名"'}]} label="文件名 / 备注名"
                       name={"fileName"} tooltip={"修改文件名字"} required>
              <Input placeholder="请输入文件名 / 备注名"/>
            </Form.Item>
          </Form>
        </Modal>
        <div className={"flex items-center justify-center h-20 w-2/3"}>
          <Upload fileList={[]} maxCount={1} name={"file"} beforeUpload={handleUpload}>
            <Button icon={<UploadOutlined/>} type={"primary"}
                    className={"ml-5 mr-8"}>文件上传</Button>
          </Upload>
          <Search className={"w-[240px]"} placeholder="输入文件名/备注名" onSearch={onSearch} enterButton/>
        </div>
        <div className={"flex flex-wrap"}>
          {files.list.length >= 0 ? files.list.map((item) =>
            <div key={item.systemFileName} className={"mb-2"}>
              <div onClick={() => handleSelectFile(item.fileUrl)}
                   className={"w-32 h-32 border-dashed border-blue-200 border-[1px] cursor-pointer rounded-md ml-4"}>
                <Avatar src={item.fileUrl} shape={"square"} alt="avatar" className={"w-full h-full"}/>
              </div>
              <div onClick={() => {
                fileForm.setFieldValue("id" , item.id)
                fileForm.setFieldValue("fileName" , item.fileName)
                setIsUpdate(true)
              }} className={"w-32 ml-4 text-center cursor-pointer break-all"}>
                {item.fileName}.{item.tag}
              </div>
            </div>) : <></>}
        </div>

        <div className={"flex items-center justify-center"}>
          <Pagination
            className={"mt-8"}
            showSizeChanger
            pageSizeOptions={[8 , 16 , 24 , 32 , 40]}
            defaultCurrent={pageInfo.page}
            defaultPageSize={pageInfo.pageSize}
            onChange={handlePageSearch}
            total={files.total}
          />
        </div>
      </Drawer>
    ) ,
    setDrawerVisible
  }
}

export default useFileDrawer
