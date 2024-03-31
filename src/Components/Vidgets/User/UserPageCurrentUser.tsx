import React, {FC} from "react";
import {useUserPhotoContainer} from "../../../../Hooks/ContainerHooks/profileHooks/useUserPhotoContainer";
import {getUserPhoto} from "../../../../store/reducers/usersSlice";
import {usersSliceSelectors} from "../../../../store/selectors";
import userPhotoStyle from './User.module.scss'
import {NavLink} from "react-router-dom";
import textStyle from "../../TextProperty/TextProperty.module.scss"
import {CopyTextProperty} from "../../TextProperty/CopyTextProperty/CopyTextProperty";
import {changePhoto} from "../../../../store/reducers/profileSlice";
import {IFCPropsDispatch, IFCPropsMyId, userType} from "../../../../ITypes";
import {UserOrMyPhoto} from "../../Photo/UserPhoto/UserOrMyPhoto";


type UserPropsType = { id: userType['id'], nickName: userType['nickName'] } & { userCount: number }
    & IFCPropsDispatch & IFCPropsMyId
export const UserPageCurrentUser: FC<UserPropsType> = (props) => {
    const {id, nickName, dispatch, userCount, myId} = props
    return (
        <div className={userPhotoStyle.user}>
            <NavLink to={`/profile/${id}`} style={{display:"inline-block"}}>
                <UserOrMyPhoto dispatch={dispatch} id={id} myId={myId} thunk={getUserPhoto}
                               useUserPhotoContainer={useUserPhotoContainer}
                               photoSelectorPath={usersSliceSelectors.photo(userCount)}
                               isLoadingSelector={usersSliceSelectors.isLoadingPhoto(userCount)}
                               wrapper={{
                                   elementClassname: userPhotoStyle.userPhotoHover,
                                   onClick: (photo) => {
                                       dispatch(changePhoto(photo))
                                   }}}/>
            </NavLink>
            <CopyTextProperty text={id} propertyStyle={{
                style: {marginTop: '5px'},
                className: {
                    copy: textStyle.userAfterPlaceholderCopy,
                    writeCopy: textStyle.userAfterPlaceholderWriteCopy
                }
            }}/>
            <CopyTextProperty text={nickName} propertyStyle={{
                style: {marginTop: '5px'},
                className: {
                    copy: textStyle.userAfterPlaceholderCopy,
                    writeCopy: textStyle.userAfterPlaceholderWriteCopy
                }
            }}/>
        </div>
    );
};