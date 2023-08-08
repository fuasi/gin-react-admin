import {Form, Input, Modal} from "antd";
import {useEffect, useState} from "react";
import {HTTPResponse} from "@/apis";
import {GLOBAL_TABLE_TEXT} from "@/config";
import {InputAndColumns} from "@/hooks/useTable.tsx";
import {useLoading} from "@/hooks/useLoading.ts";
import SwitchComponent from "@/components/SwitchComponent.tsx";
import {useSystemActiveNotification} from "@/hooks/useSystemActiveNotification.ts";

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

const TableModalComponent = <T extends object>(props : ModalComponentProps<T>) => {
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
  const [upload, setUpload] = useState<{
    file? : File,
    avatarURL : string
  }>({ avatarURL : "" })
  const { withNotification } = useSystemActiveNotification()
  const handleSetUpload = (URL : string, file : File) => {
    setUpload({ avatarURL : URL, file : file })
  }

  const handleCancel = () => {
    if (upload.avatarURL.includes("blob:")) {
      URL.revokeObjectURL(upload.avatarURL)
    }
    setUpload((val) => {
      return { ...val, avatarURL : "" }
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
        return { ...item, [dataIndex] : change }
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
      <Form preserve={ false } name={ "form" } form={ form }
            labelCol={ { span : 4 } }>
        { ModalInputs.map((value) => {
          return (
            <Form.Item hidden={ value.isShow } name={ value.dataIndex }
                       key={ value.dataIndex }
                       rules={ [{ required : value.required }] }
                       required={ value.required }
                       label={ value.title as (string | JSX.Element) }>
              { value.loadingInputRender ? value.loadingInputRender(loading, upload.avatarURL, handleSetUpload, needUpdateData) : value.InputType === "Switch" ?
                <SwitchComponent<T> handleSwitchChange={ handleSwitchChange } needUpdateData={ needUpdateData }
                                    isUpdate={ isUpdate } dataIndex={ value.dataIndex }/> :
                <Input onChange={ () => console.log(form) }/> }
            </Form.Item>
          )
        }) }
      </Form>
    </Modal>
  )
}

export default TableModalComponent