import React, {FC, useState} from "react";
import useUserFriendsContainer from "../../../../Hooks/ContainerHooks/profileHooks/useUserSubscribeContainer";
import {AddNewFriendPopup} from "../../Popup/AddNewFriendPopup";
import {IFCPropsDispatch} from "../../../../ITypes";
import {CustomButton} from "../../../Component/Button/CustomButton";
import {ElementEvents} from "../../../../events/ElementEvents";

export const SubscribeWidget: FC<IFCPropsDispatch> = (props) => {
    const {dispatch} = props
    const subscribers = useUserFriendsContainer();
    const [isPopup, changePopup] = useState(false)
    return (
        <div style={{display:'flex',marginTop:'10px',justifyContent: 'center'}}>
            {
                subscribers.length > 0 ?
                    isPopup ?
                        <AddNewFriendPopup {...{dispatch, subscribe: subscribers, changePopup: changePopup}}/> :
                        <CustomButton onClick={ElementEvents.other.changeBooleanState(changePopup)}
                                      children={'С вами хотят подружиться'}/>
                    : undefined
            }
        </div>

    )
}