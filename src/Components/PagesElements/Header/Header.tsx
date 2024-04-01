import React, {FC} from "react";
import {Logo} from "../../Component/Logo/Logo";
import useHeaderContainer from "../../../Hooks/ContainerHooks/useHeaderContainer";
import {Logout} from "../../Component/Logout/Logout";
import style from './Header.module.scss'
import {IFCPropsDispatch} from "../../../ITypes";

export const Header: FC<IFCPropsDispatch> = (props) => {
    const {dispatch} = props
    const {myEmail} = useHeaderContainer()
    return (<header className={style.header}>
        <Logo element={{style: {width: '100px'}}}/>
        <h1 className={style.fancy}>
            MUSIC WAVE
        </h1>
        <div>
            <p>
                {myEmail}
            </p>
            <Logout dispatch={dispatch}/>
        </div>
    </header>)
}