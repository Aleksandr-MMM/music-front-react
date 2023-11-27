export type baseResponse<T=any> = {
    statusCode: number,
    error: null,
    data: T
};
export type profileResponseType = {
    subscribe: string[],
    friends:string[],
    status:string|null,
    nickName:string|null
    albumList:string[],
    dateOfCreation:string|null,
    lastUpdate:string|null,
    id:string|null
}

export type userPhotoResponseType =  ReadableStream<Uint8Array>
