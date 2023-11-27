import React from "react";
import style from './ProfilePage.module.scss'
import {UserPhoto} from "../../../Vidgets/User/UserPhoto/UserPhoto";
import {UserFriendList} from "../../../Vidgets/User/UserFriendList/UserFriendList";
import {IDispatchInProps} from "../../../../ITypes/BaseHtmlTypes";
import {useProfilePageContainer} from "../../../../Hooks/ContainerHooks/useProfilePageContainer";
import {UserProperties} from "../../../Vidgets/User/UserProperties/UserProperties";
import {changeNikName, changeStatus, putNickName, putStatus} from "../../../../store/reducers/userSlice";
import useUserTextAreaContainer from "../../../../Hooks/ContainerHooks/useUserTextAreaContainer";
import {ElementEvents} from "../../../../events/ElementEvents";

export const ProfilePage: React.ElementType<IDispatchInProps> = (props: IDispatchInProps) => {
    const {dispatch} = props
    const {userId} = useProfilePageContainer(dispatch)
    return (<div className={style.profileContent}>
        <div className={style.userProfile}>
            <UserPhoto dispatch={dispatch} id={userId}/>
            <div style={{marginLeft: '10px'}}>
                <UserProperties textareaProps={{
                    id: 'Имя/никнейм :',
                    onChange: (e) => ElementEvents.onChangeTextAreaEvent(
                        e, dispatch, (value: string) => changeNikName(value))}}
                                dispatch={dispatch} onChangeSubmit={putNickName}
                                useUserUserProperties={useUserTextAreaContainer('nickName')}/>
                <UserProperties textareaProps={{
                    id: 'Статус :',
                    onChange: (e) => ElementEvents.onChangeTextAreaEvent(
                        e, dispatch, (value: string) => changeStatus(value))}}
                                dispatch={dispatch} onChangeSubmit={putStatus}
                                useUserUserProperties={useUserTextAreaContainer('status')}/>
                <UserFriendList/>
            </div>
        </div>
        {/*<UserFeed/>*/}
    </div>)
}