import {FieldHookConfig, useField} from "formik";
import style from './Formik.module.scss'
import React, {FC} from "react";
import {IFCPropsChildrenNode, IFCPropsId, IFCPropsElementStyle, IFCPropsWrapper} from "../../../ITypes";

type formikCheckboxPropsType = Required<IFCPropsChildrenNode> &IFCPropsWrapper<IFCPropsElementStyle>  &
    React.InputHTMLAttributes<HTMLInputElement> & IFCPropsId
type useFieldParamType = (FieldHookConfig<string> & React.InputHTMLAttributes<HTMLInputElement>)
export const FormikCheckbox: FC<formikCheckboxPropsType> = (formikProps) => {
    const {children, wrapper, ...props} = formikProps
    const [field, meta] = useField({...props, type: 'checkbox'} as useFieldParamType);
    return (
        <div style={wrapper?.style}>
            <input type="checkbox" {...field} {...props} style={{width: '15px', height: '15px'}}/>
            <label style={{display: 'inline-flex', alignItems: 'center', fontWeight: 'bold', marginLeft: '8px'}}
                   htmlFor={props.id}>
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className={style.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};