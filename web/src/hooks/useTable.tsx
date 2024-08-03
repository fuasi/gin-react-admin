import { Badge, Button, Form, Input, InputNumber, Popconfirm, Select, Space, Table, TableProps } from "antd";
import { PageInfo, SearchQuery } from "@/apis/common/base.ts";
import React, { ReactNode, useEffect, useState } from "react";
import TableModal from "@/components/TableModal.tsx";
import { ColumnGroupType, ColumnType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  KeyOutlined,
  MinusOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { HTTPResponse } from "@/apis";
import { GLOBAL_SYSTEM_TEXT, GLOBAL_TABLE_TEXT } from "@/config";
import { notificationActiveFail, notificationActiveSuccess } from "@/utils/notification.tsx";

interface TableHookProps<T> {
  // Antd表单参数
  tableProps: Pick<TableProps<T>, keyof TableProps<T>> & { total: number };
  // 获取表格数据方法
  handleFindData: ( page: SearchQuery<T> ) => void;
  // 初始化更新数据方法
  getUpdateData: ( record: T ) => HTTPResponse<T>;
  // 更新数据方法
  handleUpdateData?: ( record: T, args: any ) => Promise<void>;
  // 插入数据方法
  handleInsertData?: ( record: T, args: any ) => Promise<void>;
  // 删除数据方法
  handleDeleteData: ( ids: number[], record?: T ) => Promise<void>;
  // 表格字段
  columns: InputAndColumns<T>[];
  // 重置密码方法
  handleUserResetPassword?: ( record: T ) => void;
  // 表格"操作"字段中的添加方法
  handleTableColumnInsert?: ( record: T ) => void;
  // 表格"操作"字段中的编辑方法
  handleTableColumnUpdate?: ( record: T ) => void;
  // 表格"操作"字段中权限的方法
  handleRoleAuthority?: ( record: T ) => void
  // 添加按钮中的方法,如果没有则默认是打开Modal的方法
  handleInsertButton?: () => void
  isPage: boolean;
}

interface TableHookResult<T> {
  // 点击表格中"编辑"按钮当前行中的数据
  currentSelectData?: T
  // 设置当前选择的数据
  setCurrentSelectData: React.Dispatch<React.SetStateAction<T | undefined>>
  TableComponent: JSX.Element
}

export type SelectOptionType = {
  label: ReactNode,
  value: string | number | boolean
}[]
export type InputAndColumns<T> =
    Pick<(ColumnGroupType<T> | ColumnType<T>), keyof (ColumnType<T> | ColumnGroupType<T>)>
    & {
  // 字段
  dataIndex: string,
  // 表单中输入数据的组件
  dataInput: ReactNode,
  // 在表单中是否为必填
  required?: boolean,
  // 是否隐藏组件
  hidden?: boolean,
  // 是否能够查询
  isSearch?: boolean,
  // 选择器组件和开关组件参数
  selectOrSwitchOption?: SelectOptionType,
  // Input是否只能输入数字
  isNumber?: boolean
}


export const useTable = <T extends object>( props: TableHookProps<T> ): TableHookResult<T> => {
  const { loading, dataSource, total } = props.tableProps
  const {
    isPage,
    handleTableColumnInsert,
    handleUpdateData,
    handleInsertData,
    handleFindData,
    handleDeleteData,
    getUpdateData,
    handleRoleAuthority,
    handleUserResetPassword,
    handleInsertButton,
    handleTableColumnUpdate,
    columns
  } = props
  const [tableHeight, setTableHeight] = useState("")
  const [pageInfo, setPageInfo] = useState<PageInfo>({ page: 1, pageSize: 20 })
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState(GLOBAL_TABLE_TEXT.INSERT_TEXT)
  const [selectData, setSelectData] = useState<T>()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm()
  const { page, pageSize } = pageInfo
  const tableRef: Parameters<typeof Table>[0]['ref'] = React.useRef(null);
  // 更改页数信息等
  const handleChangePage = ( page: number, pageSize: number ) => {
    setPageInfo({ page, pageSize })
  }
  // 关闭弹出框
  const handleCloseModal = () => {
    setModalIsOpen(false)
  }
  // 处理左上角添加按钮的方法
  const handleInsert = () => {
    setModalTitle(GLOBAL_TABLE_TEXT.INSERT_TEXT)
    setModalIsOpen(true)
  }
  // 打开"编辑数据"弹出框
  const handleOpenUpdate = ( record: T ) => {
    setModalTitle(GLOBAL_TABLE_TEXT.UPDATE_TEXT)
    setSelectData(record)
    setModalIsOpen(true)
  }
  // 获取需要编辑的数据信息,初始化表单
  const handleGetUpdateData = async ( record: T ) => {
    return await getUpdateData(record)
  }
  // 删除数据方法
  const handleDelete = async ( record?: T ) => {
    try {
      // 判断单选还是多选
      if (record) {
        await handleDeleteData([], record)
      } else {
        await handleDeleteData(selectedRowKeys as number[])
      }
      // 清空已选择
      setSelectedRowKeys([])
      // 删除后刷新数据
      handleFindData({
        page, pageSize, condition: { ...form.getFieldsValue(true) }
      })
      notificationActiveSuccess(GLOBAL_TABLE_TEXT.DELETE_TEXT)
    } catch (e) {
      notificationActiveFail(GLOBAL_TABLE_TEXT.DELETE_TEXT, e?.toString() as string)
    }
  }
  // 设置表格高度方法
  const handleTableHeight = () => {
    setTableHeight(`calc(100vh - ${tableRef.current?.nativeElement.getBoundingClientRect().bottom}px)`)
  }
  // 获取数据列表
  useEffect(() => {
    handleFindData({ page, pageSize, condition: { ...form.getFieldsValue(true) } })
  }, [pageInfo])

  // 动态设置表格高度
  useEffect(() => {
    handleTableHeight()
  }, [])

  // 表格勾选事件
  const onSelectChange = ( newSelectedRowKeys: React.Key[] ) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // Antd表格选择功能参数,例如多选删除
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // 查询方法
  const handleSearch = () => {
    handleFindData({ page: 1, pageSize, condition: { ...form.getFieldsValue(true) } })
    setPageInfo({ page: 1, pageSize: 20 })
  }
  // 查询重置方法
  const handleResetSearch = () => {
    form.resetFields()
    handleFindData({ page, pageSize, condition: { ...form.getFieldsValue(true) } })
  }
  return {
    currentSelectData: selectData,
    setCurrentSelectData: setSelectData,
    TableComponent: (
        <div>
          <div className={`layout-container min-h-[72px] items-end flex justify-between`}>
            <div>
              <Form className={"flex flex-wrap"} form={form}>
                {columns.filter(( item ) => {
                  return item.isSearch
                }).map(item => <Form.Item name={item.dataIndex} className={"ml-4 w-64"} key={item.dataIndex}
                                          label={item.title as string}>
                  {item.selectOrSwitchOption ?
                      <Select placeholder={item.title as string} options={item.selectOrSwitchOption}/>:
                      item.isNumber ?
                          <InputNumber min={1} controls={false} className={"w-full"}
                                       placeholder={item.title as string}></InputNumber>:
                          <Input placeholder={item.title as string}/>}
                </Form.Item>)}
                <div>
                  <Button onClick={handleSearch} className={"h-8 w-18 ml-8"} icon={<SearchOutlined/>}
                          type="primary">
                    {GLOBAL_TABLE_TEXT.SEARCH_TEXT}
                  </Button>
                  <Button onClick={handleResetSearch} className={"h-8 w-18 ml-4"} icon={<ReloadOutlined/>}
                          type="default">
                    {GLOBAL_TABLE_TEXT.RESET_SEARCH_TEXT}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <div className={`layout-container min-h-[200px] overflow-auto`}>
            <div className={'min-w-[240px] mb-4'}>
              <Button className={"h-9 w-19"} onClick={handleInsertButton ? handleInsertButton:handleInsert}
                      icon={<PlusOutlined/>} type="primary">
                {GLOBAL_TABLE_TEXT.INSERT_TEXT}
              </Button>
              <Badge count={selectedRowKeys.length}>
                <Button disabled={selectedRowKeys.length < 1} onClick={() => handleDelete()}
                        className={"h-9 w-19 ml-8"} danger
                        icon={<MinusOutlined/>} type="primary">
                  {GLOBAL_TABLE_TEXT.DELETE_TEXT}
                </Button>
              </Badge>
            </div>
            {/*编辑,添加弹出框*/}
            <TableModal<T> ModalInputs={columns} modalTitle={modalTitle}
                           closeModal={handleCloseModal}
                           isModalOpen={modalIsOpen}
                           handleInsertData={handleInsertData}
                           handleGetUpdateData={() => handleGetUpdateData(selectData!)}
                           handleUpdateData={handleUpdateData}
                           reloadTable={() => {
                             const { page, pageSize } = pageInfo
                             handleFindData({ page, pageSize, condition: { ...form.getFieldsValue(true) } })
                           }}/>
            {/*表格信息*/}

            <Table
                ref={tableRef}
                scroll={{
                  scrollToFirstRowOnChange: true,
                  y: tableHeight
                }}
                pagination={isPage ? {
                  position: ['bottomCenter'],
                  current: pageInfo.page,
                  pageSize: pageInfo.pageSize,
                  onChange: handleChangePage,
                  showQuickJumper: true,
                  total: total,
                  showSizeChanger: true
                }:isPage}
                loading={loading}
                bordered
                rowSelection={rowSelection}
                rowKey={'id'}
                dataSource={dataSource}
                columns={
                  // 增加操作的字段
                  columns ? [...columns, {
                    title: GLOBAL_SYSTEM_TEXT.ACTIVE,
                    key: 'action',
                    fixed: "right",
                    width: 256,
                    render: ( _, record ) => (<Space size="middle">
                      {
                        // 判断是否有新增数据的方法
                        handleTableColumnInsert ?
                            <a onClick={() => handleTableColumnInsert(record)}><PlusOutlined className={'mr-2'}/>新增
                            </a>
                            :<></>
                      }
                      {/*判断是否有关于权限的方法*/}
                      {handleRoleAuthority ? <a onClick={() => handleRoleAuthority(record)}><SettingOutlined
                          className={'mr-2'}/>权限</a>:<></>}
                      {/*编辑*/}
                      <a onClick={() => handleTableColumnUpdate ? handleTableColumnUpdate(record):handleOpenUpdate(record)}><EditOutlined
                          className={'mr-2'}/>{GLOBAL_TABLE_TEXT.UPDATE_TEXT}</a>
                      <Popconfirm
                          title={GLOBAL_SYSTEM_TEXT.ACTIVE_DANGER_TITLE}
                          description={GLOBAL_SYSTEM_TEXT.ACTIVE_RECONFIRM_DESC(GLOBAL_TABLE_TEXT.DELETE_TEXT)}
                          onConfirm={() => handleDelete(record)}
                          okText={GLOBAL_SYSTEM_TEXT.ACTIVE_SURE}
                          cancelText={GLOBAL_SYSTEM_TEXT.ACTIVE_CANCEL}
                      >
                        <a className={"text-red-400"}><DeleteOutlined
                            className={'mr-2'}/>
                          {GLOBAL_TABLE_TEXT.DELETE_TEXT}</a>
                      </Popconfirm>
                      {
                        // 判断是否有重置用户密码的方法
                        handleUserResetPassword ?
                            <Popconfirm
                                title={GLOBAL_SYSTEM_TEXT.ACTIVE_DANGER_TITLE}
                                description={GLOBAL_SYSTEM_TEXT.ACTIVE_RECONFIRM_DESC(GLOBAL_TABLE_TEXT.RESET_PASSWORD_TEXT)}
                                onConfirm={() => handleUserResetPassword(record)}
                                okText={GLOBAL_SYSTEM_TEXT.ACTIVE_SURE}
                                cancelText={GLOBAL_SYSTEM_TEXT.ACTIVE_CANCEL}
                            >
                              <a><KeyOutlined
                                  className={'mr-2'}/>{GLOBAL_TABLE_TEXT.RESET_PASSWORD_TEXT}
                              </a>
                            </Popconfirm>
                            :<></>
                      }
                    </Space>)
                  }]:[]}>
            </Table>
          </div>
        </div>)
  }
}

