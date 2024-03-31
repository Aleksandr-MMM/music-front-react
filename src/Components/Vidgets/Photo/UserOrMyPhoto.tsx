import {MyPhoto} from "../MyPhoto";
import {UserPhoto} from "./UserPhoto";
import React, {FC} from "react";
import {FCArguments, IFCPropsId, IFCPropsMyId} from "../../../../ITypes";

type propsType = FCArguments<typeof UserPhoto>&IFCPropsId&IFCPropsMyId
export const UserOrMyPhoto:FC<propsType> = (props) => {
   const {useUserPhotoContainer,photoSelectorPath,isLoadingSelector,id,element,wrapper,thunk,dispatch,myId}=props
    return (
        <>
            {myId === id ?
                <MyPhoto {...{dispatch,id,thunk,photoSelectorPath,isLoadingSelector,wrapper,element,
                    useUserPhotoContainer}}/> :
                <UserPhoto {...{dispatch,id,thunk,photoSelectorPath,isLoadingSelector,wrapper,element,
                    useUserPhotoContainer}}/>
                // <UserPhoto dispatch={dispatch} id={id} thunk={thunk}
                //            element={element}
                //            wrapper={wrapper}
                //            useUserPhotoContainer={useUserPhotoContainer}
                //            isLoadingSelector={isLoadingSelector}
                //            photoSelectorPath={photoSelectorPath}/>
            }
        </>
    )
}