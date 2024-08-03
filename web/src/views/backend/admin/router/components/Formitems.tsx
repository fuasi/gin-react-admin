import { Col, Form, Input, InputNumber, Radio, Row, Select, TreeSelect } from "antd";
import { RouterResponse } from "@/apis/common/base.ts";
import { SelectOptionType } from "@/hooks/useTable.tsx";

interface FormItemsProps {
  treeList: RouterResponse[];
  iconList: SelectOptionType
}

const FormItems = ( props: FormItemsProps ) => {
  const { iconList, treeList } = props
  return <>
    <Form.Item hidden={true} name="id">
      <Input/>
    </Form.Item>
    <Form.Item
        name="parentId"
        label={"上级菜单"}
        rules={[{ required: true, message: '请选择菜单级别' }]}>
      <TreeSelect fieldNames={{ value: "id", label: "name" }}
                  treeData={[{ name: "主目录", id: -1, children: treeList }]} className={"w-full"}/>
    </Form.Item>
    <Row gutter={12}>
      <Col span={12}>
        <Form.Item
            name="name"
            label={"菜单标题"}
            rules={[{ required: true, message: '请输入菜单标题' }]}>
          <Input placeholder={'请输入菜单标题'}/>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
            initialValue={0}
            name="routerOrder"
            label={"排序"}
            rules={[{ required: true, message: '请输入排序' }]}>
          <InputNumber style={{ width: "128px" }} width={72}/>
        </Form.Item>
      </Col>
    </Row>
    <Form.Item
        name="icon"
        label={"菜单图标"}>
      <Select showSearch filterOption={( input, option ) =>
          (option?.value as string).toLowerCase().includes(input.toLowerCase())
      } allowClear={true} options={iconList} placeholder={"请选择菜单图标"}/>
    </Form.Item>

    <Form.Item
        name="path"
        rules={[{ required: true, message: '请输入访问地址' }]}
        label={"访问地址"}>
      <Input placeholder={'请输入访问地址'}/>
    </Form.Item>

    <Form.Item
        name="componentPath"
        rules={[{ required: true, message: '请输入组件路径' }]}
        label={"组件路径"}>
      <Input placeholder={'请输入组件路径'}/>
    </Form.Item>
    <Row gutter={12}>
      <Col span={12}>
        <Form.Item
            initialValue={false}
            rules={[{ required: true, message: '请选择路由状态' }]}
            name="required"
            label={"路由状态"}>
          <Radio.Group>
            <Radio value={true}>必选</Radio>
            <Radio value={false}>可选</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
            initialValue={false}
            name="hidden"
            rules={[{ required: true, message: '请选择显示状态' }]}
            label={"显示状态"}>
          <Radio.Group>
            <Radio value={false}>显示</Radio>
            <Radio value={true}>隐藏</Radio>
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
  </>
}
export default FormItems