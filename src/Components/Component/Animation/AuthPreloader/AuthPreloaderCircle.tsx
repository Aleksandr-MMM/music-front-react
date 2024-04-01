import style from './AuthPreloader.module.scss'
import preloader from "../../../../assets/LoadingPreloaderV2.svg";
import React, {FC} from "react";

export const AuthPreloaderCircle:FC=()=>{
    return(
        <div className={style.wrapperPreloader}>
            <img src={preloader} alt="preloader" className={style.preloader}/>
        </div>
    )
}