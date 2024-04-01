import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AxiosApi} from "../../API/ApiToBackend";
import {IFCPropsId, sliceReducerType, urlLoadingType, urlType} from "../../ITypes";
import {ReduxConstants} from "../../Constants";

export const getPhoto = createAsyncThunk(
    'ReduxConstants.ASYNC_THUNK_PREFIX.getUserPhoto', async (userId: string) => {
        return (await AxiosApi.photo.getPhoto(userId));
    })
export const updateMyPhoto = createAsyncThunk(
    'updateMyPhoto', async (photo: {id:string,file: File }) => {
        return (await AxiosApi.photo.sendPhoto(photo.file)).data
    })
type photosSliceState = { photos: (urlType & urlLoadingType & IFCPropsId)[] }
type photosSliceReducer=sliceReducerType<'changePhoto', photosSliceState,
    { url: string | null | undefined, id: string | undefined | null }>;
const photosSlice = createSlice<photosSliceState,photosSliceReducer>({
        name: ReduxConstants.SLICE_NAME.USERS_SLICE,
        initialState: {photos: []},
        reducers: {
            changePhoto(state, action): void {
                const photoIndex = state.photos.findIndex(photo => photo.id === action.payload.id)
                state.photos[photoIndex].path = action.payload.url
            },
        },
        extraReducers: builder => {
            const findPhotoIndex = (state: photosSliceState, id: string) => {
                return state.photos.findIndex(photo => photo.id === id)
            }
            builder
                .addCase(getPhoto.pending, (state, action) => {
                    if (findPhotoIndex(state, action.meta.arg) === -1)
                        state.photos.push({isLoading: 'loading', path: undefined, id: action.meta.arg})
                })
                .addCase(getPhoto.fulfilled, (state, action) => {
                    const photoById = findPhotoIndex(state, action.meta.arg)
                    if (photoById !== -1) {
                        state.photos[photoById].isLoading = 'finish'
                        state.photos[photoById].path = action.payload
                    } else {
                        state.photos.push({isLoading: 'finish', path: action.payload, id: action.meta.arg})
                    }
                })
                .addCase(getPhoto.rejected, (state, action) => {
                    const photoById = findPhotoIndex(state, action.meta.arg)
                    if (photoById !== -1) {
                        state.photos[photoById].isLoading = 'finish'
                        state.photos[photoById].path = null
                    } else {
                        state.photos.push({isLoading: 'finish', path: null, id: action.meta.arg})
                    }
                })
            builder
                .addCase(updateMyPhoto.pending, (state, action) => {
                })
                .addCase(updateMyPhoto.fulfilled, (state, action) => {
                    if (action.payload.data.isAttachment) {
                        const photoById = findPhotoIndex(state, action.meta.arg.id)
                        if (photoById !== -1) {
                            state.photos[photoById].path=URL.createObjectURL(action.meta.arg.file)
                        }

                    }
                })
                .addCase(updateMyPhoto.rejected, (state, action) => {
                })
        }
    }
)
export type photoSliceType = ReturnType<typeof photosSlice.reducer>;
export const {changePhoto} = photosSlice.actions
export default photosSlice.reducer