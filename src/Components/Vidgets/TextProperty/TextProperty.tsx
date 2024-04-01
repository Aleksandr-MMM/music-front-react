import React, {FC} from "react";
import defaultStyle from './TextProperty.module.scss'

type textPropertyType = {
    propertyStyle?: {
        style?: React.CSSProperties | undefined,
        className?: string | undefined
    },
    text: string | null,
    onClick?: React.MouseEventHandler<HTMLParagraphElement> | undefined
}

export const TextProperty:FC<textPropertyType> = (props) => {
    const {propertyStyle, text,onClick} = props
    return (
            <p className={`${propertyStyle?.className ? propertyStyle.className : ''} ${defaultStyle.propertyStyle}`}
               style={propertyStyle?.style} onClick={onClick}>
                {text}
            </p>

    );
};