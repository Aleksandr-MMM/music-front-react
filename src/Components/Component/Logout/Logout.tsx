import React from "react";
import {CustomButton} from "../Button/CustomButton";
import {logout} from "../../../store/reducers/authSlice";
import {IFCPropsDispatch} from "../../../ITypes";

export const Logout = (props: IFCPropsDispatch) => {
    const {dispatch}=props
    return (<CustomButton onClick={()=>dispatch(logout())}>
            Выйти из аккаунта
        </CustomButton>
    )
}