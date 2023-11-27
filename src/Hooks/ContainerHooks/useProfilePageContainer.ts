import {AppDispatch, } from "../../ITypes/IReduxTypes";
import {useEffect} from "react";
import {getUserProfile} from "../../store/reducers/userSlice";
import {useLocation} from "react-router-dom";
import {useReduxSelector} from "../../store/reduxStore";
import {userSliceSelectors} from "../../store/selectors";

export const useProfilePageContainer = (dispatch: AppDispatch):{userId:string|null} => {
    const userIdPar = useLocation().pathname.substring(9)
    useEffect(() => {
        if(userIdPar){
            dispatch(getUserProfile(userIdPar))
        }
    }, [dispatch,userIdPar])

    return{
        userId :  useReduxSelector(state => userSliceSelectors.id(state))
    }
}