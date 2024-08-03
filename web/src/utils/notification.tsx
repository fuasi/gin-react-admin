import { notificationStorage } from "@/store/notificationStorage.ts";
import { GLOBAL_NOTIFICATION_TEXT, GLOBAL_SYSTEM_TEXT } from "@/config";
import { IconType } from "antd/es/notification/interface";

export const notificationLoginSuccess = ( description: string ) => {
  notificationSuccess(GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_LOGIN_SUCCESS, description)
}
export const notificationLoginFail = ( description: string ) => {
  notificationFail(GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_LOGIN_FAIL, description)
}
export const notificationLogout = ( description: string ) => {
  notificationSuccess(GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_ACTIVE_LOGOUT, description)
}
/**
 * 系统操作信息提示
 * @param active  操作方式,例如 删除,添加
 */
export const notificationActiveSuccess = ( active: string ) => {
  notificationSuccess(GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_SYSTEM, GLOBAL_SYSTEM_TEXT.ACTIVE_SUCCESS_ALERT(active))

}
export const notificationActiveFail = ( active: string, error: string ) => {
  notificationFail(GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_SYSTEM, GLOBAL_SYSTEM_TEXT.ACTIVE_FAIL_ALERT(active, error))
}

export const notificationActiveInfo = ( active: string ) => {
  notificationInfo(GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_SYSTEM, active)
}

const notificationSuccess = ( message: string, description: string | JSX.Element ) => {
  baseNotification("success", message, description)
}
const notificationFail = ( message: string, description: string | JSX.Element ) => {
  baseNotification("error", message, description)
}
const notificationInfo = ( message: string, description: string | JSX.Element ) => {
  baseNotification("info", message, description)
}

const baseNotification = ( type: IconType, message: string, description: string | JSX.Element ) => {
  notificationStorage.globalNotification = {
    type: type,
    message: message,
    description: description,
    duration: 2,
  }
  notificationStorage.type = "active"
}