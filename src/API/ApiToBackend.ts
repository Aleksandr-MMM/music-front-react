import {LocalPersistenceService} from "../helpers/LocalPersistenceService";
import axios, {AxiosError, AxiosInstance} from "axios";
import {albumResponseType, baseResponse, profileResponseType} from "../ITypes";
import {ApiStream} from "./ApiStream";
import {checkStatusCodeException} from "../helpers/Exception/CheckStatusCodeException";

/**
 * Класс содержит метод создания instance ,instance,
 * и закрытый метод для работы с перехватчиком.
 * А также static public сеттер для обновленя Bearer токена
 */
class CreateInstanceAxios extends LocalPersistenceService {
    // private static readonly baseURL = 'http://localhost:5000'
    private static readonly baseURL = 'https://nestserver16-vijm0soi.b4a.run'
    private static bearerToken: string | null = LocalPersistenceService.getBearerToken

    protected static get getBearerToken() {
        return CreateInstanceAxios.bearerToken
    }

    private static headers = {
        authorization:
            `Bearer ${CreateInstanceAxios.getBearerToken}`
    }

    private static set setHeader(token: string) {
        CreateInstanceAxios.headers = {
            authorization:
                `Bearer ${token}`
        }
    }

    /**
     * Добавляет перехватчик запроса для response и reject
     * @param instance созданный AxiosInstance
     */
    private static addInterceptor(instance: AxiosInstance): AxiosInstance {
        type rejectResponse = {
            message: string | string[]
        };
        instance.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        instance.interceptors.response.use(function (response) {
            return response;
        }, function (error: Error | AxiosError<rejectResponse>) {
            // Проверка на наличие описания ошибки из backend
            if (axios.isAxiosError(error)) {
                if (error?.response && 'data' in error.response && 'message' in error?.response.data) {
                    if (typeof error.response.data.message === 'string') {
                        error.message = error.response.data.message
                    } else if (Array.isArray(error.response.data.message)
                        && typeof error.response.data.message[0] === 'string') {
                        error.message = error.response.data.message[0]
                    }
                }
            }
            return Promise.reject(error);
        });

        return instance
    }

    /**
     * Функция создания instance с request и response перехватчиком
     * @private
     */
    private static createInstance(): AxiosInstance {
        const instance = axios.create({
            baseURL: CreateInstanceAxios.baseURL,
            headers: CreateInstanceAxios.headers
        })
        return CreateInstanceAxios.addInterceptor(instance)
    }

    /**
     * instance для обращения к backend
     */
    protected static instance: AxiosInstance = CreateInstanceAxios.createInstance()

    public static set saveToken(newToken: string) {
        CreateInstanceAxios.saveBearerToken(newToken)
    }

    public static logoutAccount() {
        CreateInstanceAxios.removeBearerToken()
        CreateInstanceAxios.instance = CreateInstanceAxios.createInstance()
    }

    public static set refreshBearerToken(newToken: string) {
        CreateInstanceAxios.setBearerToken = newToken
        CreateInstanceAxios.bearerToken = newToken
        CreateInstanceAxios.setHeader = newToken
        CreateInstanceAxios.instance = CreateInstanceAxios.createInstance()
    }
}

/**
 * Класс для обработки бэк запросов.
 * Используются перехватчик request & response для обработки ошибок.
 */
export class AxiosApi extends CreateInstanceAxios {
    private static async updateProperty<T extends Partial<profileResponseType>>(obj: T) {
        return await AxiosApi.instance.put<baseResponse<profileResponseType>>(`user/updateProperty`, obj)
    }

