import {useReduxSelector} from "../../../store/reduxStore";
import {userSliceSelectors} from "../../../store/selectors";
/**
 * Контейнерный хук
 */
export default function useUserInfoContainer() {
    return {
        nikName:useReduxSelector((state) => userSliceSelectors.nickName(state)),
        status:useReduxSelector((state) => userSliceSelectors.status(state)),
    }
}