import React, {FC} from "react";
import {UserFriendList} from "../../../Vidgets/Profile/UserFriendList/UserFriendList";
import {useProfilePageContainer} from "../../../../Hooks/ContainerHooks/useProfilePageContainer";
import {ProfileProperties} from "../../../Vidgets/Profile/ProfileProperties/ProfileProperties";
import {
    changeNikName,
    changeStatus,
    putNickNameProfile,
    putStatusProfile
} from "../../../../store/reducers/profileSlice";
import useUserTextAreaContainer from "../../../../Hooks/ContainerHooks/useUserTextAreaContainer";
import {ElementEvents} from "../../../../events/ElementEvents";
import {useUserPhotoContainer} from "../../../../Hooks/ContainerHooks/useUserPhotoContainer";
import {photoSelectors} from "../../../../store/selectors";
import {IFCPropsDispatch, IFCPropsMyId} from "../../../../ITypes";
import {UserOrMyPhoto} from "../../../Vidgets/Photo/UserOrMyPhoto";
import {getPhoto} from "../../../../store/reducers/photosSlice";
import {SubscribeWidget} from "../../../Vidgets/User/SubscribeVidget/SubscribeVidget";
import {AddNewFriend} from "../../../Vidgets/Profile/AddNewFriend/AddNewFriend";
import {Playlist} from "../../../Vidgets/Playlist/Playlist";
import {usePlaylistContainer} from "../../../../Hooks/ContainerHooks/usersHooks/usePlaylistContainer";
import style from './ProfilePage.module.scss'

export const ProfilePage: FC<IFCPropsDispatch & IFCPropsMyId> = (props) => {
    const {dispatch, myId} = props
    const {userId} = useProfilePageContainer(dispatch)
    const isMyProfilePage = myId === userId
    return (
        <div className={style.profileWrapper}>
            <UserOrMyPhoto {...{
                dispatch, id: userId, useUserPhotoContainer, myId,
                thunk: getPhoto, photoSelectorPath: photoSelectors.path(userId),
                isLoadingSelector: photoSelectors.isLoading(userId)}}/>
            <div className={style.infoWrapper}>
                <div>
                    <ProfileProperties {...{isMyTextArea: isMyProfilePage, dispatch, onChangeSubmit: putNickNameProfile}}
                                       textareaProps={{
                                           id: 'Имя/никнейм :', disabled: !isMyProfilePage,
                                           onChange: ElementEvents.textArea.onChange(dispatch,
                                               (value: string) => changeNikName(value))
                                       }} useUserUserProperties={useUserTextAreaContainer('nickName')}/>
                    <ProfileProperties {...{isMyTextArea: isMyProfilePage, dispatch, onChangeSubmit: putStatusProfile}}
                                       textareaProps={{
                                           id: 'Статус :', disabled: !isMyProfilePage,
                                           onChange: ElementEvents.textArea.onChange(dispatch,
                                               (value: string) => changeStatus(value))
                                       }} useUserUserProperties={useUserTextAreaContainer('status')}/>
                </div>
                <Playlist {...{dispatch,usePlaylistContainer}} isMyPlaylists={isMyProfilePage}/>
                <UserFriendList {...{dispatch, id: userId,isMyProfile:isMyProfilePage}}/>
                {isMyProfilePage ? <SubscribeWidget {...{dispatch}}/>
                    : <AddNewFriend {...{dispatch,myId,id:userId}}/>}
            </div>

    </div>)
}