    /**
     * Методы авторизации
     */
    public static auth = {
        /**
         * Регистрация пользователя по email & password
         * В случаи успеха возвращает сощбщение о необходимости подтверждение регистрации.
         */
        async registrationMe(email: string, password: string) {
            type regSuccessType = { message: string }
            return await AxiosApi.instance.post<baseResponse<regSuccessType>>
            (`auth/registration`, {email: email, password: password})
        },

        /**
         * Запрос на авторизацию по email & password
         * В случаи успеха возвращает bearer token для авторизации.
         */
        async getToken(email: string, password: string) {
            type getTokenType = { access_token: string }
            return await AxiosApi.instance.post<baseResponse<getTokenType>>
            (`auth/login`, {email: email, password: password})
        },
        /**
         * Идентификация моего аккаунта как пользователя .
         * Необходим авторизованный Bearer token в заголовке.
         * В случае успеха возвращает id текущего пользователя и свой email.
         */
        async authMe() {
            type authMeType = { email: string, id: string }
            return await AxiosApi.instance.get<baseResponse<authMeType>>(`auth/me`)
        }
    }
    /**
     * Методы для работы с пользователями
     */
    public static profile = {
        // need fix
        async getProfile(userId: string) {
            return await AxiosApi.instance.get<baseResponse<profileResponseType>>(`user/${userId}`)
        },
        async subscribeUser(userId: string) {
            return await AxiosApi.instance.put<baseResponse<string[]>>(`user/subscribe/${userId}`)
        },
        async unSubscribeUser(userId: string) {
            return await AxiosApi.instance.delete<baseResponse<profileResponseType>>(`user/unSubscribe/${userId}`)
        },
        async addNewFriend(userId: string) {
            return await AxiosApi.instance.put<baseResponse<profileResponseType>>(`user/addFriend/${userId}`)
        },
        async deleteFriend(userId: string) {
            return await AxiosApi.instance.delete<baseResponse<profileResponseType>>(`user/unFriend/${userId}`)
        },
        async putStatus(status: string) {
            return AxiosApi.updateProperty({status: status})
        },
        async putNickName(nickName: string) {
            return AxiosApi.updateProperty({nickName: nickName})
        },
    }
    public static users = {
        async getUsers() {
            return await AxiosApi.instance.get<baseResponse<{ id: string, nickName: string }[]>>(`user`)
        },
    }
    public static tracks = {
        async getEntity() {
            return await AxiosApi.instance.get<baseResponse<{
                id: string, "trackName": null | string,
                "author": null | string,
                "dateOfCreation": string,
                "lastUpdate": string,
            }[]>>(`track`)
        },
        async getTrackById(trackId: string) {
            return await AxiosApi.instance.get<baseResponse<{
                id: string, "trackName": null | string,
                "author": null | string,
                "dateOfCreation": string,
                "lastUpdate": string,
            }>>(`track/${trackId}`)
        },
        // async createFile() {
        //     const response = await fetch(`http://localhost:5000/track`, {
        //         method: 'GET', headers: {
        //             authorization:
        //                 `Bearer ${CreateInstanceAxios.getBearerToken}`
        //         }
        //     })
        //     checkStatusCodeException(response.status, 'photo not found.')
        //     return ApiStream.readReadableStream(response)
        // },
        async getFile(id: string) {
            const response = await fetch(`https://nestserver16-vijm0soi.b4a.run/track/file/${id}`, {
                method: 'GET', headers: {
                    authorization:
                        `Bearer ${CreateInstanceAxios.getBearerToken}`
                }
            })
            checkStatusCodeException(response.status, 'file not found.')
            return ApiStream.readReadableStream(response)
        },

    }
    public static album = {
        async getAlbumById(albumId: string) {
            return await AxiosApi.instance.get<baseResponse<albumResponseType>>(`album/${albumId}`)
        },
        async getMyAlbums() {
            return await AxiosApi.instance.get<baseResponse<albumResponseType[]>>(`album/myAlbums`)
        },
        async addTrackInMyAlbum(albumId: string, trackList: albumResponseType['trackList']) {
            return await AxiosApi.instance.put<baseResponse<albumResponseType>>(`album/track/${albumId}`, {trackList})
        },
        async delTrackInMyAlbum(albumId: string, trackList: albumResponseType['trackList']) {
            return await AxiosApi.instance.delete<baseResponse<null>>(`album/track/${albumId}`, {data: {trackList}})
        },
        async createNewPlaylist(albumName: string) {
            return await AxiosApi.instance.post<baseResponse<profileResponseType>>(`album`, {albumName})
        },
    }
    public static photo = {
        async getPhoto(userId: string): Promise<string | null> {
            const response = await fetch(`http://localhost:5000/user/photo/${userId}`, {
                method: 'GET', headers: {
                    authorization:
                        `Bearer ${CreateInstanceAxios.getBearerToken}`
                }
            })
            checkStatusCodeException(response.status, 'photo not found.')
            return ApiStream.readReadableStream(response)
        },
        async sendPhoto(file: File) {
            return await AxiosApi.instance.post<baseResponse<{ isAttachment: boolean }>>(
                `user/addPhoto`, {"photo": file},{headers:{"Content-Type":"multipart/form-data;"}})
        },
    }

}