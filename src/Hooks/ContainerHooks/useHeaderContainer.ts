import {useReduxSelector} from "../../store/reduxStore";
import {authSliceSelectors} from "../../store/selectors";

export default function useHeaderContainer() {
    return {
        userId:useReduxSelector(authSliceSelectors.id()),
        myEmail:useReduxSelector(authSliceSelectors.email())
    }
}