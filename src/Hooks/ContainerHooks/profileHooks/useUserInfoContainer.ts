import {useReduxSelector} from "../../../store/reduxStore";
import {userSliceSelectors} from "../../../store/selectors";
/**
 * Контейнерный хук
 */
export default function useUserInfoContainer() {
    return {
        nikName:useReduxSelector(userSliceSelectors.nickName()),
        status:useReduxSelector(userSliceSelectors.status()),
    }
}