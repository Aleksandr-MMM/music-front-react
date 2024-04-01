import React, {FC} from "react";
import {Form, Formik} from "formik";
import {FormikValidation} from "../../../../helpers/FormikValidation";
import {FormikInput} from "../../../Component/Formik/FormikInput";
import {CustomButton} from "../../../Component/Button/CustomButton";
import {FormikEmailComponent} from "../FormikEmailComponent";
import {FormikPasswordComponent} from "../FormikPasswordComponent";
import useRegistrationFormContainer from "../../../../Hooks/ContainerHooks/useRegistrationFormContainer";
import style from './RegistrationForm.module.scss'
import {JumpingWords} from "../../../Component/Animation/JumpingWords/JumpingWords";
import {IFCPropsDispatch} from "../../../../ITypes";
import {FormikConstants} from "../../../../Constants";
import {ElementEvents} from "../../../../events/ElementEvents";
import {FormikError} from "../FormikError";

export const RegistrationForm: FC<IFCPropsDispatch> = (props): React.ReactElement => {
    const {dispatch} = props
    const {regErrorMess, isDisableButton} = useRegistrationFormContainer()
    return (<>
            <Formik initialValues={{...FormikConstants['auth'], confirmPassword: '',}}
                    validationSchema={FormikValidation.schema.registration}
                    onSubmit={ElementEvents.Formik.onSubmit.registration(dispatch)}>
                <Form className={style.formWrapper}>
                    <h2>
                        Страница регистрации пользователя
                    </h2>
                    <div className={style.inputWrapper}>
                        <FormikEmailComponent/>
                        <FormikPasswordComponent/>
                        <FormikInput labelProps={{children: 'Подтвердите свой новый пароль'}}
                                     elementProps={{id: "confirmPassword", type: 'password'}}/>
                    </div>
                    <CustomButton children={'Зарегестироваться'} type={'submit'} disabled={isDisableButton}/>
                    {isDisableButton ?
                        <JumpingWords words={'Loading...'} fontSize={20} wrapper={{
                            style: {
                                display: 'inline-block',
                                paddingLeft: '15px', color: "green"
                            }
                        }}/>
                        : undefined}
                    {/*Отображение сообщений об ошибке от сервера*/}
                    {regErrorMess ?
                        <p children={regErrorMess} style={{fontWeight: 'bold', color: 'red'}}></p> : undefined}
                    <FormikError errorMess={regErrorMess}/>
                </Form>
            </Formik>
        </>
    )
}