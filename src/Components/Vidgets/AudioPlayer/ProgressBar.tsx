import style from './ProgressBar.module.scss'
import type {FC} from "react";
import {formatTime} from "../../../helpers/formatTime";
import {ElementEvents} from "../../../events/ElementEvents";
import {audioRefType, progressBarRefType} from "../../../ITypes";

type progressBarProps = {
    timeProgress: number,
    duration: number,
} & audioRefType & progressBarRefType
export const ProgressBar: FC<progressBarProps> = (props) => {
    const {progressBarRef, audioRef, timeProgress, duration} = props
    return (
        <div className={style.progressBar}>
            <span style={{marginRight:'10px'}} className={style.durationAndCurrentTime}>{formatTime(timeProgress)}</span>
            <input type="range" ref={progressBarRef} defaultValue="0"
                   onChange={ElementEvents.input.audioProgressChange(progressBarRef,audioRef)}/>
            <span style={{marginLeft:'10px'}} className={style.durationAndCurrentTime}>{formatTime(duration)}</span>
        </div>
    );
};