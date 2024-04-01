import React, {FC} from "react";
import defaultStyle from './jumpingWords.module.scss'
import {RepeatComponent} from "../../../../helpers/RepeatComponent";
import {IFCPropsElement, IFCPropsElementClassname, IFCPropsElementStyle, IFCPropsWrapper} from "../../../../ITypes";

type JumpingWordsPropsType =
    { words: string, fontSize: number }
    & IFCPropsWrapper<IFCPropsElementStyle & IFCPropsElementClassname>
    & IFCPropsElement<IFCPropsElementClassname>;
export const JumpingWords: FC<JumpingWordsPropsType> = (props) => {
    const {words, fontSize, wrapper, element} = props
    const addWrapperDefaultStyle = {
        '--fontSizeJumpingWords': `${fontSize}px`,
        '--numberOfLettersJumpingWords': words.length.toString()
    }
    const spanDefaultStyle = (i: number, words: string): React.CSSProperties | undefined => {
        return words[i] === ' ' ? {'--aniWords': i.toString(), marginLeft: '20px'}
            : {'--aniWords': i.toString()}
    }
    return (
        <div className={`${defaultStyle.JumpingWords} ${wrapper?.className ? wrapper?.className : ''}`}
             style={wrapper?.style ? {...wrapper.style, ...addWrapperDefaultStyle} : addWrapperDefaultStyle}>
            <RepeatComponent times={words.length} children={(i: number) =>
                <span className={element?.className ? element.className : undefined}
                      style={spanDefaultStyle(i, words)} key={i}>{words[i]} </span>}/>
        </div>)
}