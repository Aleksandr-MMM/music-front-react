import React from "react";

type FCDelayProps<T = any> = { closeMenu: React.Dispatch<React.SetStateAction<T>> } & { delayMSeconds: number }
    & { closeMenuChangeValue: (prevState: T) => T };

export function AddFCDelay<T>(props: FCDelayProps<T>) {
    const {closeMenu, delayMSeconds, closeMenuChangeValue} = props
    setTimeout(() => closeMenu(closeMenuChangeValue), delayMSeconds)
    return null
}