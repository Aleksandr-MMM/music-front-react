import React, {FC} from "react";
import style from './AnimationBgComponent.module.scss'
import {RepeatComponent} from "../../../../helpers/RepeatComponent";
export const AnimationPageComponent:FC=()=>{
    // Счетчик который храниться в sass AnimationBgComponent.module.scss
    const times=parseInt(style.circlesElementCount)
    return(<div className={style.animationWrapper}>
        <ul className={style.circles}>
            <RepeatComponent times={times} >
                {(i:number)=><li key={i}></li>}
            </RepeatComponent>
        </ul>
    </div>)
}