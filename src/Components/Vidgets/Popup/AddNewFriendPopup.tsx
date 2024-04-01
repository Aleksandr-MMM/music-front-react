import React, {FC} from "react";
import {useUserPhotoContainer} from "../../../Hooks/ContainerHooks/useUserPhotoContainer";
import {IFCPropsDispatch} from "../../../ITypes";
import style from './AddNewFriendPopup.module.scss'
import {PhotoFC} from "../Photo/PhotoFC";
import {photoSelectors} from "../../../store/selectors";
import {getPhoto} from "../../../store/reducers/photosSlice";
import {createPortal} from "react-dom";
import {CgClose} from "react-icons/cg";
import {profileSliceType} from "../../../store/reducers/profileSlice";
import {Icons} from "../Icons/Icons";
import {NavLink} from "react-router-dom";
import {ElementEvents} from "../../../events/ElementEvents";
import {Breadcrumb} from "../Breadcrumb/Breadcrumb";

type AddNewFriendPopupPropsType = IFCPropsDispatch & {
    subscribe: profileSliceType['subscribe'],
    changePopup: React.Dispatch<React.SetStateAction<boolean>>
}
export const AddNewFriendPopup: FC<AddNewFriendPopupPropsType> = (props) => {
    const {dispatch, subscribe, changePopup} = props
    return (createPortal(
            <div className={style.vignetting}>
                <div className={style.popupPortal}>
                    {
                        subscribe.map(userId =>
                            <div key={userId}>
                                <NavLink to={`/profile/${userId}`} style={{display: "inline-block"}}
                                         onClick={ElementEvents.other.changeBooleanState(changePopup)} >
                                    <PhotoFC {...{
                                        dispatch, id: userId,
                                        useUserPhotoContainer, photoSelectorPath: photoSelectors.path(userId),
                                        isLoadingSelector: photoSelectors.isLoading(userId), thunk: getPhoto,
                                        wrapper: {className: `${style.userPhotoHover} ${style.photoSize}`,}
                                    }}/>
                                </NavLink>
                                <Breadcrumb breadcrumb={[
                                    {
                                        children: "Добавить в друзья.", className: style.breadcrumbAdd,
                                        onClick: ElementEvents.other.addNewFriend(dispatch, userId,changePopup)
                                    },
                                    {
                                        children: "Удалить заявку в друзья.", className: style.breadcrumb,
                                        onClick: ElementEvents.other.unSubscribeUser(dispatch, userId)
                                    },
                                ]}/>

                                <Icons icon={CgClose} iconSize={50} iconProps={{color: 'red'}}
                                       wrapper={{
                                           className: style.closePopupIcon,
                                           onClick: ElementEvents.other.changeBooleanState(changePopup)
                                       }}/>
                            </div>
                        )
                    }

                </div>
            </div>
            ,
            document.body
        )
    );
};