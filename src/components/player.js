import React, { Component } from 'react';
import Health from './healthbar';
import snake from '../assets/images/snakecard.png'

class Player extends Component{
    constructor(props) {
        super(props);
        this.state = {
            health: props.stats.health,
            maxHealth: props.stats.maxHealth,
            cardState: false
        };
    }

    componentWillReceiveProps(nextProps){

        if(this.state.health !== nextProps.stats.health){
            const tempState = {
                health: nextProps.stats.health,
                maxHealth: nextProps.stats.maxHealth
            };
            this.setState({
                health: tempState.health,
                maxHealth: tempState.maxHealth
            });
        }

        if(this.state.maxHealth !== nextProps.stats.maxHealth){
            const tempState = {
                health: nextProps.stats.health,
                maxHealth: nextProps.stats.maxHealth
            };
            this.setState({
                health: tempState.health,
                maxHealth: tempState.maxHealth
            });
        }

        if(this.state.cardState !== nextProps.cardState){
            this.setState({
                cardState: nextProps.cardState
            });
        }
    }

    render(){
        const {health, maxHealth, cardState} = this.state;

        let showStyle = {};

        if(cardState){
            showStyle.opacity = 1;
        }
        else{
            showStyle.opacity = 0;
        }

        return(
            <div className="player">
                <div style={showStyle} className="playerBox">
                    <Health HP={health} maxHP={maxHealth}/>
                    <div className="playerScreen">
                        <div className="bossScanlines"></div>
                        <img className="bossImage" src={snake}/>
                    </div>
                    <p className="mgsfont">Snake</p>
                </div>
            </div>
        );
    }
}

export default Player;