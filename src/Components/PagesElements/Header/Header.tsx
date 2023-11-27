import React from "react";
import {Logo} from "../../Component/Logo/Logo";
import useHeaderContainer from "../../../Hooks/ContainerHooks/useHeaderContainer";
import {Logout} from "../../Component/Logout/Logout";
import {IDispatchInProps} from "../../../ITypes/BaseHtmlTypes";
import style from './Header.module.scss'
export const Header: React.ElementType<IDispatchInProps> = (props: IDispatchInProps) => {
    const {dispatch}=props
    const {myEmail,userId} = useHeaderContainer()
    return (<header className={style.header}>

        <Logo/>
        <p>
            {myEmail}
        </p>
        <Logout dispatch={dispatch}/>
    </header>)
}