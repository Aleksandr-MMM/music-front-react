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
}

export const ReduxConstants = {
    SLICE_NAME,
    ASYNC_THUNK_PREFIX: {
        getUserProfile:`${CRUD_CONSTANT.GET}/userProfile`,
        getPhotoProfile:`${CRUD_CONSTANT.GET}/photoProfile`,
        sendPhotoProfile:`${CRUD_CONSTANT.POST}/photoProfile`,
        putStatusProfile:`${CRUD_CONSTANT.PUT}/statusProfile`,
        putNickNameProfile:`${CRUD_CONSTANT.PUT}/nickNameProfile`,
        authMe:`${CRUD_CONSTANT.POST}/authMe`,
        getBearerToken:`${CRUD_CONSTANT.GET}/bearerToken`,
        registrationMe:`${CRUD_CONSTANT.POST}/registrationMe`,
        getUsers:`${CRUD_CONSTANT.GET}/users`,
        getUserPhoto:`${CRUD_CONSTANT.GET}/userPhoto`,
    },
    profileSlice: {}
}