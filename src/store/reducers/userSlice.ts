import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AxiosApi} from "../../API/ApiToBackend";
import {userType} from "../../ITypes/user";
import {SliceActions} from "../../ITypes/IReduxTypes";
export const getUserProfile = createAsyncThunk(
    'get/profile', async (userId: string) => {
        return (await AxiosApi.user.getProfile(userId)).data.data
    })
export const getUserPhoto = createAsyncThunk(
    'get/userPhoto', async (userId: string) => {
        return (await AxiosApi.user.getPhoto(userId))
    })
export const sendPhoto = createAsyncThunk(
    'post/photo', async (userId: string) => {
        // return (await AxiosApi.user.getPhoto(userId)).data
    })
export const putStatus = createAsyncThunk(
    'put/status', async (status: string) => {
        return (await AxiosApi.user.putStatus(status)).data
    })
export const putNickName = createAsyncThunk(
    'put/nickname', async (nickName: string) => {
        return (await AxiosApi.user.putNickName(nickName)).data
    })
const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        id: null, albumList: [], dateOfCreation: null, friends: [], photo: null,
        lastUpdate: null, nickName: 'Не указанно', status: 'Не указанно', subscribe: []
    } as userType,
    reducers: {
        changeStatus(state, action: { payload: string }): void {
            state.status = action.payload
        },
        changeNikName(state, action: { payload: string }): void {
            state.nickName = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(getUserProfile.pending, () => {})
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.id = action.payload.id
                state.albumList = action.payload.albumList
                state.friends = action.payload.friends
                state.dateOfCreation = action.payload.dateOfCreation
                state.lastUpdate = action.payload.lastUpdate
                if(action.payload.status){
                    state.status = action.payload.status
                }
                if(action.payload.nickName){
                    state.nickName = action.payload.nickName
                }
                state.subscribe = action.payload.subscribe
            })
            .addCase(getUserProfile.rejected, () => {})

        builder.addCase(getUserPhoto.pending, () => {})
            .addCase(getUserPhoto.fulfilled, (state, action) => {
                state.photo = action.payload})
            .addCase(getUserPhoto.rejected, () => {})
        builder.addCase(putStatus.fulfilled,(state,action)=>{
            state.status=action.payload.data.status
        })
    }
})

export type userReducer =  SliceActions<typeof userSlice.actions>
export type dispatchUserReducerType= (value: string) => userReducer
export type userSliceType = ReturnType<typeof userSlice.reducer>;
export const {changeStatus,changeNikName} = userSlice.actions
export default userSlice.reducer