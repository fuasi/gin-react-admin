import { useEffect, useRef, useState } from "react";
import { Input, InputRef } from "antd";
import { userStorage } from "@/store/userStorage.ts";
import { FormOutlined } from "@ant-design/icons";
import * as React from "react";

interface EditInputProps {
  children : React.ReactNode
}


const EditInput = ({ children } : EditInputProps) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus()
  }, [editing])

  const handleEditing = () => {
    setEditing(true)
  }

  const handleSave = () => {
    setEditing(false)
  }

  return (
    <div className={ "flex justify-center items-center" }>
      { editing ?
        <Input onBlur={ handleSave } ref={ inputRef } value={ userStorage.user.nickname }/> :
        children
      }
      <FormOutlined onClick={ handleEditing } className={ "text-blue-500 ml-2" }/>
    </div>
  )
};

export default EditInput