import React, {FC} from "react";
import style from './NavBar.module.scss'
import {Burger} from "../../Vidgets/Burger/Burger";
import {IFCPropsDispatch} from "../../../ITypes";
import {BaseLink} from "../../Vidgets/Link/BaseLink";
import {UrlConstant} from "../../../Constants";
import useNavbarContainer from "../../../Hooks/ContainerHooks/useNavbarContainer";
import {ElementEvents} from "../../../events/ElementEvents";
import {createPortal} from "react-dom";

export const Navbar: FC<IFCPropsDispatch> = (props) => {
    const {dispatch} = props
    const {isNavbar, openNavbar, myAccId, location} = useNavbarContainer()
    return ( createPortal(
            <div className={style.navWrapper}>
                <Burger isNavbar={isNavbar} openNavbar={openNavbar}/>
                <nav className={style.nav} style={{left: isNavbar ? '-160px' : 0}}>
                    <BaseLink path={`${UrlConstant.profile}/${myAccId}`} navLinkName={'Мой профиль'}
                              styleNavLink={{
                                  style: {
                                      display: 'block',
                                      pointerEvents: location.slice(UrlConstant.profile.length + 1) !== myAccId ? "visible" : 'none'
                                  }
                              }}
                              onClick={ElementEvents.NavLink.toProfile(dispatch,
                                  location.slice(UrlConstant.profile.length + 1) === myAccId)}/>
                    <BaseLink navLinkName={'Поиск'} path={`${UrlConstant.find}${UrlConstant.users}`}
                              styleNavLink={{style: {display: 'block'}}}/>
                </nav>
            </div>
            , document.body)
    )
}