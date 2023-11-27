import React from "react";
import {IDispatchInProps} from "../../../../ITypes/BaseHtmlTypes";
import {Form, Formik} from "formik";
import {FormikValidation} from "../../../helpers/FormikValidation/FormikValidation";
import {FormikInput} from "../../../Component/Formik/FormikInput";
import {CustomButton} from "../../../Component/Button/CustomButton";
import {registrationMe} from "../../../../store/reducers/authSlice";
import {FormikEmailComponent} from "../FormikEmailComponent";
import {FormikPasswordComponent} from "../FormikPasswordComponent";
import {CustomParagraphComponent} from "../../../Component/CustomParagraphComponent";
import useRegistrationFormContainer from "../../../../Hooks/ContainerHooks/useRegistrationFormContainer";
import style from './RegistrationForm.module.scss'
import {JumpingWords} from "../../../Component/Animation/JumpingWords/JumpingWords";
export const RegistrationForm = ({dispatch}: IDispatchInProps): React.ReactElement => {
    const {regErrorMess,isDisableButton} = useRegistrationFormContainer()
    return (<>
            <Formik initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
            }}
                    validationSchema={FormikValidation.schema.registration}
                    onSubmit={async (values) => {
                        dispatch(registrationMe({email: values.email, password: values.password}))
                    }}>
                <Form className={style.FormikFormWrapper}>
                    <h2>
                        Страница регистрации пользователя
                    </h2>
                    <div className={style.FormikInputWrapper}>
                        <FormikEmailComponent/>
                        <FormikPasswordComponent/>
                        <FormikInput name="confirmPassword"
                                     id="confirmPassword"
                                     type="password">
                            Confirm your password
                        </FormikInput>
                    </div>
                        <CustomButton children={'Зарегестироваться'} type={'submit'} disabled={isDisableButton}/>
                        {isDisableButton ?
                            <JumpingWords words={'Loading...'} fontSize={20} style={{
                                display: 'inline-block',
                                paddingLeft: '15px', color: "green"
                            }}/> : undefined}
                    {regErrorMess ? <CustomParagraphComponent children={regErrorMess}
                                                              style={{fontWeight: 'bold', color: 'red'}}/>
                        : undefined}
                </Form>
            </Formik>
        </>
    )
}