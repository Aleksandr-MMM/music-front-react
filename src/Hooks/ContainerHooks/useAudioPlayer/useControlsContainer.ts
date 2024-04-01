import {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState,} from "react";
import {audioRefType, progressBarRefType} from "../../../ITypes";

export const useControlsContainer = (progressBarRef:progressBarRefType['progressBarRef'],audioRef:audioRefType['audioRef']
                                     ,duration:number,setTimeProgress:Dispatch<SetStateAction<number>>) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const playAnimationRef = useRef<number>();
    const repeat = useCallback(() => {
        if (progressBarRef && audioRef && 'current' in audioRef && audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            setTimeProgress(parseFloat(currentTime.toFixed()));
            progressBarRef.current.value = currentTime.toString();
            progressBarRef.current.style.setProperty(
                '--range-progress',
                `${(parseFloat(progressBarRef.current.value) / duration) * 100}%`
            );
            playAnimationRef.current = requestAnimationFrame(repeat);
        }
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if (isPlaying && audioRef) {
            audioRef.current.play().then(r => r);
        } else {
            if (audioRef) {
                audioRef.current.pause();
            }
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);
    return [isPlaying,setIsPlaying] as const
};