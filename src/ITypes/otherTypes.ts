export type excludeFromObjectByValueType<Selector, Property> = {
    [K in keyof Selector as Selector[K] extends Property
        ? K : never]: Selector[K]
}
export type FCArguments<T extends (...args: any) => any> = T extends (args: infer P) => any ? P : never;