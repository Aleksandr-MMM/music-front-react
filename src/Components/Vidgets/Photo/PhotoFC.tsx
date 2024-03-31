import React, {FC} from "react";
import style from './UserPhoto.module.scss'
import handPhoto from '../../../assets/hand.svg'
import {
    AppDispatch,
    asyncThunk,
    IFCPropsDispatch,
    IFCPropsElementClassname,
    IFCPropsElementStyle,
    IFCPropsId,
    IFCStyledProps, RootState, urlLoadingType, urlType
} from "../../../ITypes";

type wrapperUserPhotoOnClick = { onClick?: ((photo?: urlType['path']) => void) } | undefined
type photoContainerArg=[dispatch: AppDispatch, id: string | null, thunk: asyncThunk,
        photoSelector: photoSelectorType['photoSelectorPath'],
        isLoadingSelector: isLoadingSelectorType['isLoadingSelector']];
type useUserPhotoContainerType = {
    useUserPhotoContainer: (...arg:photoContainerArg) => urlType & { isLoading: (urlLoadingType['isLoading'] | undefined) },
};
type photoSelectorType = { photoSelectorPath: (state: RootState) => urlType['path'] }

export type isLoadingSelectorType = { isLoadingSelector: (state: RootState) => urlLoadingType["isLoading"]|undefined }
type styledUserPhotoType = IFCStyledProps<(IFCPropsElementClassname | undefined) & (IFCPropsElementStyle | undefined),
    (IFCPropsElementClassname | undefined) & (IFCPropsElementStyle | undefined) & wrapperUserPhotoOnClick>;
export type UserPhotoType = IFCPropsDispatch & IFCPropsId & useUserPhotoContainerType & { thunk: asyncThunk } &
    styledUserPhotoType & photoSelectorType & isLoadingSelectorType ;
const UserPhotoFC: FC<UserPhotoType> = (props) => {
    const {
        useUserPhotoContainer, dispatch, id, thunk, photoSelectorPath,
        wrapper, element, isLoadingSelector
    } = props
    const {path, isLoading} = useUserPhotoContainer(dispatch, id, thunk, photoSelectorPath, isLoadingSelector)

    return (<div className={`${style.photoWrapper} ${isLoading==='loading' ? style.pendingPhoto : ''} ${wrapper?.elementClassname ? wrapper.elementClassname : ''} `}
        onClick={() => {if (wrapper?.onClick) wrapper.onClick(path)}}>
        {/*загрузить фото или заглушку если запрос с сервера прошел*/
            path !== undefined ?
                <img src={path !== null ? path : handPhoto} alt="userPhoto"
                     className={`${style.userPhoto} ${element?.elementClassname ? element.elementClassname : ''}`}/> :
                undefined
        }
    </div>)
}
export const UserPhoto = React.memo(UserPhotoFC);