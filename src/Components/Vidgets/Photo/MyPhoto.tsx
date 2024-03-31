import {UserPhoto} from "./UserPhoto";
import {FC, useState} from "react";
import {FCArguments} from "../../../../ITypes";
import style from '../MyPhoto.module.scss'
import {ElementEvents} from "../../../../events/ElementEvents";

export const MyPhoto: FC<FCArguments<typeof UserPhoto>> = (props) => {
    const {dispatch, useUserPhotoContainer, thunk, photoSelectorPath, id, element,wrapper,isLoadingSelector} = props
    const [isOpenInputFormFile, openInputFormFile] = useState(false)
    const addOpenInputFile={...wrapper,onClick:() => {
            if(wrapper?.onClick){
                wrapper?.onClick()
            }
            openInputFormFile(value => !value)
        }
    }
    return <div>
        <UserPhoto {...{dispatch,id,useUserPhotoContainer,element,thunk,photoSelectorPath,isLoadingSelector}}
                   wrapper={{...addOpenInputFile}}/>
        {isOpenInputFormFile ?
            <form method="post" encType="multipart/form-data" style={{marginTop:'10px'}}>
                <label className={style.input_file}>
                    <input type="file" accept="image/png, image/jpeg"
                           onChange={ElementEvents.input.onChange(dispatch)}/>
                    <div className={style.input_file_btn}>Загрузить/обновить фотов</div>
                    <div className={style.input_file_text}>Максимум 10мб</div>
                </label>
            </form> : undefined
        }
    </div>
}