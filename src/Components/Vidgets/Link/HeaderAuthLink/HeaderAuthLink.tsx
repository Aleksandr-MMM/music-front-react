import {NavLink} from "react-router-dom";
import React from "react";
import style from '../../../../style/Link/LinkLightTheme.module.scss'
import style1 from './HeaderAuthLink.module.scss'
export const HeaderAuthLink = () => {
    return (<div className={style1.wrapper}>
            <NavLink to={'/login'} style={{marginRight: '10px'}} className={(navData) =>
                (navData.isActive ? style.linkActive : style.link)}>
                Войти по email
            </NavLink>
            <NavLink to={'/registration'} className={(navData) =>
                (navData.isActive ? style.linkActive : style.link)}>
                Зарегестрироваться
            </NavLink>
        </div>
    )
}