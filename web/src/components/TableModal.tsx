import { Form , Input , InputNumber , Modal , Select } from "antd";
import { useEffect , useState } from "react";
import { HTTPResponse } from "@/apis";
import { GLOBAL_TABLE_TEXT } from "@/config";
import { InputAndColumns } from "@/hooks/useTable.tsx";
import { useLoading } from "@/hooks/useLoading.ts";
import Switch from "@/components/Switch.tsx";
import { useSystemActiveNotification } from "@/hooks/useSystemActiveNotification.ts";
import FileUpload from "@/components/FileUpload.tsx";

interface ModalComponentProps<T> {
  closeModal: () => void
  isModalOpen: boolean
  reloadTable: () => void
  modalTitle: string
  handleUpdateData: (recode: T , args: any) => Promise<void>;
  handleGetUpdateData: () => HTTPResponse<T>;
  handleInsertData: (recode: T , args: any) => void;
  ModalInputs: InputAndColumns<T>[];
}

export type UploadComponentProp = {
  file?: File,
  previewAvatar: string
}
const TableModal = <T extends object>(props: ModalComponentProps<T>) => {
  const {
    handleUpdateData ,
    modalTitle ,
    ModalInputs ,
    reloadTable ,
    handleGetUpdateData ,
    closeModal ,
    handleInsertData ,
    isModalOpen
  } = props
  const [needUpdateData , setNeedUpdateData] = useState<T>()
  const isUpdate = modalTitle === GLOBAL_TABLE_TEXT.UPDATE_TEXT
  const [form] = Form.useForm()
  const {loading , withLoading} = useLoading()
  const [upload , setUpload] = useState<UploadComponentProp>({previewAvatar: ""})
  const {withNotification} = useSystemActiveNotification()
  const handleCancel = () => {
    if (upload.previewAvatar.includes("blob:")) {
      URL.revokeObjectURL(upload.previewAvatar)
    }
    setUpload((val) => {
      return {...val , previewAvatar: ""}
    })
    setNeedUpdateData(undefined)
    closeModal()
  }

  const getFieldsValue = (): T => {
    return form.getFieldsValue(true)
  }

  const handleUpdate = async () => {
    await withNotification(async () => {
      // console.log(getFieldsValue())
      await handleUpdateData(getFieldsValue() , {upload})
      reloadTable()
    } , GLOBAL_TABLE_TEXT.UPDATE_TEXT , () => handleCancel())
  }

  const handleInsert = async () => {
    await withNotification(async () => {
      await handleInsertData(getFieldsValue() , {upload})
      reloadTable()
    } , GLOBAL_TABLE_TEXT.INSERT_TEXT , () => handleCancel())
  }

  const handleSwitchChange = (change: boolean , dataIndex: string) => {
    setNeedUpdateData((item) => {
      if (item) {
        return {...item , [dataIndex]: change ? 1 : -1}
      }
      return undefined
    })
  }

  useEffect(() => {
    if (isUpdate && isModalOpen) {
      handleGetUpdateData().then(res => {
        setNeedUpdateData(res.data)
        form.setFieldsValue(res.data)
      })
    }

  } , [handleGetUpdateData , isModalOpen , isUpdate])

  // const beforeUpload = (file: File) => {
  //   const url = URL.createObjectURL(new Blob([file as BlobPart] , {type: file.type}))
  //   setUpload({previewAvatar: url , file})
  //   return false
  // }
  return (
    <Modal
      destroyOnClose={true}
      confirmLoading={loading}
      onOk={isUpdate ? () => withLoading(handleUpdate) : () => withLoading(handleInsert)}
      onCancel={() => handleCancel()} title={modalTitle}
      open={isModalOpen}>
      <Form preserve={false} name={"form"} form={form}>
        {ModalInputs.map((value) => {
          return (
            <Form.Item hidden={value.isShow} name={value.dataIndex}
                       key={value.dataIndex}
                       rules={[
                         {required: value.required , message: "该选项不能为空"}
                       ]}
                       required={value.required}
                       valuePropName={value.inputType === "Avatar" ? "src" : undefined}
                       label={value.title as (string | JSX.Element)}>
              {value.inputType === "Switch" ?
                <Switch<T> handleSwitchChange={handleSwitchChange} needUpdateData={needUpdateData}
                           isUpdate={isUpdate} dataIndex={value.dataIndex}/> : value.inputType === "Avatar" ?
                  <FileUpload/> : value.inputType === "Select" ?
                    <Select options={value.searchIsOption}/> : value.inputType === "InputNumber" ? <InputNumber/> :
                      value.inputType === "SelectMultipleMode" ? <Select
                          mode={"multiple"}
                          style={{width: "100%"}}
                          filterOption={(inputValue , option) => {
                            const optionLabel: string | React.ReactNode | undefined = option?.label
                            if (typeof optionLabel === "string") {
                              return optionLabel.includes(inputValue)
                            }
                            return false
                          }}
                          options={value.searchIsOption}
                        /> :
                        <Input/>}
            </Form.Item>
          )
        })}
      </Form>
    </Modal>
  )
}

export default TableModal
