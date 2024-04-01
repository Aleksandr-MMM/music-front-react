import {asyncThunk, IFCPropsDispatch} from "../../ITypes";
import useUserTextAreaContainer from "../../Hooks/ContainerHooks/useUserTextAreaContainer";
import React, {FC} from "react";
import style from "../Vidgets/Profile/ProfileProperties/UserParagraph.module.scss";
import {ElementEvents} from "../../events/ElementEvents";

interface userPropertiesProps extends IFCPropsDispatch {
    textareaProps: (React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>),
    onChangeSubmit: asyncThunk,
    isMyTextArea: boolean,

    useUserUserProperties: () => ReturnType<ReturnType<typeof useUserTextAreaContainer>>,
}

export const UserTextArea: FC<userPropertiesProps> = (props) => {
    const {textareaProps, dispatch, useUserUserProperties, onChangeSubmit,isMyTextArea} = props;
    const [textAreaValue, textAreaOnBlur, textAreaStyle, changeNewValue, value] = useUserUserProperties();
    const [textAreaRowsCount, maxWidth] = textAreaStyle;
    return (<>
            <textarea id={textareaProps.id}
                      className={`${style.description} ${isMyTextArea ?style.myDescription:''}`}
                      value={textAreaValue === null ? '' : textAreaValue}
                      style={{width: `${maxWidth}px`}}
                      {...textareaProps} rows={textAreaRowsCount}
                      onKeyUp={ElementEvents.textArea.onKeyUp()}
                      placeholder={'Изменить значение'}
                      onBlur={textAreaOnBlur(dispatch, onChangeSubmit,value, changeNewValue )}/>
        </>
    );
};