import {useEffect} from "react";
import {AppDispatch} from "../../../ITypes";
import {useReduxSelector} from "../../../store/reduxStore";
import {authSliceSelectors, usersSliceSelectors} from "../../../store/selectors";
import {getUsers} from "../../../store/reducers/usersSlice";

export const useUsersContainer = (dispatch: AppDispatch) => {
    useEffect(() => {
            dispatch(getUsers())
    }, [dispatch])
    return {
        users: useReduxSelector(usersSliceSelectors.users()),
        myId:useReduxSelector(authSliceSelectors.id())
    }
}