import React, { Component } from 'react';
import ocelot from '../assets/images/ocelotcard.png';

class Boss extends Component{
    constructor(props) {
        super(props);

        this.state = {
            attack: props.attack,
            attempts: props.attempts,
            maxAttempts: 10,
            bossState: props.bossState,
            bossInfo: null
        }
    }

    componentWillReceiveProps(nextProps){
        // console.log(`boss received new props: `, nextProps);

        if(nextProps.attempts!== this.state.attempts){

            if(nextProps.attempts === this.state.maxAttempts){
                console.log('triggering boss attack');
                this.state.attack();
                return;
            }

            this.setState({
                attempts: nextProps.attempts
            });
        }

        if(nextProps.bossState !== this.state.bossState){
            let bossInfo = {};

            switch(nextProps.bossState){
                case 1:
                    bossInfo.name = 'Ocelot';
                    bossInfo.maxAttempts = 10;
                    break;
                case 2:
                    bossInfo.name = 'Volgin';
                    bossInfo.maxAttempts = 8;
                    break;
                case 3:
                    bossInfo.name = 'The Boss';
                    bossInfo.maxAttempts = 6;
                    break;
            }

            this.setState({
                bossState: nextProps.bossState,
                bossInfo: bossInfo
            });
        }
    }

    render(){
        // console.log('boss alerts state: ', this.state.alerts);
        const attempts = this.state.attempts;
        const bossState = this.state.bossState;
        const bossInfo = this.state.bossInfo;

        let bossStyle = {};

        if(bossState !== null){
            bossStyle.opacity = 1;
        }
        else{
            bossStyle.opacity = 0;
        }

        return(
            <div className="boss">
                <div className="bossBox" style={bossStyle}>
                    <p className="mgsfont">{bossInfo !== null ? bossInfo.name : ""}</p>
                    <div>
                        <div className="bossScanlines"></div>
                        <img className="bossImage" src={ocelot}/>
                    </div>
                    <p>Turns until attack: {this.state.maxAttempts-attempts}</p>
                </div>
            </div>
        );
    }
}

export default Boss;