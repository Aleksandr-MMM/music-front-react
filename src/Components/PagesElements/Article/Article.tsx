import React from "react";
import {AppRouter} from "../../helpers/Router/AppRouter";
import {IisAuth} from "../../../ITypes/IContainerPropsTypes";
import {IDispatchInProps} from "../../../ITypes/BaseHtmlTypes";

export const Article = ({dispatch,isAuth}: IisAuth & IDispatchInProps):React.ReactElement<IisAuth & IDispatchInProps> => {
    return (<article>
        <AppRouter dispatch={dispatch} isAuth={isAuth}/>
    </article>)
}