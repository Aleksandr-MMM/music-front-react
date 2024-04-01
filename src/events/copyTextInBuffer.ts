import React from "react";

type event = React.MouseEvent<HTMLParagraphElement, MouseEvent>
type successWriteTextType = React.Dispatch<React.SetStateAction<boolean>>
export const copyTextInBuffer = (e: event, successWriteText: successWriteTextType): void => {
    if ('innerText' in e.target && typeof e.target.innerText === 'string') {
        navigator.clipboard.writeText(e.target.innerText).then(() =>
            successWriteText((value) => !value))
    }
}