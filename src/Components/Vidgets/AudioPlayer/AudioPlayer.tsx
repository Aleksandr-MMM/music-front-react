import {DisplayTrack} from "./DisplayTrack";
import {Controls} from "./Controls";
import {ProgressBar} from "./ProgressBar";
import {FC} from "react";
import {useAudioContainer} from "../../../Hooks/ContainerHooks/useAudioPlayer/useAudioContainer";

type AudioPlayerPropsType = { useDisplayTrackContainer: (...arg:any) => (string | null | undefined) }
export const AudioPlayer: FC<AudioPlayerPropsType> = ({useDisplayTrackContainer}) => {
    const {audioRef,progressBarRef,setTimeProgress,timeProgress,duration,setDuration}=useAudioContainer()
    return (
            <div>
                <ProgressBar {...{progressBarRef,audioRef,timeProgress,duration}}/>
                <DisplayTrack {...{audioRef,setDuration, progressBarRef,useDisplayTrackContainer}}/>
                <Controls {...{audioRef,progressBarRef, duration, setTimeProgress,}}/>
            </div>
    );
};