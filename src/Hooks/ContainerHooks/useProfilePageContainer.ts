import {AppDispatch} from "../../ITypes";
import {useEffect} from "react";
import {getUserProfile, profileSliceType} from "../../store/reducers/profileSlice";
import {useLocation} from "react-router-dom";
import {useReduxSelector} from "../../store/reduxStore";
import {profileSliceSelectors} from "../../store/selectors";

export const useProfilePageContainer = (dispatch: AppDispatch): {userId:profileSliceType['id']} => {
    const userId = useReduxSelector(profileSliceSelectors.id())
    const userIdPar = useLocation().pathname.substring(9)

    useEffect(() => {
        if (userIdPar !== userId) {
            dispatch(getUserProfile(userIdPar))
        }
    }, [dispatch, userIdPar, userId])

    return {
        userId
    }
}