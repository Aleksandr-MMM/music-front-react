import React, {FC} from "react";
import style from "./Burger.module.scss";

type BurgerPropsType={isNavbar:boolean,openNavbar: React.Dispatch<React.SetStateAction<boolean>>}
export const Burger:FC<BurgerPropsType>=(props)=>{
    const {isNavbar,openNavbar}=props
    return (<div className={`${style.burgerWrapper} ${isNavbar?style.open:''}`}
                 onClick={()=>{openNavbar(prevState => !prevState)}}>
            <div className={style.icon}></div>
        </div>
    )
}