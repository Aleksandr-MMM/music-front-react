import {NavLinkProps} from "react-router-dom";
import React from "react";

export type BaseLinkPropsType = {
    navLinkName: string,
    path: string,
    styleNavLink?: {
        className?: NavLinkProps["className"],
        style?: NavLinkProps["style"]
    },
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined
};