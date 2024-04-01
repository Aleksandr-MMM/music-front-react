import React from 'react';
import style from './App.module.scss';
import useAppContainer from "./Hooks/ContainerHooks/useAppContainer";
import {AuthFailed} from "./Components/Vidgets/Auth/AuthFailed";
import {AnimationPageComponent} from "./Components/Component/Animation/AnimationBgComponent/AnimationPageComponent";
import {AuthPreloader} from "./Components/Vidgets/Auth/AuthPreloader";
import {AuthSuccess} from "./Components/Vidgets/Auth/AuthSuccess";

function App(): React.ReactElement {
    const {isAuth, dispatch, isAuthPreloader} = useAppContainer()
    return (
        <div className={style.AppWrapper}>
            <div className={style.App}>

                {
                    isAuthPreloader ?
                        <AuthPreloader words={'Подождите идет загрузка...'}/>
                        : isAuth ?
                            <AuthSuccess dispatch={dispatch}/> :
                            <AuthFailed dispatch={dispatch}/>
                }

            </div>
            <AnimationPageComponent/>
        </div>
    );
}
export default App;
