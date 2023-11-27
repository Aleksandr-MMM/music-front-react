import React from "react";

type RepeatComponentProps = { children: (i: number) => React.ReactNode, times: number }
/**
 * RepeatComponent  дублирует другие React.ReactNode элементы.
 * @param  times  счетчик сколько раз должен повториться компонет
 * @param  children  принимает анонимную колбек функцию, которая возвращает React.ReactNode, который необходимо
 * продублировать.
 * @constructor
 */
export const RepeatComponent = (props: RepeatComponentProps): React.ReactElement<RepeatComponentProps> => {
    const {times, children} = props;
    if (Number.isNaN(times)) {
        throw Error('Переменная times должна быть числом')
    }
    let elements: React.ReactNode[] = []
    for (let i = 0; i < times; i++) {
        elements.push(children(i))
    }
    return (<>
        {elements}
    </>)
}