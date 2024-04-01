import React, {FC} from "react";
import {CopyTextProperty} from "../CopyTextProperty/CopyTextProperty";
import textStyle from "../TextProperty.module.scss";
import {FCArguments, IFCPropsWrapper} from "../../../../ITypes";
import {TextProperty} from "../TextProperty";

type TextPropertyWithLabelType = { text: string }
type discriminantProperty =
    ({ discriminant: 'textWithCopy' } & FCArguments<typeof CopyTextProperty>)
    | ({ discriminant: 'text' } & FCArguments<typeof TextProperty>);
type labelProps = { labelElement?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> }

type TextPropertyWithLabelProps = TextPropertyWithLabelType & discriminantProperty & labelProps &
    IFCPropsWrapper<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export const TextPropertyWithLabel: FC<TextPropertyWithLabelProps> = (props) => {
    const {text, discriminant, propertyStyle, wrapper, labelElement,} = props

    return (
        <div {...wrapper}>
            <span {...labelElement}/>
            {discriminant === 'textWithCopy' ?
                <CopyTextProperty text={text} propertyStyle={{
                    style: {...propertyStyle?.style},
                    className: {
                        copy: `${textStyle.userAfterPlaceholderCopy} ${propertyStyle?.className?.copy}`,
                        writeCopy: `${textStyle.userAfterPlaceholderWriteCopy} ${propertyStyle?.className?.writeCopy}`
                    }
                }}/>
                : discriminant === 'text' ?
                    <TextProperty text={text}
                                  propertyStyle={{
                                      style: {cursor: 'default', ...propertyStyle?.style},
                                      className: propertyStyle?.className
                                  }}/>
                    : undefined
            }
        </div>
    );
};