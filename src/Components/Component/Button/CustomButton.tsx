import style from './CustomButton.module.scss'
import React, {FC} from "react";

export const CustomButton: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const {...elementAttributes} = props
    return (<button className={`${style.buttonDefaultStyle} ${elementAttributes?.className ? elementAttributes.className : ''}`}
                    {...elementAttributes}/>)
}