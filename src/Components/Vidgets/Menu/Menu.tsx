import React, {ReactNode} from "react";
import {AppDispatch, IFCPropsDispatch} from "../../../ITypes";
import style from './Menu.module.scss'

type containerReturnType = readonly { id: string | null }[];
type useContainerProps<T extends containerReturnType> = { useContainer: (dispatch: AppDispatch) => T };
type menuTestProps<T extends containerReturnType> = useContainerProps<T> & IFCPropsDispatch & { FCCloseIcon: ReactNode }
    & { header?: { name?: string, style?: React.CSSProperties } } & { liElement: (args: T[number]) => ReactNode };

function Menu<T extends containerReturnType>(props: menuTestProps<T>) {
    const {dispatch, FCCloseIcon, liElement, useContainer, header} = props
    const menuLists = useContainer(dispatch);
    return (menuLists.length !== 0 ?
            <menu className={style.menuDefault}>
                {FCCloseIcon}
                <h3 style={{display: 'flex', justifyContent: "center", fontWeight: 'bold', ...{...header?.style}}}>
                    {header?.name ? header.name : 'Меню список'}
                </h3>
                {menuLists.map(list => <li key={list.id} style={{display: 'flex'}}>
                    {liElement(list)}
                </li>)}
            </menu> : null
    )
}

export default Menu;