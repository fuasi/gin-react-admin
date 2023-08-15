import { Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { HTTPResponse } from "@/apis";
import { GLOBAL_TABLE_TEXT } from "@/config";
import { InputAndColumns } from "@/hooks/useTable.tsx";
import { useLoading } from "@/hooks/useLoading.ts";
import Switch from "@/components/Switch.tsx";
import { useSystemActiveNotification } from "@/hooks/useSystemActiveNotification.ts";

interface ModalComponentProps<T> {
  closeModal : () => void
  isModalOpen : boolean
  reloadTable : () => void
  modalTitle : string
  handleUpdateData : (recode : T, args : any) => Promise<void>;
  handleGetUpdateData : () => HTTPResponse<T>;
  handleInsertData : (recode : T, args : any) => void;
  ModalInputs : InputAndColumns<T>[];
}

export type UploadComponentProp = {
  file? : File,
  previewAvatar : string
}
const TableModal = <T extends object>(props : ModalComponentProps<T>) => {
  const {
    handleUpdateData,
    modalTitle,
    ModalInputs,
    reloadTable,
    handleGetUpdateData,
    closeModal,
    handleInsertData,
    isModalOpen
  } = props
  const [needUpdateData, setNeedUpdateData] = useState<T>()
  const isUpdate = modalTitle === GLOBAL_TABLE_TEXT.UPDATE_TEXT
  const [form] = Form.useForm()
  const { loading, withLoading } = useLoading()
  const [upload, setUpload] = useState<UploadComponentProp>({ previewAvatar : "" })
  const { withNotification } = useSystemActiveNotification()

  const handleCancel = () => {
    if (upload.previewAvatar.includes("blob:")) {
      URL.revokeObjectURL(upload.previewAvatar)
    }
    setUpload((val) => {
      return { ...val, previewAvatar : "" }
    })
    setNeedUpdateData(undefined)
    closeModal()
  }
  const handleUpdate = async () => {
    await withNotification(async () => {
      await handleUpdateData(form.getFieldsValue(true), { upload })
      reloadTable()
    }, GLOBAL_TABLE_TEXT.UPDATE_TEXT, () => handleCancel())
  }

  const handleInsert = async () => {
    await withNotification(async () => {
      await handleInsertData(form.getFieldsValue(true), { upload })
      reloadTable()
    }, GLOBAL_TABLE_TEXT.INSERT_TEXT, () => handleCancel())
  }

  const handleSwitchChange = (change : boolean, dataIndex : string) => {
    setNeedUpdateData((item) => {
      if (item) {
        return { ...item, [dataIndex] : change ? 1 : -1 }
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

  }, [handleGetUpdateData, isModalOpen, isUpdate])
  return (
    <Modal
      destroyOnClose={ true }
      confirmLoading={ loading }
      onOk={ isUpdate ? () => withLoading(handleUpdate) : () => withLoading(handleInsert) }
      onCancel={ () => handleCancel() } title={ modalTitle }
      open={ isModalOpen }>
      <Form preserve={ false } name={ "form" } form={ form }>
        { ModalInputs.map((value) => {
          return (
            <Form.Item hidden={ value.isShow } name={ value.dataIndex }
                       key={ value.dataIndex }
                       rules={ [{ required : value.required }] }
                       required={ value.required }
                       label={ value.title as (string | JSX.Element) }>
              { value.useAvatarUploadComponent ? value.useAvatarUploadComponent(loading, upload.previewAvatar, setUpload, needUpdateData) : value.inputType === "Switch" ?
                <Switch<T> handleSwitchChange={ handleSwitchChange } needUpdateData={ needUpdateData }
                           isUpdate={ isUpdate } dataIndex={ value.dataIndex }/> : value.inputType === "Select" ?
                  <Select options={ value.searchIsOption } /> :
                  <Input/> }
            </Form.Item>
          )
        }) }
      </Form>
    </Modal>
  )
}

export default TableModal