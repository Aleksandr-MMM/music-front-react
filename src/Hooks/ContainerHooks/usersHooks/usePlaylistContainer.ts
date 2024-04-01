import {useReduxSelector} from "../../../store/reduxStore";
import {profileSliceSelectors} from "../../../store/selectors";

export const usePlaylistContainer=()=>{
    return useReduxSelector(profileSliceSelectors.albumList())
}