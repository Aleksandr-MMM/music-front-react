import {IDispatchInProps} from "../../ITypes/BaseHtmlTypes";
import {asyncThunk} from "../../ITypes/IReduxTypes";
import useUserTextAreaContainer from "../../Hooks/ContainerHooks/useUserTextAreaContainer";
import React from "react";
import style from "../Vidgets/User/UserProperties/UserParagraph.module.scss";

interface userPropertiesProps extends IDispatchInProps {
    textareaProps:React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
    onChangeSubmit: asyncThunk,
    useUserUserProperties: () => ReturnType<ReturnType<typeof useUserTextAreaContainer>>
}

type UserPropertiesType = React.ReactElement<userPropertiesProps>
export const UserTextArea = (props: userPropertiesProps): UserPropertiesType => {
    const {textareaProps, dispatch, useUserUserProperties, onChangeSubmit} = props
    const [textAreaValue, textAreaOnBlur, textAreaStyle,changeNewValue,value] = useUserUserProperties()
    const [textAreaRowsCount,maxWidth]=textAreaStyle
    return (<>
            <textarea id={textareaProps.id} className={style.description} rows={textAreaRowsCount} value={textAreaValue}
                      style={{width:`${maxWidth}px`}}
                      {...textareaProps}
                      onKeyUp={(event) => {
                          if (event.code === 'Enter') {
                              (event.target as HTMLTextAreaElement).blur()
                          }
                      }}
                      onBlur={(event) => textAreaOnBlur(event, dispatch, onChangeSubmit,changeNewValue,value)}/>
    </>

    );
};