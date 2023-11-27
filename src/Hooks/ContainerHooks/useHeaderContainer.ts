import {useReduxSelector} from "../../store/reduxStore";
import {authSliceSelectors} from "../../store/selectors";

export default function useHeaderContainer() {
    return {
        userId:useReduxSelector((state) => authSliceSelectors.id(state)),
        myEmail:useReduxSelector((state) => authSliceSelectors.email(state))
    }
}