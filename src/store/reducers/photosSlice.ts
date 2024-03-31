import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AxiosApi} from "../../API/ApiToBackend";
import {userPhotoType} from "../../ITypes";
import {ReduxConstants} from "../../Constants";

export const getUsers = createAsyncThunk(
    ReduxConstants.ASYNC_THUNK_PREFIX.getUsers, async () => {
        return (await AxiosApi.users.getUsers()).data.data
    })
export const getUserPhoto = createAsyncThunk(
    ReduxConstants.ASYNC_THUNK_PREFIX.getUserPhoto, async (userId: string) => {
        return {photo: (await AxiosApi.profile.getPhoto(userId)), id: userId}
    })
type usersRepoType = {
    users: ({
        id: string, nickName: string | null,

    } & userPhotoType)[]
}
const usersSlice = createSlice({
        name: ReduxConstants.SLICE_NAME.USERS_SLICE,
        initialState: {
            users: []
        } as usersRepoType,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getUsers.fulfilled, (state, action) => {
                state.users = []

                for (let i = 0; action.payload.length > i; i++) {

                    state.users.push({...action.payload[i], photo: {isLoading: false, path: undefined}})
                }
            })
                .addCase(getUsers.rejected, () => {
                    console.log('error getUsers rejected')
                })
            const findUserIndex = (state: usersRepoType, id: string) => {
                return state.users.findIndex(user => user.id === id)
            }
            builder
                .addCase(getUserPhoto.pending, (state, action) => {
                    const index = findUserIndex(state, action.meta.arg)
                    state.users[index].photo.isLoading = true
                })
                .addCase(getUserPhoto.fulfilled, (state, action) => {
                    const index = findUserIndex(state, action.payload.id)
                    state.users[index].photo.isLoading = false
                    state.users[index].photo.path = action.payload.photo
                })
                .addCase(getUserPhoto.rejected, (state, action) => {
                    const index = findUserIndex(state, action.meta.arg)
                    state.users[index].photo.path = null
                })

        }
    }
)
export type userSliceType = ReturnType<typeof usersSlice.reducer>;
export default usersSlice.reducer