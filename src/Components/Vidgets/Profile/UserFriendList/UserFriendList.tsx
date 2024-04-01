import React, {FC} from "react";
import style from './UserFriendList.module.scss'
import useUserFriendsContainer from "../../../../Hooks/ContainerHooks/profileHooks/useUserFriendsContainer";
import {AddNewUser} from "../../User/AddNewUser/AddNewUser";
import {PhotoFC} from "../../Photo/PhotoFC";
import {useUserPhotoContainer} from "../../../../Hooks/ContainerHooks/useUserPhotoContainer";
import {photoSelectors} from "../../../../store/selectors";
import {getPhoto} from "../../../../store/reducers/photosSlice";
import {IFCPropsDispatch, userType} from "../../../../ITypes";
import {NavLink} from "react-router-dom";

const MyFriendsPhotos: FC<IFCPropsDispatch & Pick<userType, 'friends'>> = (props) => {
    const {dispatch, friends} = props
    return (
        <>
            {friends.map(friends =>
                <NavLink to={`/profile/${friends}`} title={'Перейти к профилю'} key={friends}>
                    <PhotoFC {...{dispatch, id: friends, thunk: getPhoto}}
                             useUserPhotoContainer={useUserPhotoContainer}
                             photoSelectorPath={photoSelectors.path(friends)}
                             isLoadingSelector={photoSelectors.isLoading(friends)}
                             wrapper={{
                                 className: style.userPhoto,
                             }}
                    />
                </NavLink>
            )
            }
        </>
    )
}
export const UserFriendList: FC<IFCPropsDispatch & { isMyProfile: boolean }> = (props) => {
    const {dispatch, isMyProfile} = props
    const {friends} = useUserFriendsContainer()
    return (
        <div className={style.userFriendList}>
            {friends.length === 0 ?
                isMyProfile ?
                    <AddNewUser/> :
                    <p style={{fontWeight:'bold',color:'black'}}>У пользователя нет друзей.</p>
                : <>
                    <p>Список друзей:</p>
                    <MyFriendsPhotos {...{dispatch, friends}}/>
                </>
            }
        </div>)
}