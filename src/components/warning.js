import React, { Component } from 'react';
import dangerTape from '../assets/images/dangertape.svg';

class Warning extends Component{
    constructor(props){
        super(props);

        this.state = {
            stage: props.bossState,
            attempts: props.attempts
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.bossState !== this.state.stage){
            this.setState({
                stage: nextProps.bossState
            });
        }

        if(nextProps.attempts !== this.state.attempts){
            this.setState({
                attempts: nextProps.attempts
            });
        }
    }

    render(){
        const { stage, attempts } = this.state;

        const warningStyle = {};

        if(stage !== null){
            switch(stage){
                case 1:
                    if(attempts >= 8){
                        warningStyle.animation = 'caution 4s ease-in-out infinite';
                    }
                    break;
                case 2:
                    if(attempts >= 6){
                        warningStyle.animation = 'caution 4s ease-in-out infinite';
                    }
                    break;
                case 3:
                    if(attempts >= 4){
                        warningStyle.animation = 'caution 4s ease-in-out infinite';
                    }
                    break;
                default:
                    warningStyle.opacity = 0;
            }
        }

        return (<div className="warning" style={warningStyle}>
            <img src={dangerTape}></img>
        </div>)
    }
}

export default Warning;