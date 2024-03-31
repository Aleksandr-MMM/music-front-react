import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AxiosApi} from "../../API/ApiToBackend";
import {ReduxConstants} from "../../Constants";
import {urlLoadingType, urlType} from "../../ITypes";

export const getTracks = createAsyncThunk(ReduxConstants.ASYNC_THUNK_PREFIX.getTracks, async () => {
    return (await AxiosApi.tracks.getEntity()).data
})
export const getFile = createAsyncThunk(ReduxConstants.ASYNC_THUNK_PREFIX.getFile, async (id: string) => {
    return {path: (await AxiosApi.tracks.getFile(id)), id}
})
export type trackType = {
    id: string | null,
    "trackName": null | string,
    "author": null | string,
    "dateOfCreation": string,
    "lastUpdate": string,
} & { url: urlType & urlLoadingType }
type tracksRepoType = {
    tracks: trackType[],
    tracksLength: number
}

const trackSlice = createSlice({
        name: ReduxConstants.SLICE_NAME.AUTH_SLICE,
        initialState: {
            tracks: [],
            tracksLength: 0
        } as tracksRepoType,
        reducers: {},
        extraReducers: builder => {
            // получение токена для идентификации на сайте
            builder
                .addCase(getTracks.pending, (state, action) => {
                })
                .addCase(getTracks.fulfilled, (state, action) => {
                    for (let i = 0; action.payload.data.length > i; i++) {
                        state.tracks.push({...action.payload.data[i], url: {path: null, isLoading: 'preparing'}})
                    }
                    state.tracksLength = action.payload.data.length
                })
                .addCase(getTracks.rejected, (state, action) => {
                    console.log('getTracks.rejected')
                })
            const findTrackIndex = (state: tracksRepoType, id: string) => {
                return state.tracks.findIndex(track => track.id === id)
            }
            builder
                .addCase(getFile.pending, (state, action) => {
                    const index = findTrackIndex(state, action.meta.arg)
                    state.tracks[index].url.isLoading = 'loading'
                    console.log('getFile.pending')
                })
                .addCase(getFile.fulfilled, (state, action) => {
                    const index = findTrackIndex(state, action.payload.id)
                    state.tracks[index].url.isLoading = 'finish'
                    state.tracks[index].url.path = action.payload.path
                })
                .addCase(getFile.rejected, (state, action) => {
                    const index = findTrackIndex(state, action.meta.arg)
                    state.tracks[index].url.isLoading = 'finish'
                    console.log('getFile.rejected')
                })
        }
    }
)
// export const {logout} = authSlice.actions
export default trackSlice.reducer