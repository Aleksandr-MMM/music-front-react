import {useReduxSelector} from "../../store/reduxStore";
import {authSliceSelectors} from "../../store/selectors";

/**
 * Контейнерный хук
 */
export default function useLoginFormContainer() {
    return {
        authMe:useReduxSelector(authSliceSelectors.loginMessage()),
        isDisableButton:useReduxSelector(authSliceSelectors.isDisableButton()),
    }
}