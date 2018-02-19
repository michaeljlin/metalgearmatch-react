import React from 'react';
import './app.css';
import Main from './mainboard';
import pazPortrait from '../assets/images/paz.png'

const App = () => (
    <div>
        <div className="app">
            <div className="portraitWarning">
                <p>Please pardon the inconvenience:</p>
                <p>This app runs best in landscape mode.</p>
                <img src={pazPortrait}/>
            </div>
            <Main/>
        </div>
    </div>
);

export default App;
