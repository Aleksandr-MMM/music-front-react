import {useEffect} from "react";
import {AppDispatch} from "../../../ITypes/IReduxTypes";
import {getUserPhoto} from "../../../store/reducers/userSlice";
import {useReduxSelector} from "../../../store/reduxStore";
import {userSliceSelectors} from "../../../store/selectors";

export const useUserPhotoContainer = (dispatch: AppDispatch,id:string|null) => {
    useEffect(() => {
        if (id) {
            dispatch(getUserPhoto(id))
        }
    }, [dispatch,id])
    return {
        photo: useReduxSelector(state => userSliceSelectors.photo(state)),
    }
}