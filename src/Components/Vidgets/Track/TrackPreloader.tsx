import preloader from "../../../assets/preloader.svg";
import style from "../../Component/Animation/AuthPreloader/AuthPreloader.module.scss";
import {JumpingWords} from "../../Component/Animation/JumpingWords/JumpingWords";
import React, {FC} from "react";
import wordStyle from './TrackPreloader.module.scss'

export const TrackPreloader:FC = () => {
 return (
     <div>
         <img src={preloader} alt="loading music file" className={style.preloader}
              style={{width: '100px'}}/>
         <JumpingWords words={'Идет загрузка. Подождите пожалуйста.'} fontSize={15}
                       wrapper={{style:{display:"block"}}} element={{className:wordStyle.jumpWords}}/>
     </div>
 );
};