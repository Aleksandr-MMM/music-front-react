import {useReduxSelector} from "../../store/reduxStore";
import {authSliceSelectors} from "../../store/selectors";
/**
 * Контейнерный хук
 */
export default function useRegistrationFormContainer() {
    return {
        regErrorMess:useReduxSelector(authSliceSelectors.regErrorMess()),
        isDisableButton:useReduxSelector(authSliceSelectors.isDisableButton()),
    }
}