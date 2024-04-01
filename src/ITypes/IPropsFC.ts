import {AppDispatch} from "./reduxTypes";
import React from "react";
import {objectByKey} from "./otherTypes";

export interface IFCPropsElementClassname {
    className?: string | undefined
}

export interface IFCPropsElementStyle {
    style?: React.CSSProperties | undefined
}

export interface IFCPropsWrapper<wrapper> {
    wrapper?: wrapper
}

export interface IFCPropsElement<T> {
    element?: T
}

export interface IFCStyledProps<wrapper, element = wrapper> extends IFCPropsElement<wrapper>, IFCPropsWrapper<element> {
}

export interface IFCPropsIsAuth {
    isAuth: boolean
}

export interface IFCPropsId {
    id: string | null
}

export interface IFCPropsMyId {
    myId: string | null
}

export interface IFCPropsDispatch {
    dispatch: AppDispatch
}

export interface IFCPropsChildrenFC {
    children?: React.ReactElement;
}

export interface IFCPropsChildrenNode {
    children?: React.ReactNode;
}

export interface IFCPropsLabelAttributes {
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
}

export type changePropsOnReq<ElPropsType, ElKey extends keyof ElPropsType> =
    Required<objectByKey<ElPropsType, ElKey>>
    & Omit<ElPropsType, ElKey>;