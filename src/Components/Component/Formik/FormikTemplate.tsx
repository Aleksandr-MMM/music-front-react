import {FieldHookConfig, FieldMetaProps, useField} from "formik";
import style from './Formik.module.scss'
import React, {FC} from "react";
import {
    changePropsOnReq,
    discriminantType,
    IFCPropsLabelAttributes,
    IFCPropsWrapper,
} from "../../../ITypes";
import {elementPropsType} from "../../Vidgets/Formik/IFormikType";

type ShowTextErrorPropsType = Pick<FieldMetaProps<string>, 'touched'> & Pick<FieldMetaProps<string>, 'error'>
const ShowTextError: FC<ShowTextErrorPropsType> = ({error, touched}) => {
    return (touched && error ? <p className={style.error} style={{marginTop: '5px'}} children={error}/>
        : <></>)
}

type inputProps = changePropsOnReq<React.InputHTMLAttributes<HTMLInputElement>, 'id'>
type textAreaProps = changePropsOnReq<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>

type elementProps = (discriminantType<'input'> & elementPropsType<inputProps>) |
    (discriminantType<'textarea'> & elementPropsType<textAreaProps>)

// type chooseElementProps=elementProps&Pick<FieldMetaProps<string>, 'error'>;
// const ChooseElement :FC<chooseElementProps> =(props)=> {
//     const {elementProps,elementType,error,field}=props
//     const JSXElement = {
//         textarea: <textarea {...field} {...elementProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
//                             className={`${style.inputFormik} ${error ? style.inputError
//                                 : elementProps.className}`}/>,
//         input: <input {...field} {...elementProps as React.InputHTMLAttributes<HTMLInputElement>}
//                       className={error ? `${style.inputFormik} ${style.inputError}`
//                           : `${style.inputFormik} ${elementProps.className}`}/>
//     }
//     return(
//         JSXElement[elementType])
//
// }

type propsType = IFCPropsWrapper<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> &
    IFCPropsLabelAttributes & elementProps;


export const FormikTemplate: FC<propsType> = (props) => {

    const {labelProps, elementType, elementProps, wrapper} = props;
    const [field, meta] = useField({...elementProps, name: elementProps.id} as (FieldHookConfig<string> & propsType));

    // meta.error&&meta.touched ? `${style.inputFormik} ${style.inputError} ${elementProps.className}`
    //     : `${style.inputFormik} ${elementProps.className

    const JSXElement = {
        textarea: <textarea {...field} {...elementProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
                            className={`${style.inputFormik} ${elementProps.className} 
                            ${meta.error && meta.touched ? style.inputError : ''}`}/>,
        input: <input {...field} {...elementProps as React.InputHTMLAttributes<HTMLInputElement>}
                      className={`${style.inputFormik} ${elementProps.className} 
                      ${meta.error && meta.touched ? style.inputError : ''}`}/>
    }
    return (
        <div {...wrapper} className={`${style.wrapper} ${wrapper?.className ? wrapper.className : ''}`}>
            <label {...labelProps} style={{marginBottom: '10px', display: 'block',cursor:'pointer'}} htmlFor={elementProps.id}
                   className={`${labelProps?.className ? labelProps.className : ''} ${style.label} `}/>
            {/*отображение одного из элементов*/}
            {JSXElement[elementType]}
            {/*<ChooseElement elementType={elementType} elementProps={elementProps} field={field} error={meta.error?meta.error:''} />*/}
            <ShowTextError touched={meta.touched} error={meta.error ? meta.error : ''}/>
        </div>
    );
}
