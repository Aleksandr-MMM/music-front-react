import {Navigate, useRoutes} from "react-router-dom";
import {ProtectedAuthRouter} from "./ProtectedAuthRouter";
import {ProfilePage} from "../../PagesElements/Content/ProfilePage/ProfilePage";
import {IisAuth} from "../../../ITypes/IContainerPropsTypes";
import {IDispatchInProps} from "../../../ITypes/BaseHtmlTypes";
import React from "react";
import {useRouterContainer} from "../../../Hooks/ContainerHooks/useRouterContainer";

export const AppRouter = ({isAuth, dispatch}: IisAuth & IDispatchInProps) => {
const {myAccId}=useRouterContainer()
    // const path = `/profile/${currentUserId}`

    const router = useRoutes([
            {
                path: '/profile/:id',
                element: <ProtectedAuthRouter isAuth={isAuth} path='/login'>
                    <ProfilePage dispatch={dispatch}/>
                </ProtectedAuthRouter>
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


            {
                path: '*',
                element: <Navigate to={`/profile/${myAccId}`} replace/>
            },

        ]
    )
    return (
        router
    )
}