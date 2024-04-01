import {MyPhoto} from "./MyPhoto";
import {PhotoFC} from "./PhotoFC";
import React, {FC} from "react";
import {FCArguments, IFCPropsId, IFCPropsMyId} from "../../../ITypes";
import hoverStyle from './UserPhoto.module.scss'

type propsType = FCArguments<typeof PhotoFC> & IFCPropsId & IFCPropsMyId
export const UserOrMyPhoto: FC<propsType> = (props) => {
    const {useUserPhotoContainer, photoSelectorPath, isLoadingSelector, id, element, wrapper, thunk, dispatch, myId} = props
    return (myId === id ?
                <MyPhoto {...{
                    dispatch, id, thunk, photoSelectorPath, isLoadingSelector, element, useUserPhotoContainer,
                    wrapper: {...wrapper, className: `${hoverStyle.photoHover} ${wrapper?.className ? wrapper.className : ''}`},
                }}/> :
                <PhotoFC {...{
                    dispatch, id, thunk, photoSelectorPath, isLoadingSelector, wrapper, element,
                    useUserPhotoContainer
                }}/>
    )
}