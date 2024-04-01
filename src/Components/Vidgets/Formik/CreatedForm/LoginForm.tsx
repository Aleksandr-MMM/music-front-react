import React, {FC} from "react";
import {Form, Formik} from "formik";
import {FormikValidation} from "../../../../helpers/FormikValidation";
import {FormikCheckbox} from "../../../Component/Formik/FormikCheckbox";
import {CustomButton} from "../../../Component/Button/CustomButton";
import {FormikEmailComponent} from "../FormikEmailComponent";
import {FormikPasswordComponent} from "../FormikPasswordComponent";
import useLoginFormContainer from "../../../../Hooks/ContainerHooks/useLoginFormContainer";
import {JumpingWords} from "../../../Component/Animation/JumpingWords/JumpingWords";
import {IFCPropsDispatch} from "../../../../ITypes";
import {FormikConstants} from "../../../../Constants";
import {ElementEvents} from "../../../../events/ElementEvents";
import {FormikError} from "../FormikError";
import style from './LoginForm.module.scss'

export const LoginForm:FC<IFCPropsDispatch> = (props) => {
    const {dispatch}=props
    const {authMe, isDisableButton} = useLoginFormContainer()
    return (<Formik initialValues={{...FormikConstants['auth'], rememberMe: true,}}
                    validationSchema={FormikValidation.schema.login}
                    onSubmit={ElementEvents.Formik.onSubmit.login(dispatch)}>
                <Form className={style.formWrapper}>
                    <h2 children={'Войти по адресу электронной почты'}/>
                    <div className={style.inputWrapper}>
                        <FormikEmailComponent/>
                        <FormikPasswordComponent/>
                    </div>
                    <FormikCheckbox name="rememberMe" style={{marginTop: '10px', marginBottom: '10px',}}
                                    id='rememberMe' children={'Запомнить меня'}/>
                    <div style={{display: 'flex'}}>
                        <CustomButton children={'Войти'} type={'submit'} disabled={isDisableButton}/>
                        {isDisableButton ?
                            <JumpingWords words={'Loading...'} fontSize={20} wrapper={{style:
                                    {display: 'inline-block', paddingLeft: '15px', color: "green"}}}/>
                            : undefined}
                    </div>
                    {/*Отображение сообщений об ошибке от сервера*/}
                    <FormikError errorMess={authMe}/>
                </Form>
            </Formik>
    )
}