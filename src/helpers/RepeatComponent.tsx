import React, {FC} from "react";

type RepeatComponentProps = { children: (i: number) => React.ReactNode, times: number }
/**
 * RepeatComponent  дублирует другие React.ReactNode элементы.
 * @param props включает в себя : times  счетчик сколько раз должен повториться компонет,
 * children  принимает анонимную колбек функцию, которая возвращает React.ReactNode, который необходимо продублировать.
 */
export const RepeatComponent:FC<RepeatComponentProps> = (props) => {
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