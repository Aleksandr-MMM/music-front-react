import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AxiosApi} from "../../API/ApiToBackend";
import {ReduxConstants} from "../../Constants";
import {albumResponseType} from "../../ITypes";

export const getAlbumById = createAsyncThunk(ReduxConstants.ASYNC_THUNK_PREFIX.getAlbumById,
    async (id: string) => {
        return (await AxiosApi.album.getAlbumById(id)).data
    });
export const getMyAlbumById = createAsyncThunk(ReduxConstants.ASYNC_THUNK_PREFIX.getMyAlbumById,
    async () =>  (await AxiosApi.album.getMyAlbums()).data
);

export const addTrackInMyAlbum = createAsyncThunk(ReduxConstants.ASYNC_THUNK_PREFIX.addTrackInMyAlbum,
    async (thunkArgs: { albumId: string, trackList: albumResponseType['trackList'] }) => {
        return (await AxiosApi.album.addTrackInMyAlbum(thunkArgs.albumId, thunkArgs.trackList)).data
    });
export const delTrackInMyAlbum = createAsyncThunk('delTrackInMyAlbum',
    async (thunkArgs: { albumId: string, trackList: albumResponseType['trackList'] }) => {
        return (await AxiosApi.album.delTrackInMyAlbum(thunkArgs.albumId, thunkArgs.trackList)).data
    });
type myAlbums = { myAlbums: albumResponseType[] }
const albumSlice = createSlice<{ albums: albumResponseType[] } & myAlbums, {}>({
        name: ReduxConstants.SLICE_NAME.ALBUM_SLICE,
        initialState: {
            albums: [],
            myAlbums: []
        },
        reducers: {},
        extraReducers: builder => {
            const findIndexById=<T extends readonly albumResponseType[]>(array:T,albumId:albumResponseType['id'])=>{
                return array.findIndex(album => album.id === albumId);
            }
            builder
                .addCase(getAlbumById.pending, (state, action) => {
                })
                .addCase(getAlbumById.fulfilled, (state, action) => {
                    if (!state.albums.find(album => album.id === action.payload.data.id)) {
                        state.albums.push({...action.payload.data})
                    }
                })
                .addCase(getAlbumById.rejected, (state, action) => {
                })
            builder
                .addCase(getMyAlbumById.pending, (state, action) => {
                })
                .addCase(getMyAlbumById.fulfilled, (state, action) => {
                    for (let i = 0; action.payload.data.length > i; i++) {
                        if (!state.myAlbums.find(album => album.id === action.payload.data[i].id)) {
                            state.myAlbums.push({...action.payload.data[i]})
                        }
                        if (!state.albums.find(album => album.id === action.payload.data[i].id)) {
                            state.albums.push({...action.payload.data[i]})
                        }
                    }
                })
                .addCase(getMyAlbumById.rejected, (state, action) => {
                    console.log('getAlbumById.rejected')
                })
            builder
                .addCase(addTrackInMyAlbum.pending, (state, action) => {
                    console.log('addTrackInMyAlbum.pending')
                })
                .addCase(addTrackInMyAlbum.fulfilled, (state, action) => {
                    const albumIndex=findIndexById(state.albums,action.meta.arg.albumId);
                    if (albumIndex!==-1){
                        state.albums[albumIndex].trackList=action.payload.data.trackList
                    }
                })
                .addCase(addTrackInMyAlbum.rejected, (state, action) => {
                    console.log('addTrackInMyAlbum.rejected')
                })
            builder
                .addCase(delTrackInMyAlbum.pending, (state, action) => {
                    console.log('addTrackInMyAlbum.pending')
                })
                .addCase(delTrackInMyAlbum.fulfilled, (state, action) => {
                    const albumIndex=findIndexById(state.albums,action.meta.arg.albumId);
                    for (let i = 0; i < action.meta.arg.trackList.length; i++) {
                        state.albums[albumIndex].trackList  = state.albums[albumIndex].trackList.filter(track => (track !== action.meta.arg.trackList[i]))
                    }
                })
                .addCase(delTrackInMyAlbum.rejected, (state, action) => {
                    console.log('addTrackInMyAlbum.rejected')
                })
        }
    }
)
export type albumSliceType = ReturnType<typeof albumSlice.reducer>;
export default albumSlice.reducer