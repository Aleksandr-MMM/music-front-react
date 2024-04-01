import {useEffect} from "react";
import {authMe} from "../../store/reducers/authSlice";
import {useAppDispatch, useReduxSelector} from "../../store/reduxStore";
import {authSliceSelectors} from "../../store/selectors";

/**
 * Контейнерный хук
 */
export default function useAppContainer() {
    const dispatch = useAppDispatch()
    const authToken = useReduxSelector(authSliceSelectors.authToken());
    useEffect(() => {
        dispatch(authMe())
    }, [dispatch, authToken])
    return {
        isAuth: useReduxSelector(authSliceSelectors.isAuth()),
        dispatch,
        isAuthPreloader: useReduxSelector(authSliceSelectors.isAuthPreloader())
    }
}