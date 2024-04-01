import {AuthRouter} from "../../Router/AuthRouter";
import style from './AuthComponent.module.scss'
import React, {FC} from "react";
import {HeaderAuthLink} from "../Link/HeaderAuthLink/HeaderAuthLink";
import {IFCPropsDispatch} from "../../../ITypes";

export const AuthFailed:FC<IFCPropsDispatch> = ({dispatch} ) => {
    return (<>
            <HeaderAuthLink/>
            <article className={style.auth}>
                <AuthRouter dispatch={dispatch}/>
            </article>
        </>
    )
}