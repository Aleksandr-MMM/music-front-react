import {NavLink} from "react-router-dom";
import React, {FC} from "react";
import {BaseLinkPropsType} from "../../../../ITypes";
import {LinkClassnameDefault} from "../../../../helpers/LinkClassnameDefault";

export const BaseLink: FC<BaseLinkPropsType> = (props) => {
    const {navLinkName, path, styleNavLink} = props

    return (<NavLink to={path} children={navLinkName} style={styleNavLink?.style ? styleNavLink.style : {}}
                    className={styleNavLink?.className ? styleNavLink.className : LinkClassnameDefault}/>)
};