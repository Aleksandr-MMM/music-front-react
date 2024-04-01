import {reduxStore} from "../store/reduxStore";

import {AsyncThunk, Draft} from "@reduxjs/toolkit";

export type AppDispatch = typeof reduxStore.dispatch
export type RootState = ReturnType<typeof reduxStore.getState>;
export type asyncThunk<T = string> = AsyncThunk<any, T, any>
export type sliceReducerType<ReducerName extends string, Slice, Payload = any> = { [P in ReducerName]:
    (state: Draft<Slice>, action: { payload: Payload, type: string }) => void };
export type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]