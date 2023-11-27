import {FieldHookConfig, useField} from "formik";
import style from './Formik.module.scss'
import React from "react";
import type {IChildrenNodeProperty, IWrapperStyle} from "../../../ITypes/BaseHtmlTypes";
import {IPropsId} from "../../../ITypes/BaseHtmlTypes";

export const FormikCheckbox = ({children, wrapperStyle, ...props}: Required<IChildrenNodeProperty> & IWrapperStyle &
    React.InputHTMLAttributes<HTMLInputElement> & IPropsId) => {
    const [field, meta] = useField({...props, type: 'checkbox'} as
        (FieldHookConfig<string> & React.InputHTMLAttributes<HTMLInputElement>));
    return (
        <div style={wrapperStyle}>

            <input type="checkbox" {...field} {...props} style={{width: '15px', height: '15px'}}/>
            <label style={{display: 'inline-flex', alignItems: 'center',fontWeight:'bold',marginLeft: '8px'}}
                   htmlFor={props.id}>
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className={style.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};