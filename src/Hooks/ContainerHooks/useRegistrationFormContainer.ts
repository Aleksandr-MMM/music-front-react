import {useReduxSelector} from "../../store/reduxStore";
import {authSliceSelectors} from "../../store/selectors";
/**
 * Контейнерный хук
 */
export default function useRegistrationFormContainer() {
    return {
        regErrorMess:useReduxSelector(state => authSliceSelectors.regErrorMess(state)),
        isDisableButton:useReduxSelector(state => authSliceSelectors.isDisableButton(state)),
    }
}