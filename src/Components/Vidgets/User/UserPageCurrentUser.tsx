import React, {FC} from "react";
import {useUserPhotoContainer} from "../../../Hooks/ContainerHooks/useUserPhotoContainer";
import {photoSelectors} from "../../../store/selectors";
import {NavLink} from "react-router-dom";
import {IFCPropsDispatch, IFCPropsMyId, userType} from "../../../ITypes";
import {UserOrMyPhoto} from "../Photo/UserOrMyPhoto";
import {changePhoto, getPhoto} from "../../../store/reducers/photosSlice";
import {TextPropertyWithLabel} from "../TextProperty/TextPropertyWithLabel/TextPropertyWithLabel";
import userStyle from './User.module.scss'

type UserPropsType = { id: userType['id'], nickName: userType['nickName'] } & IFCPropsDispatch & IFCPropsMyId
export const UserPageCurrentUser: FC<UserPropsType> = (props) => {
    const {id, nickName, dispatch, myId} = props
    return (
        <div className={userStyle.user}>
            <NavLink to={`/profile/${id}`} style={{display: "inline-block"}}>
                <UserOrMyPhoto dispatch={dispatch} id={id} myId={myId} thunk={getPhoto}
                               useUserPhotoContainer={useUserPhotoContainer}
                               photoSelectorPath={photoSelectors.path(id)}
                               isLoadingSelector={photoSelectors.isLoading(id)}
                               wrapper={{
                                   onClick: (photo) => {
                                       dispatch(changePhoto({url: photo, id: id}))
                                   }}}/>
            </NavLink>
            <div className={userStyle.userPropertyWrapper}>
                <TextPropertyWithLabel discriminant={'textWithCopy'} text={id ? id : 'id не найден'}
                                       wrapper={{className:userStyle.propertyWrapper}}
                                       labelElement={{children:'Уникальный id пользователя :'}}/>
                <TextPropertyWithLabel discriminant={'textWithCopy'} text={nickName ? nickName : 'Новый пользователь'}
                                       wrapper={{className:userStyle.propertyWrapper}}
                                       labelElement={{children:'Никнейм/имя пользователя :'}}/>
            </div>
        </div>
    );
};