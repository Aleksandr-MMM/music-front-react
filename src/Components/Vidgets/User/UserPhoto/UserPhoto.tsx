import React from "react";
import style from './UserPhoto.module.scss'
import {IDispatchInProps, IPropsId} from "../../../../ITypes/BaseHtmlTypes";
import {useUserPhotoContainer} from "../../../../Hooks/ContainerHooks/usersHooks/useUserPhotoContainer";

export const UserPhoto = (props: IDispatchInProps&IPropsId ) => {
    const {dispatch,id} = props
    const {photo} = useUserPhotoContainer(dispatch,id)
    return (<div className={style.photoWrapper}>
        <img src={`${photo}`} alt="userPhoto" className={style.userPhoto}/>
    </div>)
}