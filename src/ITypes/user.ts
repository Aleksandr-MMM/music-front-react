import {profileResponseType} from "./backend";

export type userPhoto = { photo: string|null }
export type userType = profileResponseType & userPhoto