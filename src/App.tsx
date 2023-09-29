import React from 'react';
import './App.css';
import {Header} from "./Components/PagesElements/Header/Header";
import {Article} from "./Components/PagesElements/Article/Article";
import {Navbar} from "./Components/PagesElements/NavBar/Navbar";
import {Footer} from "./Components/PagesElements/Footer/Footer";

function App(): React.ReactElement {
    return (
        <div className="App">
            <Header/>
            <Navbar/>
            <Article/>
            <Footer/>
        </div>
    );
}

export default App;
