import {reduxStore} from "../store/reduxStore";
import {TypedUseSelectorHook} from "react-redux";
import {AsyncThunk} from "@reduxjs/toolkit";

export type AppDispatch = typeof reduxStore.dispatch

export type RootState = ReturnType<typeof reduxStore.getState>;
// export type baseSelectorType = (state:RootState)=>any
export type asyncThunk<T=string> = AsyncThunk<any, T, any>

// export type DispatchFunc = () => AppDispatch
export type useReduxSelectorType = TypedUseSelectorHook<RootState>

export type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]