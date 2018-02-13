import React, { Component } from 'react';
import Health from './healthbar';

class Player extends Component{
    constructor(props) {
        super(props);
        // console.log('player props is: ',props.stats);
        this.state = {...props.stats};
    }

    componentWillReceiveProps(nextProps){
        // console.log('changing player health to: ',nextProps);
        if(this.state.health !== nextProps.stats.health){
            const tempState = {...nextProps.stats};
            this.setState(tempState);
        }
    }

    render(){
        const health = this.state.health;
        return(
            <div className="player">
                <Health HP={health}/>
                <p>Player Profile</p>

                <button onClick={this.props.start}>Start Game</button>

                <button onClick={this.props.reset}>Reset</button>

                <button onClick={this.props.soundToggle}>Toggle Sound</button>
            </div>
        );
    }
}

export default Player;