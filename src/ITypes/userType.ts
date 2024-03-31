import {profileResponseType} from "./backend";

export type urlPhoto = { url: string | null }
export type userPhoto = { photo: urlPhoto & { isLoadingPhoto: boolean } }


export type userType = profileResponseType & userPhoto