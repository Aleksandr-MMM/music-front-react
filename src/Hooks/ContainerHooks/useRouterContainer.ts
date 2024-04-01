import {useReduxSelector} from "../../store/reduxStore";
import {authSliceSelectors} from "../../store/selectors";


export const useRouterContainer=()=>{
    return{
        myAccId: useReduxSelector(authSliceSelectors.id())
    }
}