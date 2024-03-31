import {profileSliceSelectors} from "../../store/selectors";
import {profileSliceType} from "../../store/reducers/profileSlice";
import {useReduxSelector} from "../../store/reduxStore";

export const useAddNewFriendContainer = (myId: profileSliceType['id']) => {
    return {isMyFriend:useReduxSelector(profileSliceSelectors.isMyFriends(myId))}
}