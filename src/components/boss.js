import React, { Component } from 'react';
import ocelot from '../assets/images/ocelotcard.png';
import volgin from '../assets/images/volgincard.png';
import theboss from '../assets/images/thebosscard.png';

class Boss extends Component{
    constructor(props) {
        super(props);

        this.state = {
            attack: props.attack,
            attempts: props.attempts,
            maxAttempts: 10,
            bossState: props.bossState,
            bossInfo: null,
            bossImg: ocelot,
            cardState: props.cardState
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

        if(nextProps.showCards !== this.state.cardState){
            this.setState({
                cardState: nextProps.cardState
            });
        }

        if(nextProps.bossState !== this.state.bossState){
            let bossInfo = {};
            let srcImg = null;

            switch(nextProps.bossState){
                case 1:
                    bossInfo.name = 'Ocelot';
                    bossInfo.maxAttempts = 10;
                    srcImg = ocelot;
                    break;
                case 2:
                    bossInfo.name = 'Volgin';
                    bossInfo.maxAttempts = 8;
                    srcImg = volgin;
                    break;
                case 3:
                    bossInfo.name = 'The Boss';
                    bossInfo.maxAttempts = 6;
                    srcImg = theboss;
                    break;
            }

            this.setState({
                bossState: nextProps.bossState,
                bossInfo: bossInfo,
                bossImg: srcImg
            });
        }
    }

    render(){
        // console.log('boss state: ', this.state);
        const attempts = this.state.attempts;
        const bossState = this.state.bossState;
        const bossInfo = this.state.bossInfo;
        const bossImg = this.state.bossImg;
        const cardState = this.state.cardState;

        let bossStyle = {};

        if(bossState !== null && bossState !== 0 && cardState){
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
                        <img className="bossImage" src={bossImg}/>
                    </div>
                    <p>Turns until attack: {(bossInfo !== null ? bossInfo.maxAttempts : 0)-attempts}</p>
                </div>
            </div>
        );
    }
}

export default Boss;