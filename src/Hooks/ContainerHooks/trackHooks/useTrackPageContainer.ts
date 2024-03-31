import {useEffect} from "react";
import {AppDispatch} from "../../ITypes";
import {getTracks} from "../../store/reducers/trackSlice";
import {trackSelectors} from "../../store/selectors";
import {useReduxSelector} from "../../store/reduxStore";

export default function useTrackPageContainer(dispatch: AppDispatch) {
    const tracks=useReduxSelector(trackSelectors.tracks())
    useEffect(() => {
        dispatch(getTracks())
    } )
    return {tracks}
}