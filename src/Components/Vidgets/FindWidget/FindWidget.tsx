import React, {FC} from "react";
import { Outlet } from "react-router-dom";
import {BaseLink} from "../Link/BaseLink";
import style from './FindWidget.module.scss'

export const FindWidget: FC<{baseUrl:string}> = (props) => {
    const {baseUrl} = props
    return (<>
            <div className={style.wrapper} >
                <BaseLink path={`${baseUrl}/users`} navLinkName={'Пользователи'}/>
                <BaseLink path={`${baseUrl}/track`} navLinkName={'Треки'} />
            </div>
            <Outlet/>
        </>
    );
};