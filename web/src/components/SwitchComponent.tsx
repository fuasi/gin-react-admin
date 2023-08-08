import {Form, Switch} from "antd";
import {useEffect, useState} from "react";

interface SwitchComponentProps<T> {
    dataIndex: string;
    isUpdate: boolean;
    needUpdateData: T | undefined;
    handleSwitchChange: (checked: boolean, dataIndex: string) => void
}

const SwitchComponent = <T extends object>(props: SwitchComponentProps<T>) => {
    const form = Form.useFormInstance();
    const [modalSwitch, setModalSwitch] = useState(true)
    const {dataIndex, isUpdate, handleSwitchChange, needUpdateData} = props
    const handleModalSwitchChange = (change: boolean, dataIndex: string) => {
        form.setFieldValue(dataIndex, change)
        setModalSwitch(change)
    }
    useEffect(() => {
        if (!isUpdate) {
            form.setFieldValue(dataIndex, modalSwitch)
        }
    }, [form])
    return (
        <Switch
            onChange={isUpdate ? (checked) => handleSwitchChange(checked, dataIndex) : (checked) => handleModalSwitchChange(checked, dataIndex)}
            checked={needUpdateData ? needUpdateData[dataIndex as keyof typeof needUpdateData] : modalSwitch}/>
    )
}

export default SwitchComponent