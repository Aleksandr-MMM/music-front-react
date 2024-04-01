import {useReduxSelector} from "../../../store/reduxStore";
import {profileSliceSelectors} from "../../../store/selectors";
/**
 * Контейнерный хук
 */
export default function useUserInfoContainer() {
    return {
        nikName:useReduxSelector(profileSliceSelectors.nickName()),
        status:useReduxSelector(profileSliceSelectors.status()),
    }
}