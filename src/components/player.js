import React, { Component } from 'react';

class Player extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="player">
                <p>Player Profile</p>

                <button onClick={this.props.reset}>Reset</button>
            </div>
        );
    }
}

export default Player;