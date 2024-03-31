import {Form, Formik} from "formik";
import {FormikValidation} from "../../../helpers/FormikValidation/FormikValidation";
import {FormikCheckbox} from "../../../Component/Formik/FormikCheckbox";
import {CustomButton} from "../../../Component/Button/CustomButton";
import {IDispatchInProps} from "../../../../ITypes/BaseHtmlTypes";
import {getToken} from "../../../../store/reducers/authSlice";
import {FormikEmailComponent} from "../FormikEmailComponent";
import {FormikPasswordComponent} from "../FormikPasswordComponent";
import style from './LoginForm.module.scss'
import useLoginFormContainer from "../../../../Hooks/ContainerHooks/useLoginFormContainer";
import {CustomParagraphComponent} from "../../../Component/CustomParagraphComponent";
import React from "react";
import {JumpingWords} from "../../../Component/Animation/JumpingWords/JumpingWords";

export const LoginForm = ({dispatch}: IDispatchInProps) => {
    const {authMe, isDisableButton} = useLoginFormContainer()
    return (<>

            <Formik initialValues={{
                email: '',
                password: '',
                rememberMe: true,
            }}
                    validationSchema={FormikValidation.schema.login}
                    onSubmit={async (values) => {
                        dispatch(getToken({
                            email: values.email,
                            password: values.password,
                            rememberMe: values.rememberMe
                        }))
                    }}>

                <Form className={style.FormikFormWrapper}>
                    <h2>
                        Войти по адресу электронной почты
                    </h2>
                    <div className={style.FormikInputWrapper}>
                        <FormikEmailComponent/>
                        <FormikPasswordComponent/>
                    </div>
                    <FormikCheckbox name="rememberMe" wrapperStyle={{
                        marginTop: '10px', marginBottom: '10px',
                    }} id='rememberMe'
                    >
                        Запомнить меня
                    </FormikCheckbox>
                    <div style={{display: 'flex'}}>
                        <CustomButton children={'Войти'} type={'submit'} disabled={isDisableButton}/>
                        {isDisableButton ?
                            <JumpingWords words={'Loading...'} fontSize={20} style={{
                                display: 'inline-block',
                                paddingLeft: '15px', color: "green"
                            }}/> : undefined}
                    </div>
                    {authMe ? <CustomParagraphComponent children={authMe}
                                                        style={{fontWeight: 'bold', color: 'red'}}/>
                        : undefined}

                </Form>
            </Formik>
        </>

    )
}