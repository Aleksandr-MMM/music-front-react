import React, {FC, useState} from "react";
import {TextProperty} from "../TextProperty";
import {copyTextInBuffer} from "../../../../events/copyTextInBuffer";
import style from './CopyTextProperty.module.scss'

type textPropertyType = {
    propertyStyle?: {
        style?: React.CSSProperties | undefined,
        className?: {
            copy?: string | undefined,
            writeCopy?: string | undefined
        }
    },
    text: string | null
}
export const CopyTextProperty:FC<textPropertyType> = (props) => {
    const {propertyStyle, text} = props
    const [isCopy, changeCopy] = useState(true)
    return (
        <TextProperty text={text}
                      propertyStyle={{
                          style: propertyStyle?.style,
                          className: `${style.copyProperty} ${isCopy ? propertyStyle?.className?.copy : propertyStyle?.className?.writeCopy}`
                      }}
                      onClick={(event) => {
                          copyTextInBuffer(event, changeCopy)
                          setTimeout(()=>{
                              changeCopy(()=>true)
                          },2500)
                      }}/>
    );
};