import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AxiosApi} from "../../API/ApiToBackend";
import {userType, SliceActions, sliceReducerType} from "../../ITypes";
import {ReduxConstants} from "../../Constants";

export const getUserProfile = createAsyncThunk(
    ReduxConstants.ASYNC_THUNK_PREFIX.getUserProfile, async (userId: string) => {
        return (await AxiosApi.profile.getProfile(userId)).data.data
    })
export const putStatusProfile = createAsyncThunk(
    ReduxConstants.ASYNC_THUNK_PREFIX.putStatusProfile, async (status: string) => {
        return (await AxiosApi.profile.putStatus(status)).data
    })
export const putNickNameProfile = createAsyncThunk(
    ReduxConstants.ASYNC_THUNK_PREFIX.putNickNameProfile, async (nickName: string) => {
        return (await AxiosApi.profile.putNickName(nickName)).data
    })
export const subscribeUser = createAsyncThunk(
    ReduxConstants.ASYNC_THUNK_PREFIX.subscribeUser, async (userId: string) => {
        return (await AxiosApi.profile.subscribeUser(userId)).data.data
    })
export const unSubscribeUser = createAsyncThunk(
    ReduxConstants.ASYNC_THUNK_PREFIX.unSubscribeUser, async (userId: string) => {
        return (await AxiosApi.profile.unSubscribeUser(userId)).data.data
    })
export const addNewFriend = createAsyncThunk(
    ReduxConstants.ASYNC_THUNK_PREFIX.addNewFriend, async (userId: string) => {
        return (await AxiosApi.profile.addNewFriend(userId)).data.data
    })
export const deleteFriend = createAsyncThunk(
    ReduxConstants.ASYNC_THUNK_PREFIX.unFriend, async (id: { userId: string, myId: string }) => {
        return (await AxiosApi.profile.deleteFriend(id.userId)).data.data
    })
export const createNewPlaylist = createAsyncThunk(
    ReduxConstants.ASYNC_THUNK_PREFIX.createNewPlaylist, async (albumName: string) => {
        return (await AxiosApi.album.createNewPlaylist(albumName)).data.data
    })
type profileSliceReducer =
    sliceReducerType<'changeStatus', userType, string>
    & sliceReducerType<'changeNikName', userType, string>;

const profileSlice = createSlice<userType, profileSliceReducer>({
    name: ReduxConstants.SLICE_NAME.PROFILE,
    initialState: {
        id: null, albumList: [], dateOfCreation: null, friends: [],
        lastUpdate: null, nickName: 'Не указанно', status: 'Не указанно', subscribe: []
    },
    reducers: {
        changeStatus(state, action): void {
            state.status = action.payload
        },
        changeNikName(state, action): void {
            state.nickName = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getUserProfile.pending, () => {
        })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.id = action.payload.id
                state.albumList = action.payload.albumList
                state.friends = action.payload.friends
                state.dateOfCreation = action.payload.dateOfCreation
                state.lastUpdate = action.payload.lastUpdate
                action.payload.status ? state.status = action.payload.status : state.status = 'Не указанно'
                action.payload.nickName ? state.nickName = action.payload.nickName : action.payload.nickName = 'Не указанно'
                state.subscribe = action.payload.subscribe
            })
            .addCase(getUserProfile.rejected, () => {
            })
        builder.addCase(putStatusProfile.fulfilled, (state, action) => {
            state.status = action.payload.data.status
        })
        builder.addCase(subscribeUser.pending, () => {
        })
            .addCase(subscribeUser.fulfilled, (state, action) => {
            })
            .addCase(subscribeUser.rejected, () => {
            })
        builder.addCase(unSubscribeUser.pending, () => {
        })
            .addCase(unSubscribeUser.fulfilled, (state, action) => {
                state.subscribe.filter((id) => id === action.meta.arg)
            })
            .addCase(unSubscribeUser.rejected, () => {
            })
        builder.addCase(addNewFriend.pending, () => {
        })
            .addCase(addNewFriend.fulfilled, (state, action) => {
                state.friends.push(action.meta.arg)
                state.subscribe = state.subscribe.filter(user => user === action.meta.arg)
            })
            .addCase(addNewFriend.rejected, () => {
            })
        builder.addCase(deleteFriend.pending, () => {
        })
            .addCase(deleteFriend.fulfilled, (state, action) => {
                state.friends = state.friends.filter(id => id !== action.meta.arg.myId)
            })
            .addCase(deleteFriend.rejected, () => {
            })
        builder.addCase(createNewPlaylist.pending, () => {
        })
            .addCase(createNewPlaylist.fulfilled, (state, action) => {
                state.albumList = action.payload.albumList
            })
            .addCase(createNewPlaylist.rejected, () => {
            })
    }
})

export type profileReducer = SliceActions<typeof profileSlice.actions>
export type dispatchUserReducerType = (value: string) => profileReducer
export type profileSliceType = ReturnType<typeof profileSlice.reducer>;
export const {changeStatus, changeNikName} = profileSlice.actions
export default profileSlice.reducer