import {RootState} from "../ITypes/IReduxTypes";
import {userSliceType} from "./reducers/userSlice";
import {excludeFromObjectByValueType} from "../ITypes/otherTypes";
type userSliceStateKeyType = keyof excludeFromObjectByValueType<userSliceType, string | null>
export const userSliceSelectors={
    allProperty:(state:RootState,userSliceState:keyof userSliceType)=>state.userSlice[userSliceState],
    allEqualStringOrNull:(state:RootState, userSliceState:userSliceStateKeyType)=>state.userSlice[userSliceState],
    photo:(state:RootState)=>state.userSlice.photo,
    id:(state:RootState)=>state.userSlice.id,
    nickName:(state:RootState)=>state.userSlice.nickName,
    status:(state:RootState)=>state.userSlice.status,
    friends:(state:RootState)=>state.userSlice.friends,
    subscribe:(state:RootState)=>state.userSlice.subscribe,
}
export const authSliceSelectors={
    authToken:(state:RootState)=>state.authSlice.authToken,
    isAuth:(state:RootState)=>state.authSlice.isAuth,
    isAuthPreloader:(state:RootState)=>state.authSlice.isAuthPreloader,
    id:(state:RootState)=>state.authSlice.id,
    email:(state:RootState)=>state.authSlice.email,
    loginMessage:(state:RootState)=>state.authSlice.responseBackendMessage.login,
    isDisableButton:(state:RootState)=>state.authSlice.isDisableButton,
    regErrorMess:(state:RootState)=>state.authSlice.responseBackendMessage.regMess,

}
