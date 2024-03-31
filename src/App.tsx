import React from 'react';
import './App.css';
import {Header} from "./Components/PagesElements/Header/Header";
import {Article} from "./Components/PagesElements/Article/Article";
import {Navbar} from "./Components/PagesElements/NavBar/Navbar";
import {Footer} from "./Components/PagesElements/Footer/Footer";
import useAppContainer from "./Hooks/ContainerHooks/useAppContainer";
import {AuthComponent} from "./Components/PagesElements/Content/Auth/AuthComponent";
import {AnimationBgComponent} from "./Components/Component/Animation/AnimationBgComponent/AnimationBgComponent";
import {JumpingWords} from "./Components/Component/Animation/JumpingWords/JumpingWords";
import {AuthPreloader} from "./Components/Component/Animation/AuthPreloader/AuthPreloader";

function App(): React.ReactElement {
    const {isAuth, dispatch, isAuthPreloader} = useAppContainer()
    return (
        <div className='AppWrapper'>
            <div className="App">
                {
                    isAuthPreloader ? <>
                            <AuthPreloader/>
                            <JumpingWords words={'Подождите идет загрузка...'} style={{color: 'red'}} fontSize={50}/>
                        </>
                        :
                        <>
                            {isAuth ?
                                <>
                                    <Header dispatch={dispatch}/>
                                    <Navbar/>
                                    <Article dispatch={dispatch} isAuth={isAuth}/>
                                    <Footer/>
                                </>
                                :
                                <div>
                                    <AuthComponent dispatch={dispatch}/>
                                </div>}
                            <AnimationBgComponent/>
                        </>
                }
            </div>
        </div>
    );
}

export default App;
