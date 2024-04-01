import {useReduxSelector} from "../../../store/reduxStore";
import {trackSelectors} from "../../../store/selectors";
import {trackSliceType} from "../../../store/reducers/trackSlice";

type containerArgs=trackSliceType['tracks'][number]['id']
type containerReturnType=() => string | null | undefined
export const useDisplayTrackContainer = (trackId:containerArgs):containerReturnType => {

    const useContainer=()=>{
        return useReduxSelector(trackSelectors.path(trackId))
    }
    return useContainer
};