import {ChangeEvent, Dispatch, FC, SetStateAction} from "react";
import {AppDispatch, IFCPropsDispatch} from "../../../ITypes";
import style from "./PostForm.module.scss";

type updateMyPhotoFormProps = { isOpenForm: boolean, changeOpenFormFile: Dispatch<SetStateAction<boolean>> }
    & IFCPropsDispatch & { id: string | null } & { buttonName: string } & { acceptFile: string } & {
    onChangeSendFile: (dispatch: AppDispatch, id: string | null, changeOpenFormFile?: Dispatch<SetStateAction<boolean>>)
        => (e: ChangeEvent<HTMLInputElement>) => void; };
export const PostForm: FC<updateMyPhotoFormProps> = (props) => {
    const {dispatch, isOpenForm, changeOpenFormFile, id, buttonName, onChangeSendFile, acceptFile} = props
    return (isOpenForm ?
            <form method="post" encType="multipart/form-data"
                  style={{marginTop: '10px', display: "flex", justifyContent: 'center'}}>
                <label className={style.input_file}>
                    <input type="file" accept={acceptFile}
                           onChange={onChangeSendFile(dispatch, id, changeOpenFormFile)}/>
                    <div className={style.input_file_btn}>{buttonName}</div>
                    <div className={style.input_file_text}>Максимум 10мб</div>
                </label>
            </form> : null
    )
}