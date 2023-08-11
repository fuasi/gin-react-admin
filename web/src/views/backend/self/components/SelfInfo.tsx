import AvatarUpload from "@/components/AvatarUpload.tsx";
import { userStorage } from "@/store/userStorage.ts";
import EditInput from "@/views/backend/self/components/EditInput.tsx";
import { useState } from "react";
import { UploadComponentProp } from "@/components/TableModal.tsx";

const SelfInfo = () => {
  const [upload, setUpload] = useState<UploadComponentProp>({
    previewAvatar : ''
  })
  return (
    <div className={ "flex justify-center items-center flex-col" }>
      <AvatarUpload image={ userStorage.user.avatar } imageWidth={ 102 } previewAvatar={ upload?.previewAvatar }
                    loading={ false }
                    setUpload={ setUpload }/>
      <div className={ "mt-2" }>
        <EditInput>
          <span className={ "font-sans text-2xl" }>{ userStorage.user.nickname }</span>
        </EditInput>
      </div>
      <div className={ "mt-2" }>
        <span className={ "text-slate-500" }>这个家伙很懒，什么都没有留下</span>
      </div>
    </div>
  )
}
export default SelfInfo