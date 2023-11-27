import React from "react";
import defaultStyle from './jumpingWords.module.scss'
import {RepeatComponent} from "../../../../helpers/RepeatComponent";

type JumpingWordsType = { words: string,fontSize?:number}&React.HTMLAttributes<HTMLDivElement>
export const JumpingWords = (props: JumpingWordsType): React.ReactElement => {
    const {words,fontSize,style} = props
    const divDefaultStyle={'--fontSizeJumpingWords': `${fontSize}px`, '--numberOfLettersJumpingWords': words.length.toString()}
    const spanDefaultStyle=(i: number,words:string)=>{
        return words[i] === ' ' ? {'--aniWords': i.toString(), marginLeft: '20px'}
            : {'--aniWords': i.toString()}
    }
    return (<div className={defaultStyle.JumpingWords}
                 style={style? {...style,...divDefaultStyle}:divDefaultStyle}>
        <RepeatComponent times={words.length}>
            {(i: number) => <span style={spanDefaultStyle(i,words)} key={i}>{words[i]} </span>}
        </RepeatComponent>
    </div>)
}