import { notificationStorage } from "@/store/notificationStorage.ts";
import { GLOBAL_NOTIFICATION_TEXT } from "@/config";
import { IconType } from "antd/es/notification/interface";

export const notificationLoginSuccess = (description: string) => {
    notificationSuccess(GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_LOGIN_SUCCESS, description)
}
export const notificationLoginFail = (description: string) => {
    notificationFail(GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_LOGIN_FAIL, description)
}
export const notificationLogout = (description: string) => {
    notificationSuccess(GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_ACTIVE_LOGOUT, description)
}
export const notificationActiveSuccess = (description: string) => {
    notificationSuccess(GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_SYSTEM, description)
}
export const notificationActiveFail = (description: string) => {
    notificationFail(GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_SYSTEM, description)
}

const notificationSuccess = (message: string, description: string) => {
    baseNotification("success", message, description)
}
const notificationFail = (message: string, description: string) => {
    baseNotification("error", message, description)
}

const baseNotification = (type: IconType, message: string, description: string) => {
    notificationStorage.globalNotification = {
        type : type,
        message : message,
        description : description,
        duration : 2,
    }
    notificationStorage.type = "active"
}