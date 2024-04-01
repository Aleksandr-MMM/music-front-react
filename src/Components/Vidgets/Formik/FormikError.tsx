import React, {CSSProperties, FC} from "react";


export const FormikError: FC<{ errorMess: string | null, style?: CSSProperties | undefined }> = (props) => {
    const {errorMess, style} = props
    return (errorMess ? <p children={errorMess} style={style ? style : {fontWeight: 'bold', color: 'red'}}></p> : null);
};