import React, {FC, useState} from "react";
import {ElementEvents} from "../../../../events/ElementEvents";
import {CustomButton} from "../../../Component/Button/CustomButton";
import {IFCPropsDispatch, IFCPropsId, IFCPropsMyId} from "../../../../ITypes";
import {useAddNewFriendContainer} from "../../../../Hooks/ContainerHooks/useAddNewFriendContainer";

type addNewFriendProps = IFCPropsId & IFCPropsDispatch & IFCPropsMyId
export const AddNewFriend: FC<addNewFriendProps> = (props) => {
    const {dispatch, id, myId} = props
    const {isMyFriend} = useAddNewFriendContainer(myId)
    const [infoText, resInfoText] = useState<string | null>(null)
    return(infoText ?
            <span>{infoText}</span> :
                isMyFriend ?
                    <CustomButton onClick={ElementEvents.other.deleteFriend(dispatch, id, myId, resInfoText)}
                                  children={'Удалить из друзей.'}/>
                    :
                    <CustomButton onClick={ElementEvents.other.subscribeUser(dispatch, id, resInfoText)}
                                  children={'добавить в друзья'}/>
     )
}