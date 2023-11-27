import React from "react";
import style from './UserInfo.module.css'
import useUserInfoContainer from "../../../../Hooks/ContainerHooks/usersHooks/useUserInfoContainer";

export const UserInfo: React.ElementType = () => {
    const {status,nikName}=useUserInfoContainer()
    return (<div className={style.userInfo}>
        <div>
            {nikName}
        </div>
    </div>)
}