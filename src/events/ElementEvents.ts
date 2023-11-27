import {ITextAreaOnChangeEvent} from "../ITypes/IEvent";
import {AppDispatch, asyncThunk} from "../ITypes/IReduxTypes";
import {dispatchUserReducerType} from "../store/reducers/userSlice";
import {Dispatch, SetStateAction} from "react";

export const ElementEvents = {
    onBlurTextAreaEvent: (event: ITextAreaOnChangeEvent, dispatch: AppDispatch, onChangeSubmit: asyncThunk,
                          changeValue: Dispatch<SetStateAction<string | null>>, oldValue: string | null): void => {
        if (oldValue !== event.target.value) {
            changeValue(value => value !== event.target.value ? event.target.value : value)
            dispatch(onChangeSubmit(event.target.value))
        }
    },
    onChangeTextAreaEvent: (event: ITextAreaOnChangeEvent, dispatch: AppDispatch,
                            reducer: dispatchUserReducerType): void => {
        if (event) {
            if ('inputType' in event.nativeEvent && event.nativeEvent.inputType !== 'insertLineBreak') {
                dispatch(reducer(event.target.value))
            }
        }
    }
}