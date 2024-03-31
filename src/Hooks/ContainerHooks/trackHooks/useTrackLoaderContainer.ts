import {useReduxSelector} from "../../store/reduxStore";
import {trackSelectors} from "../../store/selectors";
import {useEffect, useState} from "react";
import {getFile, trackSliceType} from "../../store/reducers/trackSlice";
import {IFCPropsDispatch} from "../../ITypes";

export const useTrackLoaderContainer = (trackId: trackSliceType["tracks"][number]["id"],dispatch:IFCPropsDispatch['dispatch']) => {
    const isLoadingFileStatus = useReduxSelector(trackSelectors.isLoading(trackId))
    const [isDisplayPreloader, changePreloader] = useState(false);
    useEffect(() => {
        if (isDisplayPreloader && trackId) {
            dispatch(getFile(trackId))
        }
    }, [isDisplayPreloader, trackId, dispatch]);
    return [isLoadingFileStatus,isDisplayPreloader,changePreloader] as const
};