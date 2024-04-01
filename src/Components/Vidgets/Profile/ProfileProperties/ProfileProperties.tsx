import React, {FC} from "react";
import style from './UserParagraph.module.scss'
import {UserTextArea} from "../../../Component/UserTextArea";
import {FCArguments} from "../../../../ITypes";

type userPropertiesProps= FCArguments<typeof UserTextArea>
export const ProfileProperties:FC<userPropertiesProps> = (props) => {
    const {textareaProps, dispatch,useUserUserProperties, onChangeSubmit,isMyTextArea} = props
    return (
        <div className={style.wrapper}>
            <div style={{width:'250px'}}>
                <label
                    // className={isMyTextArea? style.title:`${style.myTitle} ${style.title}`}
                    className={`${style.title} ${isMyTextArea?style.myTitle:''}`}
                       htmlFor={textareaProps.id} children={textareaProps.id}/>
            </div>
            <UserTextArea  {...{dispatch,textareaProps,useUserUserProperties,onChangeSubmit,isMyTextArea}}/>
        </div>
    )
};