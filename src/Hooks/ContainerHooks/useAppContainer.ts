import {useEffect} from "react";
import {authMe} from "../../store/reducers/authSlice";
import {useAppDispatch, useReduxSelector} from "../../store/reduxStore";
import {authSliceSelectors} from "../../store/selectors";

/**
 * Контейнерный хук
 */
export default function useAppContainer() {
    const dispatch = useAppDispatch()
    const authToken = useReduxSelector((state) => authSliceSelectors.authToken(state));
    useEffect(() => {
        dispatch(authMe())
    }, [dispatch, authToken])
    return {
        isAuth:useReduxSelector((state) => authSliceSelectors.isAuth(state)), dispatch,
        isAuthPreloader:useReduxSelector((state) => authSliceSelectors.isAuthPreloader(state))
    }
}