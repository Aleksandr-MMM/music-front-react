import {FieldHookConfig, useField} from "formik";
import defaultStyle from './Formik.module.scss'
import React from "react";
import type {ILabelAttributes, IWrapperClassname} from "../../../ITypes/BaseHtmlTypes";
import {IPropsId} from "../../../ITypes/BaseHtmlTypes";

type IFormikDiscriminantInput = { elementType: 'input' }
type IFormikDiscriminantTextarea = { elementType: 'textarea' }

type formikSelectedElement = (IFormikDiscriminantInput & React.InputHTMLAttributes<HTMLInputElement>) |
    (IFormikDiscriminantTextarea & React.TextareaHTMLAttributes<HTMLTextAreaElement>);

type formikTemplateType = ILabelAttributes & IWrapperClassname & IPropsId & formikSelectedElement;

function FormikTemplate({children, labelAttributes, elementType, wrapperClassname, ...props}: formikTemplateType
) {
    const [field, meta] = useField(props as (FieldHookConfig<string> & formikTemplateType));

    const JSXElement = {
        textarea: <textarea {...field} {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
                            className={meta.error ? `${defaultStyle.inputFormik} ${defaultStyle.inputError}`
                                : `${defaultStyle.inputFormik} ${props.className}`}/>,
        input: <input {...field} {...props as React.InputHTMLAttributes<HTMLInputElement>}
                      className={meta.error ? `${defaultStyle.inputFormik} ${defaultStyle.inputError}`
                          : `${defaultStyle.inputFormik} ${props.className}`}/>
    }

    return (
        <div className={`${defaultStyle.wrapper} ${wrapperClassname}`}>
            <label className={defaultStyle.label} style={{marginBottom: '10px', display: 'block'}}
                   htmlFor={props.id} {...labelAttributes}>{children}</label>
            {JSXElement[elementType]}
            {meta.touched && meta.error ? (
                <p className={defaultStyle.error} style={{marginTop:'5px'}}>{meta.error}</p>
            ) : null}
        </div>
    );
}

export default FormikTemplate;