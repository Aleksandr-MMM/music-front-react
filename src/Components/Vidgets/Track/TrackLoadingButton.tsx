import preloader from "../../../assets/preloader.svg";
import style from "../../Component/Animation/AuthPreloader/AuthPreloader.module.scss";
import {JumpingWords} from "../../Component/Animation/JumpingWords/JumpingWords";
import React, {FC} from "react";

export const TrackPreloader:FC = () => {
 return (
     <div>
         <img src={preloader} alt="loading music file" className={style.preloader}
              style={{width: '100px'}}/>
         <JumpingWords words={'Идет загрузка. Подождите пожалуйста.'} fontSize={20}/>
     </div>
 );
};