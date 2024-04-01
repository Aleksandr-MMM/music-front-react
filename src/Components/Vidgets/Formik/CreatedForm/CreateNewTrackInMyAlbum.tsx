import {FormikValidation} from "../../../../helpers/FormikValidation";
import {ElementEvents} from "../../../../events/ElementEvents";
import {Form, Formik} from "formik";
import style from "./LoginForm.module.scss";
import {CustomButton} from "../../../Component/Button/CustomButton";
import React, {FC, useRef} from "react";
import {FormikInput} from "../../../Component/Formik/FormikInput";
import {IFCPropsDispatch} from "../../../../ITypes";
import {FormikConstants} from "../../../../Constants";
import {FormikFile} from "../FormikFile";

export const CreateNewTrackInMyAlbum: FC<IFCPropsDispatch> = (props) => {
    const {dispatch} = props
    const fileRef = useRef<React.LegacyRef<HTMLInputElement>>(null);
    return (
        <Formik initialValues={{...FormikConstants.addTrackInMyAlbum}}
                validationSchema={FormikValidation.schema.addTrackInMyAlbum(fileRef)}
                onSubmit={ElementEvents.Formik.onSubmit.addNewTrackImMyAlbum(dispatch)}>
            <Form className={style.FormikFormWrapper}>
                <h2 children={'Загрузить новый трек в альбом.'}/>
                <div className={style.FormikInputWrapper}>
                    <FormikInput labelProps={{children: "Имя трека "}} elementProps={{type: 'text', id: "trackName"}}/>
                    <FormikInput labelProps={{children: "Исполнитель "}} elementProps={{type: 'text', id: "author"}}/>
                </div>
                <FormikFile labelProps={{children: 'Выберете файл для загрузки'}} fileRef={fileRef}
                            elementProps={{id: "addTrackFile", type: 'file'}}/>
                <div style={{display: 'flex'}}>
                    <CustomButton children={'Отправить'} type={'submit'}/>
                </div>
                {/*Отображение сообщений об ошибке от сервера*/}
                {/*<FormikError errorMess={authMe}/>*/}
            </Form>
        </Formik>
    );
};