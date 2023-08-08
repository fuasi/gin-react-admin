import zhCN from "antd/es/locale/zh_CN";
import {Button, ConfigProvider, Popconfirm, Space, Table, TableProps} from "antd";
import {PageInfo} from "@/apis/baseApis.ts";
import {useEffect, useState} from "react";
import TableModalComponent from "@/components/TableModalComponent.tsx";
import {ColumnGroupType, ColumnType} from "antd/es/table";
import {DeleteOutlined, EditOutlined, KeyOutlined, PlusOutlined} from "@ant-design/icons";
import Styles from "@/views/backend/admin/user/user.module.scss";
import {HTTPResponse} from "@/apis";
import {GLOBAL_TABLE_TEXT} from "@/config";
import {notificationActiveFail, notificationActiveSuccess} from "@/utils/notification.tsx";

export type TableColumns<T> = (ColumnGroupType<T> | ColumnType<T>)[]

interface TableHookProps<T> {
  tableProps: Pick<TableProps<T>, keyof TableProps<T>>;
  handleFindData: (page: PageInfo) => void;
  getUpdateData: (record: T) => HTTPResponse<T>;
  handleUpdateData: (record: T, args: any) => Promise<void>;
  handleInsertData: (record: T, args: any) => void;
  handleDeleteData: (record: T) => void;
  columns: InputAndColumns<T>[];
  handleUserResetPassword?: (record: T) => void;
}

interface TableHookResult {
  TableComponent: JSX.Element
}

type InputType = 'Switch'

export type InputAndColumns<T> =
  Pick<(ColumnGroupType<T> | ColumnType<T>), keyof (ColumnType<T> | ColumnGroupType<T>)>
  & {
  loadingInputRender?: (loading: boolean, avatarURL: string, setUpload: (URL: string, file: File) => void, record?: T) => JSX.Element,
  InputType?: InputType
  dataIndex: string,
  inputType?: InputType,
  required?: boolean,
  isShow?: boolean
}


export const useTable = <T extends object>(props: TableHookProps<T>): TableHookResult => {
  const {loading, dataSource} = props.tableProps
  const {
    handleUpdateData,
    handleInsertData,
    handleFindData,
    handleDeleteData,
    getUpdateData,
    handleUserResetPassword,
    columns
  } = props
  const [page, setPage] = useState<PageInfo>({page: 1, pageSize: 10})
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState(GLOBAL_TABLE_TEXT.INSERT_TEXT)
  const [selectData, setSelectData] = useState<T>()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleChangePage = (page: number, pageSize: number) => {
    setPage({page, pageSize})
  }

  const handleCloseModal = () => {
    setModalIsOpen(false)
  }

  const handleInsert = () => {
    setModalTitle(GLOBAL_TABLE_TEXT.INSERT_TEXT)
    setModalIsOpen(true)
  }
  const handleOpenUpdate = (record: T) => {
    setModalTitle(GLOBAL_TABLE_TEXT.UPDATE_TEXT)
    setSelectData(record)
    setModalIsOpen(true)
  }
  const handleGetUpdateData = async (record: T) => {
    return await getUpdateData(record)
  }
  const handleDelete = async (record: T) => {
    try {
      await handleDeleteData(record)
      handleFindData(page)
      notificationActiveSuccess(GLOBAL_TABLE_TEXT.DELETE_TEXT)
    } catch (e) {
      notificationActiveFail(GLOBAL_TABLE_TEXT.DELETE_TEXT, e?.toString() as string)
    }
  }

  useEffect(() => {
    handleFindData(page)
  }, [page])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return {
    TableComponent: (
      <div>
        <div className={Styles.userButtonContainer}>
          <Button onClick={handleInsert} icon={<PlusOutlined/>} type="primary">
            {GLOBAL_TABLE_TEXT.INSERT_TEXT}
          </Button>
        </div>
        <div className={Styles.userTableContainer}>
          <ConfigProvider locale={zhCN}>
            <TableModalComponent<T> ModalInputs={columns} modalTitle={modalTitle}
                                    closeModal={handleCloseModal}
                                    isModalOpen={modalIsOpen}
                                    handleInsertData={handleInsertData}
                                    handleGetUpdateData={() => handleGetUpdateData(selectData!)}
                                    handleUpdateData={handleUpdateData}
                                    reloadTable={() => handleFindData(page)}/>
            <Table
              pagination={{
                position: ['bottomCenter'],
                pageSize: page.pageSize,
                onChange: handleChangePage,
                showQuickJumper: true
              }}
              loading={loading}
              bordered
              rowSelection={rowSelection}
              rowKey={'id'}
              columns={columns ? [...columns, {
                title: '操作',
                key: 'action',
                width: 256,
                render: (_, record) => (<Space size="middle">
                  <a onClick={() => handleOpenUpdate(record)}><EditOutlined
                    className={'mr-2'}/>编辑</a>
                  <Popconfirm
                    title={<span className={"text-red-400"}>危险警告</span>}
                    description={<div>
                      确定进行
                      <span className={"text-red-400"}>删除</span>
                      操作吗?
                    </div>
                    }
                    onConfirm={() => handleDelete(record)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <a className={"text-red-400"}><DeleteOutlined
                      className={'mr-2'}/>
                      {GLOBAL_TABLE_TEXT.DELETE_TEXT}</a>
                  </Popconfirm>
                  {handleUserResetPassword ?
                    <a onClick={() => handleUserResetPassword(record)}><KeyOutlined
                      className={'mr-2'}/>{GLOBAL_TABLE_TEXT.RESET_PASSWORD_TEXT}
                    </a> : <></>}
                </Space>)
              }] : []}
              dataSource={dataSource}>
            </Table>
          </ConfigProvider>
        </div>
      </div>)
  }
}

