import { notificationStorage } from "@/store/notificationStorage.ts";
import { GLOBAL_NOTIFICATION_TEXT } from "@/config";

export const notificationLoginSuccess = (description: string) => {
    notificationStorage.globalNotification = {
        type : "success",
        message : GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_LOGIN_SUCCESS,
        description : description
    }
    notificationStorage.type = "active"
}
export const notificationLoginFail = (description: string) => {
    notificationStorage.globalNotification = {
        type : "error",
        message : GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_LOGIN_FAIL,
        description : description
    }
    notificationStorage.type = "active"
}
export const notificationActiveSuccess = (description: string) => {
    notificationStorage.globalNotification = {
        type : "success",
        message : GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_ACTIVE_SUCCESS,
        description : description
    }
    notificationStorage.type = "active"
}
export const notificationActiveFail = (description: string) => {
    notificationStorage.globalNotification = {
        type : "error",
        message : GLOBAL_NOTIFICATION_TEXT.NOTIFICATION_MESSAGE_ACTIVE_FAIL,
        description : description
    }
    notificationStorage.type = "active"
}