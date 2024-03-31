import {useEffect} from "react";
import {AppDispatch} from "../../../ITypes/IReduxTypes";
import {getUserPhoto} from "../../../store/reducers/profileSlice";
import {useReduxSelector} from "../../../store/reduxStore";
import {userSliceSelectors} from "../../../store/selectors";

export const useUserPhotoContainer = (dispatch: AppDispatch,id:string|null) => {
    useEffect(() => {
        if (id) {
            dispatch(getUserPhoto(id))
        }
    }, [dispatch,id])
    return {
        photo: useReduxSelector(userSliceSelectors.photo()),
    }
}