import {configureStore} from "@reduxjs/toolkit";
import authSlice from './reducers/authSlice'
import userSlice from "./reducers/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, useReduxSelectorType} from "../ITypes/IReduxTypes";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useReduxSelector: useReduxSelectorType = useSelector
export const reduxStore = configureStore({
    reducer: {
        authSlice,userSlice
    },
})

