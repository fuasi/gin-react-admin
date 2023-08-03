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
        LOGIN_FAIL : "请输入正确的登录信息！",
        LOGOUT : "退出登录成功！"
    },
    TABLE_TEXT : {
        INSERT_ALERT_TEXT : "新增",
        UPDATE_ALERT_TEXT : "编辑",
        DELETE_ALERT_TEXT : "确定删除?",
        RESET_PASSWORD_TEXT : "重置密码"
    },
    SYSTEM_TEXT : {
        ACTIVE_RELOAD_SUCCESS : "刷新成功",
    }


}
export const GLOBAL_NOTIFICATION_TEXT = systemText.NOTIFICATION_TEXT
export const GLOBAL_LOGIN_TEXT = systemText.LOGIN_TEXT
export const GLOBAL_TABLE_TEXT = systemText.TABLE_TEXT
export const GLOBAL_SYSTEM_TEXT = systemText.SYSTEM_TEXT


export default GLOBAL_CONFIG