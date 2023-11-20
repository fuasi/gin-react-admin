import { userStorage } from "@/store/userStorage.ts";
import EditInput from "@/views/backend/self/components/EditInput.tsx";
import FileUpload from "@/components/FileUpload.tsx";

const SelfInfo = () => {

  return (
    <div className={"flex justify-center items-center flex-col"}>
      <FileUpload src={userStorage.user.avatar}/>
      <div className={"mt-2"}>
        <EditInput>
          <span className={"font-sans text-2xl"}>{userStorage.user.nickname}</span>
        </EditInput>
      </div>
      <div className={"mt-2"}>
        <span className={"text-slate-500"}>这个家伙很懒，什么都没有留下</span>
      </div>
    </div>
  )
}
export default SelfInfo
