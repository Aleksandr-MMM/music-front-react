import React from "react";
import defaultStyle from './TextProperty.module.scss'

type textPropertyType = {
    propertyStyle?: {
        style?: React.CSSProperties | undefined,
        className?: string | undefined
    },
    text: string | null
}
export const TextProperty = (props: textPropertyType) => {
    const {propertyStyle, text} = props
    return (
            <p className={`${propertyStyle?.className ? propertyStyle.className : ''} ${defaultStyle.propertyStyle}`}
               style={propertyStyle?.style}>
                {text}
            </p>

    );
};