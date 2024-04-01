const CRUD_CONSTANT = {
    GET: 'get',
    PUT: 'put',
    POST: 'post',
    DELETE: 'delete',
}

const SLICE_NAME = {
    PROFILE: 'profileSlice',
    AUTH_SLICE: 'authSlice',
    USERS_SLICE: 'usersSlice',
    TRACK_SLICE: 'trackSlice',
    ALBUM_SLICE: 'albumSlice',
}
export const ReduxConstants = {
    SLICE_NAME,
    ASYNC_THUNK_PREFIX: {
        getUserProfile: `${CRUD_CONSTANT.GET}/userProfile`,
        getPhotoProfile: `${CRUD_CONSTANT.GET}/photoProfile`,
        sendPhotoProfile: `${CRUD_CONSTANT.POST}/photoProfile`,
        putStatusProfile: `${CRUD_CONSTANT.PUT}/statusProfile`,
        putNickNameProfile: `${CRUD_CONSTANT.PUT}/nickNameProfile`,
        authMe: `${CRUD_CONSTANT.POST}/authMe`,
        getBearerToken: `${CRUD_CONSTANT.GET}/bearerToken`,
        registrationMe: `${CRUD_CONSTANT.POST}/registrationMe`,
        getUsers: `${CRUD_CONSTANT.GET}/users`,
        getUserPhoto: `${CRUD_CONSTANT.GET}/userPhoto`,
        getTracks: `${CRUD_CONSTANT.GET}/tracks`,
        getTrackById: `${CRUD_CONSTANT.GET}/trackById`,
        getFile: `${CRUD_CONSTANT.GET}/tracksFile`,
        subscribeUser: `${CRUD_CONSTANT.PUT}/subscribe`,
        unSubscribeUser: `${CRUD_CONSTANT.DELETE}/unSubscribe`,
        addNewFriend: `${CRUD_CONSTANT.PUT}/addNewFriend`,
        unFriend: `${CRUD_CONSTANT.PUT}/unFriend`,
        createNewPlaylist: `${CRUD_CONSTANT.POST}/album`,
        getAlbumById: '/albumById',
        getMyAlbumById: '/myAlbumById',
        addTrackInMyAlbum: '/addTrackInMyAlbum',
    } as const,
}
export const UrlConstant = {
    profile: '/profile',
    find: '/find',
    users: '/users',
    track: "/track"
} as const

export const FormikConstants = {
    auth: {
        email: '',
        password: '',
    },
    albumPlaylist: {
        albumName: ''
    },
    addTrackInMyAlbum: {
        trackName: '',
        author: '',
        addTrackFile: ''
    }
}