import {configureStore} from "@reduxjs/toolkit";
import authSlice from './reducers/authSlice'
import profileSlice from "./reducers/profileSlice";
import usersSlice from "./reducers/usersSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../ITypes";
import trackSlice from "./reducers/trackSlice";
import photosSlice from "./reducers/photosSlice";
import albumSlice from "./reducers/albumSlice";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector
export const reduxStore = configureStore({
    reducer: {
        authSlice,profileSlice,usersSlice,trackSlice,photosSlice,albumSlice
    },
})

