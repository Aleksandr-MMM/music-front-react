import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AxiosApi} from "../../API/ApiToBackend";
import {ReduxConstants} from "../../Constants";
import {sliceReducerType, urlLoadingType, urlType} from "../../ITypes";

export const getTracks = createAsyncThunk(ReduxConstants.ASYNC_THUNK_PREFIX.getTracks, async () => {
    return (await AxiosApi.tracks.getEntity()).data
})
export const getTrackById = createAsyncThunk(ReduxConstants.ASYNC_THUNK_PREFIX.getTrackById, async (trackId:string) => {
    return (await AxiosApi.tracks.getTrackById(trackId)).data
})
export const getFile = createAsyncThunk(ReduxConstants.ASYNC_THUNK_PREFIX.getFile, async (id: string) => {
    return {path: (await AxiosApi.tracks.getFile(id)), id}
})
type trackType = {
    id: string | null,
    "trackName": null | string,
    "author": null | string,
    "dateOfCreation": string,
    "lastUpdate": string,
} & { url: urlType & urlLoadingType }
type tracksRepoType = {
    tracks: trackType[]
}

const trackSlice = createSlice<tracksRepoType,sliceReducerType<'deleteTrack',tracksRepoType,string>>({
        name: ReduxConstants.SLICE_NAME.TRACK_SLICE,
        initialState: {
            tracks: [],
        } ,
        reducers: {
            deleteTrack:(state, action)=>{
                // const trackIndex = state.tracks.findIndex(album => album.id === action.payload);
                // const trackTrackList = state.tracks[albumIndex]
                // console.log('delTrackInMyAlbum')
                // for (let i = 0; i < action.meta.arg.trackList.length; i++) {
                //     trackTrackList.filter(track => (track === action.meta.arg.trackList[i] && console.log(track === action.meta.arg.trackList[i])))
                // }
            }
        },
        extraReducers: builder => {
            builder
                .addCase(getTracks.pending, (state, action) => {
                })
                .addCase(getTracks.fulfilled, (state, action) => {
                    for (let i = 0; action.payload.data.length > i; i++) {
                        if(!state.tracks.find(track=>track.id===action.payload.data[i].id )) {
                            state.tracks.push({...action.payload.data[i], url: {path: null, isLoading: 'preparing'}})
                        }
                    }
                })
                .addCase(getTracks.rejected, (state, action) => {
                })
            builder
                .addCase(getTrackById.pending, (state, action) => {
                })
                .addCase(getTrackById.fulfilled, (state, action) => {
                    if(!state.tracks.find(track=>track.id===action.payload.data.id )) {
                        state.tracks.push({...action.payload.data, url: {path: null, isLoading: 'preparing'}})
                    }
                })
                .addCase(getTrackById.rejected, (state, action) => {
                })
            const findTrackIndex = (state: tracksRepoType, id: string) => {
                return state.tracks.findIndex(track => track.id === id)
            }
            builder
                .addCase(getFile.pending, (state, action) => {
                    const index = findTrackIndex(state, action.meta.arg)
                    state.tracks[index].url.isLoading = 'loading'
                })
                .addCase(getFile.fulfilled, (state, action) => {
                    const index = findTrackIndex(state, action.payload.id)
                    state.tracks[index].url.isLoading = 'finish'
                    state.tracks[index].url.path = action.payload.path
                })
                .addCase(getFile.rejected, (state, action) => {
                    const index = findTrackIndex(state, action.meta.arg)
                    state.tracks[index].url.isLoading = 'finish'
                })
        }
    }
)
export type trackSliceType = ReturnType<typeof trackSlice.reducer>;
export default trackSlice.reducer