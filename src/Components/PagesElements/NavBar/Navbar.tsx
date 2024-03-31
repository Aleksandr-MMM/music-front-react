import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import style from './NavBar.module.scss'
import linkStyle from '../../../style/Link/LinkLightTheme.module.scss'

const CreateNavLink: React.ElementType=(path: string,linkName:string)=>{
    return(
        <NavLink to={path} style={{display: "block"}}
                 className={(navData) => (navData.isActive ? linkStyle.linkActive : linkStyle.link)}>
            {linkName}
        </NavLink>
    )
}
export const Navbar: React.ElementType = () => {
    const [isNavbar, openNavbar] = useState(false)
    return (<nav className={style.nav} style={{left: isNavbar ? -117 : 0}}>
        <CreateNavLink path={'/profile'} linkName={'Мой профиль'}/>
        <NavLink to={'/profile'} style={{display: "block"}}
                 className={(navData) => (navData.isActive ? linkStyle.linkActive : linkStyle.link)}>
            Мой профиль
        </NavLink>
        <NavLink to={'/friends'} style={{display: "block"}}
                 className={(navData) => (navData.isActive ? linkStyle.linkActive : linkStyle.link)}>
            Друзья
        </NavLink>
        <button className={style.hideButton} onClick={() => openNavbar(!isNavbar)}>
            кнопка
        </button>

    </nav>)
}