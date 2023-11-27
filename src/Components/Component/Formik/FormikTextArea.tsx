import FormikTemplate from "./FormikTemplate";
import React from "react";
import {ILabelAttributes, IPropsId, IWrapperClassname} from "../../../ITypes/BaseHtmlTypes";

export const FormikTextarea =(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    IWrapperClassname & ILabelAttributes & IPropsId)=>{

    return(<FormikTemplate elementType={'textarea'} {...props}/>)
}