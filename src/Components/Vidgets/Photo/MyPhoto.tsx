import {PhotoFC} from "./PhotoFC";
import {FC, useState} from "react";
import {FCArguments} from "../../../ITypes";
import {ElementEvents} from "../../../events/ElementEvents";
import {PostForm} from "../Form/PostForm";

export const MyPhoto: FC<FCArguments<typeof PhotoFC>> = (props) => {
    const {dispatch, useUserPhotoContainer, thunk, photoSelectorPath, id, element, wrapper, isLoadingSelector} = props
    const [isOpenForm, changeOpenFormFile] = useState(false)
    const addOpenInputFile = {
        ...wrapper, className: `${wrapper?.className ? wrapper?.className : ''}`,
        onClick: () => {
            if (wrapper?.onClick) {
                wrapper?.onClick()
            }
            changeOpenFormFile(value => !value)
        }
    }
    return <div>
        <PhotoFC {...{
            dispatch, id, useUserPhotoContainer, element, thunk, photoSelectorPath, isLoadingSelector,
            wrapper: {...addOpenInputFile}
        }}/>
        <PostForm {...{dispatch,id,isOpenForm,changeOpenFormFile,acceptFile:"image/*",buttonName:'Загрузить фото',
        onChangeSendFile:ElementEvents.input.changeMyPhoto}}/>
    </div>
}