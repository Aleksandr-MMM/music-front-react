import {useEffect} from "react";
import {AppDispatch, asyncThunk, RootState, urlLoadingType, urlType} from "../../ITypes";
import {useReduxSelector} from "../../store/reduxStore";

type userPhotoContainerType = (dispatch: AppDispatch, id: string | null, thunk: asyncThunk,
                               photoSelector: (state: RootState) => urlType['path'],
                               isLoadingSelector: (state: RootState) => urlLoadingType['isLoading'] | undefined
) =>
    { isLoading: (urlLoadingType['isLoading'] | undefined) } & urlType

export const useUserPhotoContainer: userPhotoContainerType = (dispatch, id, thunk
    , photoSelector, isLoadingSelector) => {
    let photo = useReduxSelector(photoSelector)
    const isLoading = useReduxSelector(isLoadingSelector)
    useEffect(() => {
        if (id && photo === undefined) {
            dispatch(thunk(id))
        }
    }, [dispatch, id, thunk, photo])

    return {
        path: photo,
        isLoading: isLoading
    }
}