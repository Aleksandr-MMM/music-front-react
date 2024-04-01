import React from "react";
import style from './HeaderAuthLink.module.scss';
import {BaseLink} from "../BaseLink";
export const HeaderAuthLink = () => {
    return (<div className={style.wrapper}>
            <BaseLink path={'/login'} navLinkName={'Войти по email'}/>
            <BaseLink path={'/registration'} navLinkName={'Зарегестрироваться'}/>
        </div>
    )
}