import {Navigate, useRoutes} from "react-router-dom";
import {ProfilePage} from "../PagesElements/Content/ProfilePage/ProfilePage";
import React from "react";
import {useRouterContainer} from "../../Hooks/ContainerHooks/useRouterContainer";
import {UsersPage} from "../PagesElements/Content/UsersPage/UsersPage";
import {FindWidget} from "../Vidgets/FindWidget/FindWidget";
import {RouteObject} from "react-router/dist/lib/context";
import {IFCPropsDispatch} from "../../ITypes";
import {UrlConstant} from "../../Constants";
import {TrackPage} from "../PagesElements/Content/TrackPage/TrackPage";
import {AlbumPage} from "../PagesElements/Content/AlbumPage/AlbumPage";
import useTrackPageContainer from "../../Hooks/ContainerHooks/trackHooks/useTrackPageContainer";

export const AppRouter = ({dispatch}: IFCPropsDispatch) => {
    const {myAccId} = useRouterContainer()
    const routers: RouteObject[] = [
        {
            path: `${UrlConstant.profile}/:id`,
            element: <ProfilePage {...{dispatch, myId: myAccId}}/>,
        },
        {
            path: UrlConstant.find,
            element: <FindWidget baseUrl={UrlConstant.find}/>,
            children: [
                {
                    path: UrlConstant.track.slice(1),
                    element: <TrackPage {...{dispatch, useTrackPageContainer}}/>,
                },
                {
                    path: UrlConstant.users.slice(1),
                    element: <UsersPage {...{dispatch}}/>
                },
            ]
        },
        {
            path: '/album/:id',
            element: <AlbumPage {...{dispatch}}/>,
        },
        {
            path: '*',
            element: <Navigate to={`${UrlConstant.profile}/${myAccId}`} replace/>
        },
    ]
    return (useRoutes(routers))
}