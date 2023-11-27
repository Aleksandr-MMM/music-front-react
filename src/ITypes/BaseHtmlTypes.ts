import React from "react";
import {AppDispatch} from "./IReduxTypes";

export interface IChildrenNodeProperty {
    children?:React.ReactNode;
}
export interface IChildrenFCProperty {
    children?: React.ReactElement;
}
export interface IButtonAttributes {
    buttonAttributes?:React.ButtonHTMLAttributes<HTMLButtonElement>;
}
export interface IParagraphAttributes {
    pAttributes?:React.HTMLAttributes<HTMLParagraphElement>;
}

export interface ILabelAttributes extends IChildrenNodeProperty{
    labelAttributes?:React.LabelHTMLAttributes<HTMLLabelElement>
}
export interface IWrapperClassname{
    wrapperClassname?:string
}
export interface IWrapperStyle{
    wrapperStyle?: React.CSSProperties
}
export interface IDispatchInProps {
    dispatch:AppDispatch
}
export interface IPropsId{
    id:string|null
}