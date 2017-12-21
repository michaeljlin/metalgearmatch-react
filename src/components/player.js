import React, { Component } from 'react';
import Health from './healthbar';

class Player extends Component{
    constructor(props) {
        super(props);

        this.state = {...props};
    }

    render(){
        return(
            <div className="player">
                <Health HP={this.state.health}/>
                <p>Player Profile</p>

                <button onClick={this.props.reset}>Reset</button>
            </div>
        );
    }
}

export default Player;