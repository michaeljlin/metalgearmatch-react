import React, { Component } from 'react';
import Health from './healthbar';

class Player extends Component{
    constructor(props) {
        super(props);
        // console.log('player props is: ',props.stats);
        this.state = {
            health: props.stats.health,
            maxHealth: props.stats.maxHealth
        };
    }

    componentWillReceiveProps(nextProps){

        if(this.state.health !== nextProps.stats.health){
            console.log('changing player health to: ',nextProps);
            const tempState = {
                health: nextProps.stats.health,
                maxHealth: nextProps.stats.maxHealth
            };
            this.setState(tempState);
        }
    }

    render(){
        const {health, maxHealth} = this.state;
        return(
            <div className="player">
                <Health HP={health} maxHP={maxHealth}/>
                <p>Player Profile</p>

                <button onClick={this.props.start}>Start Game</button>

                <button onClick={this.props.reset}>Reset</button>

                <button onClick={this.props.soundToggle}>Toggle Sound</button>
            </div>
        );
    }
}

export default Player;