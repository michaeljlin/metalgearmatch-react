import React from 'react';
import './app.css';
import Main from './mainboard';
import BrowserDetection from 'react-browser-detection';
import pazPortrait from '../assets/images/paz.png'
import pazBrowser from '../assets/images/pazinjured.png';

const browserHandler = {
    chrome: () => <Main/>,
    safari: ()=> <Main/>,
    default: (browser) => (<div className="browserWarning">
        <p>Please pardon the inconvenience:</p>
        <p>This app is not supported in {browser}.</p>
        <p>Please try opening it in Chrome or Safari.</p>
        <img src={pazBrowser}/>
    </div>),
};

const App = () => (
    <div>
        <div className="app">
            <div className="portraitWarning">
                <p>Please pardon the inconvenience:</p>
                <p>This app runs best in landscape mode.</p>
                <img src={pazPortrait}/>
            </div>
            <BrowserDetection>
                { browserHandler }
            </BrowserDetection>
        </div>
    </div>
);

export default App;
