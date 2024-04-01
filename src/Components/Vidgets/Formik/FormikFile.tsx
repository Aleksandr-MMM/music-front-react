import {FieldHookConfig, FieldMetaProps, useField} from "formik";
import React, {FC} from "react";
import style from "../../Component/Formik/Formik.module.scss";
import {changePropsOnReq, IFCPropsLabelAttributes} from "../../../ITypes";
import {elementPropsType} from "./IFormikType";

type ShowTextErrorPropsType = Pick<FieldMetaProps<string>, 'touched'> & Pick<FieldMetaProps<string>, 'error'>
const ShowTextError: FC<ShowTextErrorPropsType> = ({error, touched}) => {
    return (touched && error ? <p className={style.error} style={{marginTop: '5px'}} children={error}/>
        : <></>)
}
type FormikFileType = {fileRef:React.MutableRefObject<React.LegacyRef<HTMLInputElement>>}
    & IFCPropsLabelAttributes & elementPropsType<changePropsOnReq<React.InputHTMLAttributes<HTMLInputElement>, 'id'>>
export const FormikFile: FC<FormikFileType> = (props) => {
    const {labelProps, elementProps,fileRef} = props
    const [field, meta] = useField({
        ...elementProps,
        name: elementProps.id
    } as (FieldHookConfig<any> & FormikFileType));
    return (
        <div>
            <label {...labelProps} style={{marginBottom: '10px', display: 'block'}} htmlFor={elementProps.id}
                   className={`${labelProps?.className ? labelProps.className : ''} ${style.label} `}/>
            <input type={'file'} {...elementProps} {...field} ref={fileRef as React.LegacyRef<HTMLInputElement>}
                   name={elementProps.id}/>
            <ShowTextError touched={meta.touched} error={meta.error ? meta.error : ''}/>
        </div>
    );
};