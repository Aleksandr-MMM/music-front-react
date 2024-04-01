import React, {FC} from "react";
import {AppRouter} from "../../Router/AppRouter";
import {IFCPropsDispatch} from "../../../ITypes";
import style from './Article.module.scss'

export const Article: FC<IFCPropsDispatch> = ({dispatch}) => {
    return (<article className={style.article}>
        <AppRouter dispatch={dispatch}/>
    </article>)
}