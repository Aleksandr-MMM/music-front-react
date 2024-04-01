export type excludeFromObjectByValueType<Selector, Property> = {
    [K in keyof Selector as Selector[K] extends Property
        ? K : never]: Selector[K]
}
export type FCArguments<T extends (...args: any) => any> = T extends (args: infer P) => any ? P : never;
export type discriminantType<T extends string>={
    elementType:T
}
export type urlType = { path: string | null | undefined }
export type urlLoadingType = { isLoading: 'loading' | 'finish' | 'preparing' };
export type objectByKey<T, K extends keyof T> = Pick<T, Extract<keyof T, K>>
export type excludeObjectByKey<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>