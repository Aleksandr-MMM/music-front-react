import {useReduxSelector} from "../../../store/reduxStore";
import {profileSliceSelectors} from "../../../store/selectors";

/**
 * Контейнерный хук
 */
export default function useUserFriendsContainer() {
    return useReduxSelector(profileSliceSelectors.subscribe())
}