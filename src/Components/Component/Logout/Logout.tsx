import React from "react";
import {CustomButton} from "../Button/CustomButton";
import {IDispatchInProps} from "../../../ITypes/BaseHtmlTypes";
import {logout} from "../../../store/reducers/authSlice";

export const Logout = (props: IDispatchInProps) => {
    const {dispatch}=props
    return (<CustomButton onClick={()=>dispatch(logout())}>
            Выйти из аккаунта
        </CustomButton>
    )
}