import {AppDispatch, asyncThunk, audioRefType, progressBarRefType} from "../ITypes";
import {
    addNewFriend, deleteFriend,
    dispatchUserReducerType,
    profileSliceType,
    subscribeUser, unSubscribeUser
} from "../store/reducers/profileSlice";
import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {getBearerToken, registrationMe} from "../store/reducers/authSlice";
import {FormikConstants} from "../Constants";
import {FormikContextType} from "formik";
import {albumSliceType} from "../store/reducers/albumSlice";
import {trackSliceType} from "../store/reducers/trackSlice";
import {AsyncThunk} from "@reduxjs/toolkit";
import {photoSliceType, updateMyPhoto} from "../store/reducers/photosSlice";

type textAreaChangeEventType = React.ChangeEvent<HTMLTextAreaElement>
type inputChangeEventType = React.ChangeEvent<HTMLInputElement>
type textAreaKeyboardEventType = React.KeyboardEvent<HTMLTextAreaElement>
type inputKeyboardEventType = React.KeyboardEvent<HTMLInputElement>
export const ElementEvents = {
    other: {
        changeBooleanState: (changePopup: React.Dispatch<React.SetStateAction<boolean>>) => () =>
            changePopup((prevState) => !prevState),
        subscribeUser: (dispatch: AppDispatch, userId: profileSliceType["id"],
                        changeAddFriend?: React.Dispatch<React.SetStateAction<string | null>>) => async () => {
            if (userId) {
                dispatch(subscribeUser(userId))
                if (changeAddFriend) {
                    changeAddFriend('Запрос на добавление в друзья,отправленн.')
                }

            }
        },
        unSubscribeUser: (dispatch: AppDispatch, userId: profileSliceType["id"]) => async () => {
            if (userId) {
                dispatch(unSubscribeUser(userId))
            }
        },
        addNewFriend: (dispatch: AppDispatch, userId: profileSliceType["id"],
                       changeAddFriend: React.Dispatch<React.SetStateAction<boolean>>) => async () => {
            if (userId) {
                dispatch(addNewFriend(userId))
                changeAddFriend(value => !value)
            }
        },
        deleteFriend: (dispatch: AppDispatch, userId: profileSliceType["id"], myId: profileSliceType["id"],
                       changeAddFriend?: React.Dispatch<React.SetStateAction<string | null>>) => async () => {
            if (userId && myId) {
                dispatch(deleteFriend({userId, myId}))
                if (changeAddFriend) {
                    changeAddFriend('Пользователь удаленн из списка друзей.')
                }
            }
        },
    },
    textArea: {
        onBlur: (dispatch: AppDispatch, onChangeSubmit: asyncThunk, value: string | null,
                 changeValue?: Dispatch<SetStateAction<string | null>>) =>
            (event: textAreaChangeEventType | inputChangeEventType): void => {
                if (value !== event.target.value && (event.target.value !== '' || null)) {
                    if (changeValue) {
                        changeValue(value => value !== event.target.value ? event.target.value : value)
                    }

                    dispatch(onChangeSubmit(event.target.value))
                }
            },
        onKeyUp: () => (event: textAreaKeyboardEventType | inputKeyboardEventType) => {
            if (event.code === 'Enter') {
                (event.target as HTMLTextAreaElement).blur()
            }
        },
        onChange: (dispatch: AppDispatch, reducer: dispatchUserReducerType) =>
            (event: textAreaChangeEventType): void => {
                if (event) {
                    if ('inputType' in event.nativeEvent && event.nativeEvent.inputType !== 'insertLineBreak'
                        && event.target.value !== null) {
                        dispatch(reducer(event.target.value))
                    }
                }
            },
    },
    input: {
        changeMyPhoto: (dispatch: AppDispatch, id: photoSliceType['photos'][number]['id'], changeOpenFormFile?: Dispatch<SetStateAction<boolean>>) =>
            (e: ChangeEvent<HTMLInputElement>) => {
                if (id && e.target.files) {
                    dispatch(updateMyPhoto({file: e.target.files[0], id}))
                }
                if (changeOpenFormFile) {
                    ElementEvents.other.changeBooleanState(changeOpenFormFile)()
                }
            },
        audioProgressChange: (progressBarRef: progressBarRefType['progressBarRef'], audioRef: audioRefType['audioRef']) =>
            () => {
                if (progressBarRef && audioRef) {
                    audioRef.current.currentTime = Number(progressBarRef.current.value);
                }
            },
        audioControlsSetVolume: (setVolume: Dispatch<SetStateAction<number>>) => (e: ChangeEvent<HTMLInputElement>) => {
            setVolume(parseInt(e.target.value))
        },

    },
    NavLink: {
        toProfile: (dispatch: AppDispatch, isRedirect: boolean = false) => (): void => {
            if (!isRedirect) {

            }
        }
    },
    audio: {
        onLoadedMetadata: (progressBarRef: progressBarRefType['progressBarRef'], audioRef: audioRefType['audioRef'],
                           setDuration: Dispatch<SetStateAction<number>>) => () => {
            if (progressBarRef && audioRef) {
                const seconds = audioRef.current.duration.toFixed(2);
                setDuration(parseFloat(seconds));
                progressBarRef.current.max = seconds
            }
        }
    },
    Formik: {
        onSubmit: {
            registration: (dispatch: AppDispatch,) => async (values: typeof FormikConstants['auth']) => {
                dispatch(registrationMe({email: values.email, password: values.password}))
            },
            login: (dispatch: AppDispatch) => async (values: typeof FormikConstants['auth'] & { rememberMe: boolean }) => {
                dispatch(getBearerToken({
                        email: values.email,
                        password: values.password,
                        rememberMe: values.rememberMe
                    }
                ))
            },
            addNewTrackImMyAlbum: (dispatch: AppDispatch) => async (values: typeof FormikConstants['addTrackInMyAlbum']) => {
                console.log(values)
                // dispatch()
            },
        } as const,
        onKeyUp: (submitForm: FormikContextType<{ albumName: string }>['submitForm']) =>
            (event: textAreaKeyboardEventType | inputKeyboardEventType) => {
                if (event.code === 'Enter') {
                    (event.target as HTMLTextAreaElement).blur()
                    submitForm().then()
                }
            },


    },
    button: {
        changeTime: (audioRef: audioRefType['audioRef'], second: number) => () => {
            if (audioRef) {
                audioRef.current.currentTime += second
            }
        },
        muteVolume: (setVolume: Dispatch<SetStateAction<number>>) => () => {
            setVolume(0)
        },
        unMuteVolume: (setVolume: Dispatch<SetStateAction<number>>) => () => {
            setVolume(50)
        },

    },
    menu: {
        updateTrackInAlbum: <ReturnedThunk = unknown>
        (dispatch: AppDispatch, albumId: profileSliceType["id"], track: trackSliceType['tracks'][number]['id'],
         asyncSync: AsyncThunk<ReturnedThunk, { albumId: string, trackList: albumSliceType['myAlbums'][number]['trackList'] }, any>,
         changeState?: React.Dispatch<React.SetStateAction<'addTrack' | 'addTrackLoading' | 'delTrackLoading' | 'delTrack'>>) => async () => {
            if (albumId && track) {
                const trackList: string[] = []
                trackList.push(track)
                await dispatch(asyncSync({albumId, trackList}))
            }
            if (changeState) {
                changeState(prevState => 'addTrack' === prevState ? 'addTrackLoading' : "delTrackLoading")
            }
        },
    },

}