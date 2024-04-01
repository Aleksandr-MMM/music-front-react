import React, {FC, useState} from "react";
import {Formik, useFormikContext} from "formik";
import {ElementEvents} from "../../../events/ElementEvents";
import {FormikInput} from "../../Component/Formik/FormikInput";
import {FormikConstants} from "../../../Constants";
import style from './CreateNewPlaylist.module.scss'
import {createNewPlaylist} from "../../../store/reducers/profileSlice";
import {FormikValidation} from "../../../helpers/FormikValidation";
import {IFCPropsDispatch} from "../../../ITypes";
import {CustomButton} from "../../Component/Button/CustomButton";
import {Icons} from "../Icons/Icons";
import {CgClose} from "react-icons/cg";

const PlaylistInput: FC = () => {
    const {submitForm, setTouched} = useFormikContext<typeof FormikConstants.albumPlaylist>();
    return (
        <FormikInput labelProps={{children: 'Имя нового альбома :', className: style.label}}
                     elementProps={{
                         id: "albumName", placeholder: "Название альбома",
                         className: style.input,
                         onKeyUp: ElementEvents.Formik.onKeyUp(submitForm),
                         onClick: () => setTouched({albumName: true}),
                     }}
                     wrapper={{className: style.wrapper}}/>)
}
export const CreateNewPlaylist: FC<IFCPropsDispatch> = (props) => {
    const {dispatch} = props
    const [isOpenForm, changeOpenForm] = useState(true)
    return (<>
            {
                isOpenForm ? <CustomButton children={'Создать новый плейлист'}
                                           onClick={() => changeOpenForm(value => !value)}/> :
                    <div style={{display:'flex'}}>
                        <Formik initialValues={{...FormikConstants.albumPlaylist}}
                                validationSchema={FormikValidation.schema.playlist}
                                onSubmit={(values) => {
                                    dispatch(createNewPlaylist(values.albumName))
                                }}>
                            <PlaylistInput/>

                        </Formik>
                        <Icons icon={CgClose} iconSize={28} iconProps={{color: 'red'}}
                               wrapper={{
                                   className: style.icon,
                                   onClick: ElementEvents.other.changeBooleanState(changeOpenForm)
                               }}/>
                    </div>
            }
        </>
    );
};