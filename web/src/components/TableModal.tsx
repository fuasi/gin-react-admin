import { Form , Modal } from "antd";
import { useEffect , useState } from "react";
import { HTTPResponse } from "@/apis";
import { GLOBAL_TABLE_TEXT } from "@/config";
import { InputAndColumns } from "@/hooks/useTable.tsx";
import { useLoading } from "@/hooks/useLoading.ts";
import { useSystemActiveNotification } from "@/hooks/useSystemActiveNotification.ts";

interface ModalComponentProps<T> {
  closeModal : () => void
  isModalOpen : boolean
  reloadTable : () => void
  modalTitle : string
  handleUpdateData : ( recode : T , args : any ) => Promise<void>;
  handleGetUpdateData : () => HTTPResponse<T>;
  handleInsertData : ( recode : T , args : any ) => void;
  ModalInputs : InputAndColumns<T>[];
}

export type UploadComponentProp = {
  file? : File,
  previewAvatar : string
}
const TableModal = <T extends object>( props : ModalComponentProps<T> ) => {
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
  const { loading , withLoading } = useLoading()
  const [upload , setUpload] = useState<UploadComponentProp>({ previewAvatar : "" })
  const { withNotification } = useSystemActiveNotification()
  const handleCancel = () => {
    if (upload.previewAvatar.includes("blob:")) {
      URL.revokeObjectURL(upload.previewAvatar)
    }
    setUpload(( val ) => {
      return { ...val , previewAvatar : "" }
    })
    setNeedUpdateData(undefined)
    closeModal()
  }
  // 获取表单全部数据
  const getFieldsValue = () : T => {
    return form.getFieldsValue(true)
  }
  // 修改
  const handleUpdate = async () => {
    await withNotification(async () => {
      await handleUpdateData(getFieldsValue() , { upload })
      reloadTable()
    } , GLOBAL_TABLE_TEXT.UPDATE_TEXT , () => handleCancel())
  }
  // 添加
  const handleInsert = async () => {
    await withNotification(async () => {
      handleInsertData(getFieldsValue() , { upload })
      reloadTable()
    } , GLOBAL_TABLE_TEXT.INSERT_TEXT , () => handleCancel())
  }
  // 选择器组件更改
  // const handleSwitchChange = ( change : boolean , dataIndex : string ) => {
  //   setNeedUpdateData(( item ) => {
  //     if (item) {
  //       return { ...item , [ dataIndex ] : change ? 1:-1 }
  //     }
  //     return undefined
  //   })
  // }

  useEffect(() => {
    // 判断目前弹出框是否为修改弹出框
    if (isUpdate && isModalOpen) {
      // 获取目前修改的初始化数据
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
          onOk={isUpdate ? () => withLoading(handleUpdate):() => withLoading(handleInsert)}
          onCancel={() => handleCancel()} title={modalTitle}
          open={isModalOpen}>
        <Form preserve={false} initialValues={needUpdateData} name={"form"} form={form}>
          {ModalInputs.map(( input ) => {
            return (
                <Form.Item hidden={input.hidden} name={input.dataIndex}
                           key={input.dataIndex}
                           rules={[
                             { required : input.required , message : "该选项不能为空" }
                           ]}
                           required={input.required}
                           label={input.title as (string | JSX.Element)}>

                  {input.dataInput}
                  {/*{value.input === "Switch" ?*/}
                  {/*    <Switch<T> handleSwitchChange={handleSwitchChange} needUpdateData={needUpdateData}*/}
                  {/*               isUpdate={isUpdate} dataIndex={value.dataIndex}/>*/}
                  {/*    :value.input === "Avatar" ? <FileUpload/>:value.input === "Select" ?*/}
                  {/*        <Select options={value.searchIsOption}/>:value.input === "InputNumber" ?*/}
                  {/*            <InputNumber/>:*/}
                  {/*            value.input === "SelectMultipleMode" ? <Select*/}
                  {/*                    mode={"multiple"}*/}
                  {/*                    style={{ width : "100%" }}*/}
                  {/*                    filterOption={( inputValue , option ) => {*/}
                  {/*                      const optionLabel : string | ReactNode | undefined = option?.label*/}
                  {/*                      if (typeof optionLabel === "string") {*/}
                  {/*                        return optionLabel.includes(inputValue)*/}
                  {/*                      }*/}
                  {/*                      return false*/}
                  {/*                    }}*/}
                  {/*                    options={value.searchIsOption}*/}
                  {/*                />:*/}
                  {/*                <Input/>}*/}
                </Form.Item>
            )
          })}
        </Form>
      </Modal>
  )
}

export default TableModal
