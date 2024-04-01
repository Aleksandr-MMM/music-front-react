import {Dispatch, FC, SetStateAction} from "react";
import {ElementEvents} from "../../../events/ElementEvents";
import {audioRefType, progressBarRefType} from "../../../ITypes";

type DisplayTrackProps = audioRefType & progressBarRefType & {
    setDuration: Dispatch<SetStateAction<number>>,
    useDisplayTrackContainer: () => (string | null | undefined)
}
export const DisplayTrack: FC<DisplayTrackProps> = (props) => {
    const {audioRef, progressBarRef, setDuration,useDisplayTrackContainer} = props
    const trackUrl = useDisplayTrackContainer()
    return <div>
        <audio src={trackUrl ? trackUrl : undefined} ref={audioRef}
               onLoadedMetadata={ElementEvents.audio.onLoadedMetadata(progressBarRef, audioRef, setDuration)}/>
    </div>
};