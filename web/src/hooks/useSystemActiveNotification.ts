import {notificationActiveFail, notificationActiveSuccess} from "@/utils/notification.tsx";

export const useSystemActiveNotification = () => {
    const withNotification = async (func: () => Promise<void> | void, active: string, finallyFunc: () => void) => {
        try {
            await func()
            notificationActiveSuccess(active)
        } catch (e) {
            notificationActiveFail(active, e?.toString() as string)
        } finally {
            finallyFunc()
        }
    }
    return {
        withNotification
    }
}
