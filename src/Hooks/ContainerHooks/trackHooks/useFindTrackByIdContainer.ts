import {useReduxSelector} from "../../../store/reduxStore";
import {trackSelectors} from "../../../store/selectors";
import {useEffect} from "react";
import {getTrackById, trackSliceType} from "../../../store/reducers/trackSlice";
import {AppDispatch} from "../../../ITypes";

export const useFindTrackByIdContainer = (trackId: trackSliceType["tracks"][number]["id"], dispatch: AppDispatch) => {
    const track = useReduxSelector(trackSelectors.currentTrack(trackId))
    useEffect(() => {
        if (trackId && track?.id !== trackId) {
            dispatch(getTrackById(trackId))
        }
    }, [trackId, dispatch, track?.id]);
    return [track] as const
};