type baseResInData = { id: string | null }
type baseUpdateResType = {
    dateOfCreation: string | null,
    lastUpdate: string | null,
}
export type baseResponse<T = any> = {
    statusCode: number,
    error: null,
    data: T
};
export type albumResponseType = {
    albumName: string | null,
    trackList:string[]
} & baseResInData & baseUpdateResType
export type profileResponseType = {
    subscribe: string[],
    friends: string[],
    status: string,
    nickName: string | null,
    albumList: ({ albumName: string } & baseResInData)[],
} & baseResInData & baseUpdateResType