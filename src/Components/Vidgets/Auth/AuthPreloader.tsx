import {AuthPreloaderCircle} from "../../Component/Animation/AuthPreloader/AuthPreloaderCircle";
import {JumpingWords} from "../../Component/Animation/JumpingWords/JumpingWords";
import React, {FC} from "react";

type AuthPreloaderType = { words: string }
export const AuthPreloader: FC<AuthPreloaderType> = (props) => {
    return (<>
            <AuthPreloaderCircle/>
            <JumpingWords words={props.words} wrapper={{style:{color: 'red'}}} fontSize={50}/>
        </>
    )
}