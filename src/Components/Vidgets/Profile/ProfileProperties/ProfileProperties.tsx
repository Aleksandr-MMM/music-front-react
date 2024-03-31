import React from "react";
import style from './UserParagraph.module.scss'
import {UserTextArea} from "../../../Component/UserTextArea";
import {FCArguments} from "../../../../ITypes/otherTypes";

type userPropertiesProps= FCArguments<typeof UserTextArea>
type UserPropertiesType= React.ReactElement<userPropertiesProps>
export const ProfileProperties = (props: userPropertiesProps):  UserPropertiesType => {
    const {textareaProps, dispatch,useUserUserProperties, onChangeSubmit} = props
    return (
        <div className={style.wrapper}>
            <div style={{width:'250px'}}>
                <label className={style.title} htmlFor={textareaProps.id} children={textareaProps.id}/>
            </div>
            <UserTextArea textareaProps={textareaProps}  dispatch={dispatch}
                          useUserUserProperties={useUserUserProperties} onChangeSubmit={onChangeSubmit}/>
        </div>
    )
};