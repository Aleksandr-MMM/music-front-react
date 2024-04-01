import {Header} from "../../PagesElements/Header/Header";
import {Navbar} from "../../PagesElements/NavBar/Navbar";
import {Article} from "../../PagesElements/Article/Article";
import {Footer} from "../../PagesElements/Footer/Footer";
import React, {FC} from "react";
import {IFCPropsDispatch} from "../../../ITypes";

export const AuthSuccess: FC<IFCPropsDispatch> = (props) => {
    const {dispatch} = props
    return (
        <>
            <Header dispatch={dispatch}/>
            <Navbar dispatch={dispatch}/>
            <Article dispatch={dispatch}/>
            <Footer/>
        </>
    )
}