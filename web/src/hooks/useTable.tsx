import { Badge , Button , Form , Input , InputNumber , Popconfirm , Select , Space , Table , TableProps } from "antd";
import { PageInfo , SearchQuery } from "@/apis/baseApis.ts";
import React , { ReactNode , useEffect , useState } from "react";
import TableModal from "@/components/TableModal.tsx";
import { ColumnGroupType , ColumnType } from "antd/es/table";
import {
  DeleteOutlined ,
  EditOutlined ,
  KeyOutlined ,
  MinusOutlined ,
  PlusOutlined ,
  ReloadOutlined ,
  SearchOutlined ,
  SettingOutlined
} from "@ant-design/icons";
import { HTTPResponse } from "@/apis";
import { GLOBAL_SYSTEM_TEXT , GLOBAL_TABLE_TEXT } from "@/config";
import { notificationActiveFail , notificationActiveSuccess } from "@/utils/notification.tsx";

interface TableHookProps<T> {

  tableProps : Pick<TableProps<T> , keyof TableProps<T>> & { total : number };
  handleFindData : ( page : SearchQuery<T> ) => void;
  getUpdateData : ( record : T ) => HTTPResponse<T>;
  handleUpdateData : ( record : T , args : any ) => Promise<void>;
  handleInsertData : ( record : T , args : any ) => Promise<void>;
  handleDeleteData : ( ids : number[] , record? : T ) => Promise<void>;
  columns : InputAndColumns<T>[];
  handleUserResetPassword? : ( record : T ) => void;
  handleRoleAuthority? : ( record : T ) => void
  isPage : boolean;
}

interface TableHookResult {
  TableComponent : JSX.Element
}

export type SelectOptionType = {
  label : ReactNode,
  value : string | number | boolean
}[]
export type InputAndColumns<T> =
    Pick<(ColumnGroupType<T> | ColumnType<T>) , keyof (ColumnType<T> | ColumnGroupType<T>)>
    & {
  dataIndex : string,
  dataInput : ReactNode,
  required? : boolean,
  hidden? : boolean,
  isSearch? : boolean,
  selectOrSwitchOption? : SelectOptionType,
  isNumber? : boolean
}


export const useTable = <T extends object>( props : TableHookProps<T> ) : TableHookResult => {
  const { loading , dataSource , total } = props.tableProps
  const {
    isPage ,
    handleUpdateData ,
    handleInsertData ,
    handleFindData ,
    handleDeleteData ,
    getUpdateData ,
    handleRoleAuthority ,
    handleUserResetPassword ,
    columns
  } = props
  const [tableHeight , setTableHeight] = useState("")
  const [pageInfo , setPageInfo] = useState<PageInfo>({ page : 1 , pageSize : 20 })
  const [modalIsOpen , setModalIsOpen] = useState(false)
  const [modalTitle , setModalTitle] = useState(GLOBAL_TABLE_TEXT.INSERT_TEXT)
  const [selectData , setSelectData] = useState<T>()
  const [selectedRowKeys , setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm()
  const { page , pageSize } = pageInfo
  const tableRef : Parameters<typeof Table>[0]['ref'] = React.useRef(null);

  const handleChangePage = ( page : number , pageSize : number ) => {
    setPageInfo({ page , pageSize })
  }

  const handleCloseModal = () => {
    setModalIsOpen(false)
  }

  const handleInsert = () => {
    setModalTitle(GLOBAL_TABLE_TEXT.INSERT_TEXT)
    setModalIsOpen(true)
  }
  const handleOpenUpdate = ( record : T ) => {
    setModalTitle(GLOBAL_TABLE_TEXT.UPDATE_TEXT)
    setSelectData(record)
    setModalIsOpen(true)
  }

  const handleGetUpdateData = async ( record : T ) => {
    return await getUpdateData(record)
  }
  const handleDelete = async ( record? : T ) => {
    try {
      if (record) {
        await handleDeleteData([] , record)
      } else {
        await handleDeleteData(selectedRowKeys as number[])
      }
      setSelectedRowKeys([])
      handleFindData({
        page , pageSize , condition : { ...form.getFieldsValue(true) }
      })
      notificationActiveSuccess(GLOBAL_TABLE_TEXT.DELETE_TEXT)
    } catch (e) {
      notificationActiveFail(GLOBAL_TABLE_TEXT.DELETE_TEXT , e?.toString() as string)
    }
  }
  const handleTableHeight = () => {
    setTableHeight(`calc(100vh - ${tableRef.current?.nativeElement.getBoundingClientRect().bottom}px)`)
  }
  useEffect(() => {
    handleFindData({ page , pageSize , condition : { ...form.getFieldsValue(true) } })
  } , [pageInfo])
  useEffect(() => {
    handleTableHeight()
  } , [])
  const onSelectChange = ( newSelectedRowKeys : React.Key[] ) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys ,
    onChange : onSelectChange ,
  };
  const handleSearch = () => {
    handleFindData({ page : 1 , pageSize , condition : { ...form.getFieldsValue(true) } })
    setPageInfo({ page : 1 , pageSize : 20 })
  }

  const handleResetSearch = () => {
    form.resetFields()
    handleFindData({ page , pageSize , condition : { ...form.getFieldsValue(true) } })
  }
  return {
    TableComponent : (
        <div>
          <div className={`layout-container min-h-[72px] items-end flex justify-between`}>
            <div>
              <Form className={"flex flex-wrap"} form={form}>
                {columns.filter(( item ) => {
                  return item.isSearch
                }).map(item => <Form.Item name={item.dataIndex} className={"ml-4 w-64"} key={item.dataIndex}
                                          label={item.title as string}>
                  {item.selectOrSwitchOption ? <Select placeholder={item.title as string} options={item.selectOrSwitchOption}/>:
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
              <Button className={"h-9 w-19"} onClick={handleInsert} icon={<PlusOutlined/>} type="primary">
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
                             const { page , pageSize } = pageInfo
                             handleFindData({ page , pageSize , condition : { ...form.getFieldsValue(true) } })
                           }}/>
            {/*表格信息*/}

            <Table
                ref={tableRef}
                scroll={{
                  scrollToFirstRowOnChange : true ,
                  y : tableHeight
                }}
                pagination={isPage ? {
                  position : ['bottomCenter'] ,
                  current : pageInfo.page ,
                  pageSize : pageInfo.pageSize ,
                  onChange : handleChangePage ,
                  showQuickJumper : true ,
                  total : total ,
                  showSizeChanger : true
                }:isPage}
                loading={loading}
                bordered
                rowSelection={rowSelection}
                rowKey={'id'}
                columns={
                  // 增加操作的字段
                  columns ? [...columns , {
                    title : GLOBAL_SYSTEM_TEXT.ACTIVE ,
                    key : 'action' ,
                    width : 256 ,
                    render : ( _ , record ) => (<Space size="middle">
                      {/*判断是否有关于权限的方法*/}
                      {handleRoleAuthority ? <a onClick={() => handleRoleAuthority(record)}><SettingOutlined
                          className={'mr-2'}/>权限</a>:<></>}
                      <a onClick={() => handleOpenUpdate(record)}><EditOutlined
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
                  }]:[]}
                dataSource={dataSource}>
            </Table>
          </div>
        </div>)
  }
}

