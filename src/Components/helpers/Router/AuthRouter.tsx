import {Navigate, useRoutes} from "react-router-dom";
import {IDispatchInProps} from "../../../ITypes/BaseHtmlTypes";
import {LoginForm} from "../../Vidgets/Formik/CreatedForm/LoginForm";
import React from "react";
import {RegistrationForm} from "../../Vidgets/Formik/CreatedForm/RegistrationForm";

export const AuthRouter = ({dispatch}: IDispatchInProps) => {

    const router = useRoutes([
        {
            path: '/login',
            element: <LoginForm dispatch={dispatch}/>
        },
        {
            path: '/registration',
            element: <RegistrationForm dispatch={dispatch}/>
        },
        // {
        //     path: '/message/:id',
        //     element: <ProtectedRoute isLoggedIn={isLogin}>
        //         <MassagePageContainer/>
        //     </ProtectedRoute>
        // },
        // {
        //     path: '/dialogs',
        //     element: <ProtectedRoute isLoggedIn={isLogin}>
        //         <DialogsPageContainer/>
        //     </ProtectedRoute>
        // },
        // {
        //     path: '/login',
        //     element: <RedirectToRoute isLoggedIn={isLogin} path={path}>
        //         <RegistrationPageContainer dispatch={dispatch}/>
        //     </RedirectToRoute>
        //
        // },
        // {
        //     path: '/users',
        //     element: <ProtectedRoute isLoggedIn={isLogin}>
        //         <UsersPageContainer dispatch={dispatch}/>
        //     </ProtectedRoute>
        //
        // },
        // {
        //     path: '/settings',
        //     element: <ProtectedRoute isLoggedIn={isLogin}>
        //         <SettingPageContainer/>
        //     </ProtectedRoute>
        // },
        {
            path: '*',
            element: <Navigate to='/login' replace/>
        },
    ])
    return (
        router
    )
}