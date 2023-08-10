const GLOBAL_CONFIG = {
  API_BASEURL : "/api",
  API_TIMEOUT : 10000,
  SUCCESS_STATUS : 20000,
  ERROR_STATUS : 50000
}

const systemText = {
  NOTIFICATION_TEXT : {
    NOTIFICATION_MESSAGE_LOGIN_SUCCESS : "登录成功",
    NOTIFICATION_MESSAGE_LOGIN_FAIL : "登录失败",
    NOTIFICATION_MESSAGE_ACTIVE_SUCCESS : "操作成功",
    NOTIFICATION_MESSAGE_ACTIVE_FAIL : "操作失败",
    NOTIFICATION_MESSAGE_ACTIVE_LOGOUT : "退出登录",
    NOTIFICATION_MESSAGE_SYSTEM : "系统提示",
  },
  LOGIN_TEXT : {
    LOGIN_TITLE : "系统登录",
    LOGIN_BUTTON_TEXT : "登录",
    LOGIN_SUCCESS : "欢迎你,管理员",
    LOGIN_FAIL : "请输入正确的登录信息！如若多次尝试无法登录,可能是账号被管理员封禁！",
    LOGOUT : "退出登录成功！"
  },
  TABLE_TEXT : {
    INSERT_TEXT : "新增",
    UPDATE_TEXT : "编辑",
    DELETE_TEXT : "删除",
    RESET_PASSWORD_TEXT : "重置密码",
    SEARCH_TEXT : "查询",
    RESET_SEARCH_TEXT : "重置"
  },
  SYSTEM_TEXT : {
    ACTIVE_RELOAD_SUCCESS : "刷新",
    ACTIVE_SUCCESS : "成功！",
    ACTIVE_FAIL : "操作失败,",
    ACTIVE_REASON : "原因:",
    ACTIVE_HELP : ",用户如若无法解决请联系开发者！",
    ACTIVE_IS_CONTINUE : "确定进行",
    ACTIVE_ASK : "操作吗?",
    ACTIVE : "操作",
    ACTIVE_DANGER_ALERT : "危险警告",
    ACTIVE_SURE : "确定",
    ACTIVE_CANCEL : "取消",
    ACTIVE_RESETPASSWORD_PREFIX : "重置后的密码为:",
    ACTIVE_RESETPASSWORD_SUFFIX : ",请牢记密码,登录该账户后密码可进行更改！",
    ACTIVE_FAIL_ALERT : (active : string, err : string) => <>{ active }{ GLOBAL_SYSTEM_TEXT.ACTIVE_FAIL }<span
      className={ "text-red-400" }>{ GLOBAL_SYSTEM_TEXT.ACTIVE_REASON }{ err }</span>{ GLOBAL_SYSTEM_TEXT.ACTIVE_HELP }</>,
    ACTIVE_SUCCESS_ALERT : (active : string) => <><span
      className={ "text-red-400" }>{ active }</span>{ GLOBAL_SYSTEM_TEXT.ACTIVE }{ GLOBAL_SYSTEM_TEXT.ACTIVE_SUCCESS }</>,
    ACTIVE_RECONFIRM_DESC : (active : string) => <>
      <div>
        { GLOBAL_SYSTEM_TEXT.ACTIVE_IS_CONTINUE }
        <span className={ "text-red-400" }>{ active }</span>
        { GLOBAL_SYSTEM_TEXT.ACTIVE_ASK }
      </div>
    </>,
    ACTIVE_DANGER_TITLE : () => <span className={ "text-red-400" }>{ GLOBAL_SYSTEM_TEXT.ACTIVE_DANGER_ALERT }</span>,
    ACTIVE_RESETPASSWORD_ALERT : (password : string) =>
      <>{ GLOBAL_SYSTEM_TEXT.ACTIVE_RESETPASSWORD_PREFIX }
        <span className={ "text-red-400" }>{ password }</span>
        { GLOBAL_SYSTEM_TEXT.ACTIVE_RESETPASSWORD_SUFFIX }
      </>
  },
  USER_TEXT : {
    USER_ID : "ID",
    USER_AVATAR : "头像",
    USER_USERNAME : "用户名",
    USER_NICKNAME : "昵称",
    USER_PHONE : "手机号",
    USER_ENABLE : "启用",
    USER_ACTIVE_ENABLE_ON : "已启用",
    USER_ACTIVE_ENABLE_OFF : "已禁用",
  }
}
const { NOTIFICATION_TEXT, LOGIN_TEXT, TABLE_TEXT, SYSTEM_TEXT, USER_TEXT } = systemText

export const GLOBAL_NOTIFICATION_TEXT = NOTIFICATION_TEXT
export const GLOBAL_LOGIN_TEXT = LOGIN_TEXT
export const GLOBAL_TABLE_TEXT = TABLE_TEXT
export const GLOBAL_SYSTEM_TEXT = SYSTEM_TEXT
export const GLOBAL_USER_TEXT = USER_TEXT


export default GLOBAL_CONFIG