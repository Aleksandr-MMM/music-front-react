import React, {FC} from "react";
import {changePropsOnReq, FCArguments} from "../../../ITypes";
import {FormikTemplate} from "./FormikTemplate";
import {elementPropsType} from "../../Vidgets/Formik/IFormikType";

type formikInputProps=Omit<Omit<FCArguments<typeof FormikTemplate>, 'elementType'>,'elementProps'> &
    elementPropsType<changePropsOnReq<React.InputHTMLAttributes<HTMLInputElement>,'id'>>;

export const FormikInput: FC<formikInputProps> = (props) => {
    return (<FormikTemplate  {...props} elementType={'input'}  />)
}