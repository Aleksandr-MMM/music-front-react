import {useEffect, useState} from "react";
import {audioRefType} from "../../../ITypes";

export const useControlsVolumeContainer = (audioRef: audioRefType['audioRef']) => {
    const [volume, setVolume] = useState(60);
    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume, audioRef]);
    return {volume,setVolume}
};