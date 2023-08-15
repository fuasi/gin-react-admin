import { Form, Switch as AntdSwitch } from "antd";
import { useEffect, useState } from "react";

interface SwitchComponentProps<T> {
  dataIndex : string;
  isUpdate : boolean;
  needUpdateData : T | undefined;
  handleSwitchChange : (checked : boolean, dataIndex : string) => void
}

const Switch = <T extends object>(props : SwitchComponentProps<T>) => {
  const form = Form.useFormInstance();
  const [modalSwitch, setModalSwitch] = useState(true)
  const { dataIndex, isUpdate, handleSwitchChange, needUpdateData } = props
  const handleModalSwitchChange = (change : boolean, dataIndex : string) => {
    form.setFieldValue(dataIndex, change ? 1 : -1)
    setModalSwitch(change)
  }
  useEffect(() => {
    if (!isUpdate) {
      form.setFieldValue(dataIndex, modalSwitch)
    }
  }, [form])
  return (
    <AntdSwitch
      onChange={ isUpdate ? (checked) => handleSwitchChange(checked, dataIndex) : (checked) => handleModalSwitchChange(checked, dataIndex) }
      checked={ needUpdateData ? needUpdateData[dataIndex as keyof typeof needUpdateData] === 1 : modalSwitch }/>
  )
}

export default Switch