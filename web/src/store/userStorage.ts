import { observable } from 'mobx'
import { User } from "@/apis/userApis.ts";

const userStorage = observable<{ user : User }>({
  user : {
    id : -1,
    avatar : '',
  }
})

export {
  userStorage
}
