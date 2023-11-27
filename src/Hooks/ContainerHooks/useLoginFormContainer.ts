import {useReduxSelector} from "../../store/reduxStore";
import {authSliceSelectors} from "../../store/selectors";

/**
 * Контейнерный хук
 */
export default function useLoginFormContainer() {
    return {
        authMe:useReduxSelector(state => authSliceSelectors.loginMessage(state)),
        isDisableButton:useReduxSelector(state => authSliceSelectors.isDisableButton(state)),
    }
}