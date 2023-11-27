import React, {FunctionComponent, useState} from "react";
import style from './AuthPage.module.css'
import {RegistrationForm} from "../../../Vidgets/Formik/CreatedForm/RegistrationForm";
import {IDispatchInProps} from "../../../../ITypes/BaseHtmlTypes";
import {LoginForm} from "../../../Vidgets/Formik/CreatedForm/LoginForm";

export const AuthPage: FunctionComponent<IDispatchInProps> = ({dispatch}: IDispatchInProps) => {
    const [enterToMyProfile, isMyProfile] = useState(false)
    return (<div className={style.home}>
        {
            enterToMyProfile ?
                <LoginForm dispatch={dispatch}/> :
                <RegistrationForm dispatch={dispatch}/>
        }
    </div>)
}