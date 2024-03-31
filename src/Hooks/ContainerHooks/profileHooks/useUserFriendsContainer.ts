import {useReduxSelector} from "../../../store/reduxStore";
import {userSliceSelectors} from "../../../store/selectors";

/**
 * Контейнерный хук
 */
export default function useUserFriendsContainer() {
    return {
        friends:useReduxSelector(userSliceSelectors.friends()),
        subscribe:useReduxSelector(userSliceSelectors.subscribe()),
    }
}