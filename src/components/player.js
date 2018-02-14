import React, { Component } from 'react';
import Health from './healthbar';
import snake from '../assets/images/snakecard.png'

class Player extends Component{
    constructor(props) {
        super(props);
        // console.log('player props is: ',props.stats);
        this.state = {
            health: props.stats.health,
            maxHealth: props.stats.maxHealth,
            cardState: false
        };
    }

    componentWillReceiveProps(nextProps){

        if(this.state.health !== nextProps.stats.health){
            // console.log('changing player health to: ',nextProps);
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
                    <p>Snake</p>

                    <div>
                        <div className="bossScanlines"></div>
                        <img className="bossImage" src={snake}/>
                    </div>


                    {/*<button onClick={this.props.start}>Start Game</button>*/}

                    {/*<button onClick={this.props.reset}>Reset</button>*/}

                    {/*<button onClick={this.props.soundToggle}>Toggle Sound</button>*/}

                    {/*<button onClick={this.props.info}>Toggle Instructions</button>*/}
                </div>
            </div>
        );
    }
}

export default Player;