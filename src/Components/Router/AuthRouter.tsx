import {Navigate, useRoutes} from "react-router-dom";
import {LoginForm} from "../Vidgets/Formik/CreatedForm/LoginForm";
import React from "react";
import {RegistrationForm} from "../Vidgets/Formik/CreatedForm/RegistrationForm";
import type {IFCPropsDispatch} from "../../ITypes";

export const AuthRouter = ({dispatch}: IFCPropsDispatch) => {

    const router = useRoutes([
        {
            path: '/login',
            element: <LoginForm dispatch={dispatch}/>
        },
        {
            path: '/registration',
            element: <RegistrationForm dispatch={dispatch}/>
        },
        {
            path: '*',
            element: <Navigate to='/login' replace/>
        },
    ])
    return (
        router
    )
}