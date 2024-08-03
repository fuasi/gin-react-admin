import { observable } from 'mobx'
import { User } from "@/apis/system/user.ts";

const userStorage = observable<{ user : User }>({
  user : {
    id : -1,
    avatar : '',
    path : '',
    roleId : []
  }
})

export {
  userStorage
}
