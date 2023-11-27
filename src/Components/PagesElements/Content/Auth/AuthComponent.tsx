import {AuthRouter} from "../../../helpers/Router/AuthRouter";
import {IDispatchInProps} from "../../../../ITypes/BaseHtmlTypes";
import style from './AuthComponent.module.scss'
import React from "react";
import {HeaderAuthLink} from "../../../Vidgets/Link/HeaderAuthLink/HeaderAuthLink";

export const AuthComponent = ({dispatch}: IDispatchInProps): React.ReactElement => {
    return (<>
            <HeaderAuthLink/>
            <article className={style.auth}>
                <AuthRouter dispatch={dispatch}/>
            </article>
        </>
    )
}