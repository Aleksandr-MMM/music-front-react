import {useReduxSelector} from "../../../store/reduxStore";
import {userSliceSelectors} from "../../../store/selectors";

/**
 * Контейнерный хук
 */
export default function useUserFriendsContainer() {
    return {
        friends:useReduxSelector((state) => userSliceSelectors.friends(state)),
        subscribe:useReduxSelector((state) => userSliceSelectors.subscribe(state)),
    }
}