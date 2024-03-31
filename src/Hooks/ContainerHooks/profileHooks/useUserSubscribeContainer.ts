import {useReduxSelector} from "../../../store/reduxStore";
import {profileSliceSelectors} from "../../../store/selectors";

/**
 * Контейнерный хук
 */
export default function useUserFriendsContainer() {
    return {
        friends:useReduxSelector(profileSliceSelectors.friends()),
        subscribe:useReduxSelector(profileSliceSelectors.subscribe()),
    }
}