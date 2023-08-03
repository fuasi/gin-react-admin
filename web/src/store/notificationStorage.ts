import { observable } from "mobx";
import { ArgsProps } from "antd/es/notification/interface";


const notificationStorage = observable<{ globalNotification: ArgsProps, type: "sleep" | "active" }>({
    globalNotification : {
        type : "success",
        message : "",
        description : "",
        duration : null
    },
    type : "sleep"
}, {})

export { notificationStorage }