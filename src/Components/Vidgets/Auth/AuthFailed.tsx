import {AuthRouter} from "../../helpers/Router/AuthRouter";
import style from './AuthComponent.module.scss'
import React from "react";
import {HeaderAuthLink} from "../Link/HeaderAuthLink/HeaderAuthLink";
import {IFCPropsDispatch} from "../../../ITypes";

export const AuthComponent = ({dispatch}: IFCPropsDispatch): React.ReactElement => {
    return (<div>
            <HeaderAuthLink/>
            <article className={style.auth}>
                <AuthRouter dispatch={dispatch}/>
            </article>
        </div>
    )
}