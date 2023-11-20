import { notificationActiveFail } from "@/utils/notification.tsx";

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export const reportError = ({active , message}: {active: string, message: string}) => {
  notificationActiveFail(active , message)
}
