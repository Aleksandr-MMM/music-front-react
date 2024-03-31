import style from './AuthPreloader.module.scss'
import preloader from "../../../../assets/LoadingPreloaderV2.svg";
import React from "react";

export const AuthPreloader=():React.ReactElement=>{
    return(
        <div className={style.wrapperPreloader}>
            <img src={preloader} alt="preloader" className={style.preloader}/>
        </div>
    )
}