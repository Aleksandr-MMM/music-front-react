import {Navigate, useRoutes} from "react-router-dom";
import {ProfilePage} from "../../PagesElements/Content/ProfilePage/ProfilePage";
import React from "react";
import {useRouterContainer} from "../../../Hooks/ContainerHooks/useRouterContainer";
import {UsersPage} from "../../PagesElements/Content/UsersPage/UsersPage";
import {FindWidget} from "../../Vidgets/FindWidget/FindWidget";
import {RouteObject} from "react-router/dist/lib/context";
import {IFCPropsDispatch} from "../../../ITypes";

export const AppRouter = ({dispatch}: IFCPropsDispatch) => {
    const {myAccId} = useRouterContainer()
    const FindWidgetBaseUrl = '/find';
    const routers: RouteObject[] = [
        {
            path: `/profile/:id`,
            element: <ProfilePage dispatch={dispatch} myId={myAccId}/>
        },
        {
            path: FindWidgetBaseUrl,
            element: <FindWidget baseUrl={FindWidgetBaseUrl}/>,
            children: [
                {
                    path: "track",
                    element: <div>track</div>,
                },
                {
                    path: 'users',
                    element: <UsersPage dispatch={dispatch}/>
                },
            ]
        },
        {
            path: '*',
            element: <Navigate to={`/profile/${myAccId}`} replace/>
        },
    ]
    return (useRoutes(routers))
}