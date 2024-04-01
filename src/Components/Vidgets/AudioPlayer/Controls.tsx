import type {Dispatch, FC, SetStateAction} from "react";
import {
    IoPauseSharp,
    IoPlayBackSharp,
    IoPlayForwardSharp, IoPlaySharp, IoVolumeHighSharp
} from "react-icons/io5";

import {useControlsVolumeContainer} from "../../../Hooks/ContainerHooks/useAudioPlayer/useControlsVolumeContainer";
import {ElementEvents} from "../../../events/ElementEvents";
import {useControlsContainer} from "../../../Hooks/ContainerHooks/useAudioPlayer/useControlsContainer";
import {IoMdVolumeOff} from "react-icons/io";
import {IconContext} from "react-icons";
import style from './Controls.module.scss'
import volumeStyle from './ProgressBar.module.scss'
import {audioRefType, progressBarRefType} from "../../../ITypes";


type controlsTypeProps =
    audioRefType & progressBarRefType
    & { duration: number, setTimeProgress: Dispatch<SetStateAction<number>> }
export const Controls: FC<controlsTypeProps> = (props) => {
    const {audioRef, progressBarRef, setTimeProgress, duration} = props
    const [isPlaying, setIsPlaying] = useControlsContainer(progressBarRef, audioRef, duration, setTimeProgress)
    const {volume, setVolume} = useControlsVolumeContainer(audioRef)
    return (
        <div>
            <IconContext.Provider value={{color: "white", size: '15px'}}>
                <button children=<IoPlayBackSharp/> onClick={ElementEvents.button.changeTime(audioRef, -15)}
                        className={style.audioButton}/>
                <button children={isPlaying ? <IoPauseSharp style={{background: "black"}}/> : <IoPlaySharp/>}
                        className={style.audioButton}
                        onClick={() => {
                            setIsPlaying((prev) => !prev)
                        }}/>
                <button children=<IoPlayForwardSharp/> onClick={ElementEvents.button.changeTime(audioRef, 15)}
                        className={style.audioButton}/>
                <span className={volumeStyle.volumeBar}>
                    <input type="range" min={0} max={100} value={volume}
                           onChange={ElementEvents.input.audioControlsSetVolume(setVolume)}/>
                </span>
                <button style={{marginLeft: '5px'}} className={style.audioButton} children={volume !== 0 ?
                    <IoVolumeHighSharp onClick={ElementEvents.button.muteVolume(setVolume)}/>
                    : <IoMdVolumeOff onClick={ElementEvents.button.unMuteVolume(setVolume)}/>}/>
            </IconContext.Provider>
        </div>
    )
};