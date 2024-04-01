import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AxiosApi} from "../../API/ApiToBackend";
import {sliceReducerType, userPhotoType} from "../../ITypes";
import {ReduxConstants} from "../../Constants";

export const getUsers = createAsyncThunk(ReduxConstants.ASYNC_THUNK_PREFIX.getUsers,
    async () => {return (await AxiosApi.users.getUsers()).data.data})
type usersRepoType = { users: ({ id: string, nickName: string | null, } & userPhotoType)[] };
type usersSliceReducer = sliceReducerType<'removeFriendFromUser', usersRepoType, string>;

const usersSlice = createSlice<usersRepoType, usersSliceReducer>({
        name: ReduxConstants.SLICE_NAME.USERS_SLICE,
        initialState: {users: []},
        reducers: {
            removeFriendFromUser(state, action: { payload: string }): void {
                state.users.filter(user => user.id !== action.payload)
            },
        },
        extraReducers: builder => {
            builder.addCase(getUsers.fulfilled, (state, action) => {
                // Обновлять ли пользователей при каждой загрузке?
                state.users = []
                for (let i = 0; action.payload.length > i; i++) {
                    state.users.push({...action.payload[i], photo: {isLoading: 'preparing', path: undefined}})
                }
            })
                .addCase(getUsers.rejected, () => {
                })
        }
    }
)
// export type userSliceType = ReturnType<typeof usersSlice.reducer>;
export default usersSlice.reducer