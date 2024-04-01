import {useState} from "react";
import {useAudioRefsContainer} from "./useAudioRefsContainer";

export const useAudioContainer=()=>{
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const {progressBarRef,audioRef}=useAudioRefsContainer()
    return {
        timeProgress,setTimeProgress,duration,setDuration,progressBarRef,audioRef
    }
}