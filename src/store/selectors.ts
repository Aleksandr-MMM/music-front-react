import {RootState, excludeFromObjectByValueType, IFCPropsId} from "../ITypes";
import {profileSliceType} from "./reducers/profileSlice";
import {photoSliceType} from "./reducers/photosSlice";
import {trackSliceType} from "./reducers/trackSlice";
import {albumSliceType} from "./reducers/albumSlice";

type selectorsTypeEntity<Slice, T extends keyof Slice & string, Args = string> = {
    [K in T]: (id: Args) => (state: RootState) => Slice[T] | undefined
};
export type userSliceStateKeyStringOrNullType = keyof excludeFromObjectByValueType<profileSliceType, string | null>
// export type userSliceStateKeyStringType = keyof excludeFromObjectByValueType<profileSliceType, string>
export const profileSliceSelectors = {
    // allProperty:(userSliceState:keyof userSliceType)=>(state:RootState)=>state.profileSlice[userSliceState],
    allEqualStringOrNull: (userSliceState: userSliceStateKeyStringOrNullType) => (state: RootState) => state.profileSlice[userSliceState],
    // allEqualString: (userSliceState: userSliceStateKeyStringType) => (state: RootState) => state.profileSlice[userSliceState],
    id: () => (state: RootState) => state.profileSlice.id,
    nickName: () => (state: RootState) => state.profileSlice.nickName,
    status: () => (state: RootState) => state.profileSlice.status,
    friends: () => (state: RootState) => state.profileSlice.friends,
    subscribe: () => (state: RootState) => state.profileSlice.subscribe,
    albumList: () => (state: RootState) => state.profileSlice.albumList,
    isMyFriends: (myId: profileSliceType['id']) => (state: RootState) => (state.profileSlice.friends.find(id => (myId === id))),
}
export const authSliceSelectors = {
    authToken: () => (state: RootState) => state.authSlice.authToken,
    isAuth: () => (state: RootState) => state.authSlice.isAuth,
    isAuthPreloader: () => (state: RootState) => state.authSlice.isAuthPreloader,
    id: () => (state: RootState) => state.authSlice.id,
    email: () => (state: RootState) => state.authSlice.email,
    loginMessage: () => (state: RootState) => state.authSlice.responseBackendMessage.login,
    isDisableButton: () => (state: RootState):boolean => state.authSlice.isDisableButton,
    regErrorMess: () => (state: RootState) => state.authSlice.responseBackendMessage.regMess,
}
export const usersSliceSelectors = {
    users: () => (state: RootState) => state.usersSlice.users,
    photo: (selectedUser: number) => (state: RootState) => state.usersSlice.users[selectedUser]?.photo.path,
    // isLoadingPhoto: (selectedUser: number) => (state: RootState) => state.usersSlice.users[selectedUser]?.photo.isLoading,
}
type trackType = trackSliceType['tracks'][number]
type trackSelAliasUrl<T extends keyof trackType['url'], Args = string> = selectorsTypeEntity<trackType['url'], T, Args>
type trackSelAlias<T extends keyof trackType, Args = string> = selectorsTypeEntity<trackType, T, Args>
type trackSelectorsType = { tracks: () => (state: RootState) => trackSliceType['tracks'] } & trackSelAlias<'id'> &
    trackSelAliasUrl<'path', string | null> & trackSelAliasUrl<'isLoading', string | null> & {
    currentTrack: (trackId: trackType['id']) => (state: RootState) => trackType | undefined
};
export const trackSelectors: trackSelectorsType = {
    tracks: () => (state) => state.trackSlice.tracks,
    path: (trackId) => (state) => state.trackSlice.tracks.find(track => track.id === trackId)?.url.path,
    isLoading: (trackId) => (state) => state.trackSlice.tracks.find(track => track.id === trackId)?.url.isLoading,
    currentTrack: (trackId) => (state) => state.trackSlice.tracks.find(track => track.id === trackId),
    id: (trackId) => (state) => state.trackSlice.tracks.find(track => track.id === trackId)?.id,
    // currentTrackId: (index: number) => (state: RootState): trackSliceType['tracks'][number]['id'] =>
    //     state.trackSlice.tracks[index].id,
    // currentTrackName: (index: number) => (state: RootState): trackSliceType['tracks'][number]['trackName'] =>
    //     state.trackSlice.tracks[index].trackName,
    // currentTrackAuthor: (index: number) => (state: RootState): trackSliceType['tracks'][number]['author'] =>
    //     state.trackSlice.tracks[index].author,
    // currentTrackDateOfCreation: (index: number) => (state: RootState): trackSliceType['tracks'][number]['dateOfCreation'] =>
    //     state.trackSlice.tracks[index].dateOfCreation,
    // currentTrackLastUpdate: (index: number) => (state: RootState): trackSliceType['tracks'][number]['lastUpdate'] =>
    //     state.trackSlice.tracks[index].lastUpdate,

}
type photoType = photoSliceType['photos'][number]
type photoSelAlias<T extends keyof photoType, Args = string> = selectorsTypeEntity<photoType, T, Args>
type photoSelectorsType =
    photoSelAlias<'path', string | null>
    & photoSelAlias<'isLoading', string | null>
    & selectorsTypeEntity<photoSliceType, 'photos'>
    & {readonly photo: (id: IFCPropsId['id']) => (state: RootState) => photoType | undefined };
export const photoSelectors: photoSelectorsType = {
    photo: (photoId) => (state) => state.photosSlice.photos.find(photo => photo.id === photoId),
    path: (photoId) => (state) => state.photosSlice.photos.find(photo => photo.id === photoId)?.path,
    isLoading: (photoId) => (state): photoType['isLoading'] | undefined =>
        state.photosSlice.photos.find(photo => photo.id === photoId)?.isLoading,
    photos: () => (state) => state.photosSlice.photos
}

type albumType = albumSliceType["albums"][number]
type albumsSelAlias<T extends keyof albumType> = selectorsTypeEntity<albumType, T>
type albumsSelectorsType = albumsSelAlias<'trackList'> & albumsSelAlias<'albumName'> & albumsSelAlias<'lastUpdate'>
    & albumsSelAlias<'id'>& {readonly myAlbums:()=>(state: RootState)=>albumSliceType['myAlbums']};
export const albumsSelectors: albumsSelectorsType = {
    trackList: albumId => state => state.albumSlice.albums.find(album => album.id === albumId)?.trackList,
    albumName: albumId => state => state.albumSlice.albums.find(album => album.id === albumId)?.albumName,
    lastUpdate: albumId => state => state.albumSlice.albums.find(album => album.id === albumId)?.lastUpdate,
    id: albumId => state => state.albumSlice.albums.find(album => album.id === albumId)?.id,
    myAlbums: () => state => state.albumSlice.myAlbums,
}