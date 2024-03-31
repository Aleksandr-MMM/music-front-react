import {MutableRefObject, useRef} from "react";

export const useAudioRefsContainer = () => {
    return {
        audioRef: useRef<HTMLAudioElement>() as MutableRefObject<HTMLAudioElement>,
        progressBarRef: useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>
    }
};