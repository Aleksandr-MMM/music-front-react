import { IChildrenNodeProperty} from "../../../ITypes/BaseHtmlTypes";
import style from './CustomButton.module.scss'
import React from "react";



export const CustomButton = ({children, ...elementAttributes}: IChildrenNodeProperty&React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    return (<button className={style.customButtonDefault} {...elementAttributes}>
                {children}
        </button>
    )
}