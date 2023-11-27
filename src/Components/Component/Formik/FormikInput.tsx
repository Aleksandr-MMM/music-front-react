import React from "react";
import {ILabelAttributes, IPropsId, IWrapperClassname} from "../../../ITypes/BaseHtmlTypes";
import FormikTemplate from "./FormikTemplate";

export const FormikInput =(props: React.InputHTMLAttributes<HTMLInputElement> &
    IWrapperClassname & ILabelAttributes & IPropsId)=>{

    return(<FormikTemplate elementType={'input'} {...props}/>)
}