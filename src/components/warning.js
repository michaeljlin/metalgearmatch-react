import React, { Component } from 'react';
import danger from '../assets/images/danger.png';

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
                        warningStyle.animation = 'caution 2s ease-in-out infinite';
                        warningStyle.transform = 'rotateX(0deg)';
                    }
                    break;
                case 2:
                    if(attempts >= 6){
                        warningStyle.animation = 'caution 2s ease-in-out infinite';
                        warningStyle.transform = 'rotateX(0deg)';
                    }
                    break;
                case 3:
                    if(attempts >= 4){
                        warningStyle.animation = 'caution 2s ease-in-out infinite';
                        warningStyle.transform = 'rotateX(0deg)';
                    }
                    break;
                default:
                    // warningStyle.opacity = 0;
                    warningStyle.transform = 'rotateX(73deg)';
            }
        }

        return (<div className="warning" style={warningStyle}>
            <img src={danger}></img>
        </div>)
    }
}

export default Warning;