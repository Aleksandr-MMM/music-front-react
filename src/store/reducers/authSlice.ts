import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AxiosApi} from "../../API/ApiToBackend";

export const authMe = createAsyncThunk('post/authMe', async () => {
    return (await AxiosApi.auth.authMe()).data
})
export const getToken = createAsyncThunk('get/bearerToken',
    async (profileProperty: { email: string, password: string, rememberMe: boolean }) => {
        const response = (await AxiosApi.auth.getToken(profileProperty.email, profileProperty.password)).data
        // fix later
        const assignResponse: (typeof response) & { rememberMe: boolean } = Object.assign(response, {rememberMe: profileProperty.rememberMe})
        return assignResponse
    })
export const registrationMe = createAsyncThunk('post/registrationMe',
    async (profileProperty: { email: string, password: string }) => {
        return (await AxiosApi.auth.registrationMe(profileProperty.email, profileProperty.password)).data
    },)

type authRepoType = {
    authToken: null | string, email: null | string, id: null | string, isAuth: boolean,
    isAuthPreloader: boolean, isDisableButton: boolean,
    responseBackendMessage: {
        regMess: string | null,
        authMe: string | null,
        login: string | null
    }
}

const authSlice = createSlice({
        name: "authSlice",
        initialState: {
            authToken: null, email: null, id: null, isAuth: false, isAuthPreloader: true,
            isDisableButton: false,
            responseBackendMessage: {
                regMess: null,
                authMe: null,
                login: null
            }
        } as authRepoType ,
        reducers: {
            logout(state) {
                AxiosApi.logoutAccount()
                state.isAuth = false
            }
        }
        ,
        extraReducers: builder => {
            // получение токена для идентификации на сайте
            builder.addCase(getToken.pending, (state) => {
                state.isDisableButton = true
                state.responseBackendMessage.login = null
            })
                .addCase(getToken.fulfilled, (state, action) => {
                    state.isDisableButton = false
                    //Обновляю токен для последующих обращений в backend
                    AxiosApi.refreshBearerToken = action.payload.data.access_token
                    //Сохраняю токен локально
                    if (action.payload.rememberMe) {
                        AxiosApi.saveToken = action.payload.data.access_token
                    }
                    state.authToken = action.payload.data.access_token
                    state.responseBackendMessage.login = null
                })
                .addCase(getToken.rejected, (state, action) => {
                    state.isDisableButton = false
                    state.isAuth = false
                    if (typeof action.error.message === 'string') {
                        state.responseBackendMessage.login = action.error?.message
                    }
                })
            // идентификация аккаунта
            builder.addCase(authMe.pending, (state) => {
                state.isAuthPreloader = true
            })
                .addCase(authMe.fulfilled, (state, action) => {
                    state.email = action.payload.data.email
                    state.id = action.payload.data.id
                    state.isAuth = true
                    state.isAuthPreloader = false
                })
                .addCase(authMe.rejected, (state, action) => {
                    state.isAuth = false
                    state.isAuthPreloader = false
                    if (typeof action.error === 'string') {
                        state.responseBackendMessage.authMe = action.error
                    }
                })
            // Регистрация аккаунта
            builder.addCase(registrationMe.pending, (state) => {
                state.isDisableButton = true
                state.responseBackendMessage.regMess = null
            })
                .addCase(registrationMe.fulfilled, (state, action) => {
                    state.isDisableButton = false
                    state.responseBackendMessage.regMess = action.payload.data.message
                })
                .addCase(registrationMe.rejected, (state, action) => {
                    state.isDisableButton = false
                    if (typeof action.error.message === 'string') {
                        state.responseBackendMessage.regMess = action.error?.message
                    }
                })
        }
    }
)
export const {logout} = authSlice.actions
export default authSlice.reducer