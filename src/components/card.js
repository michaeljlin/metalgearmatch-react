import React, { Component } from 'react';
import backImg from '../assets/images/mgscard.svg';
import theFear from '../assets/images/thefearcard.png';
import paramedic from '../assets/images/paramediccard.png';
import thePain from '../assets/images/thepaincardfixed.png';
import theFury from '../assets/images/thefurycardfixed.png';
import eva from '../assets/images/evacardfixed.png';
import theSorrow from '../assets/images/thesorrowcardfixed.png';
import sigint from '../assets/images/sigintcardfixed.png';
import zero from '../assets/images/zerocard.png';
import sokolov from '../assets/images/sokolovcard.png';

import './app.css';

/*
*   3D card flip animation adapted from article by David DeSandro:
*   https://desandro.github.io/3dtransforms/docs/card-flip.html
*/

class Card extends Component{
    constructor(props) {
        super(props);

        let srcImg = null;

        switch(this.props.num){
            case 1:
                srcImg = theFury;
                break;
            case 2:
                srcImg = thePain;
                break;
            case 3:
                srcImg = theFear;
                break;
            case 4:
                srcImg = theSorrow;
                break;
            case 5:
                srcImg = sigint;
                break;
            case 6:
                srcImg = zero;
                break;
            case 7:
                srcImg = sokolov;
                break;
            case 8:
                srcImg = eva;
                break;
            default:
                srcImg = paramedic;
        }

        let backgroundColor = null;

        if(this.props.num >= 5){
            backgroundColor = 'blue';
        }
        else{
            backgroundColor = 'red'
        }

        this.state = {
            num: this.props.num,
            backStyle: {
                'backgroundColor': backgroundColor,
                transform: 'rotateY(180deg)'
            },
            frontStyle: {
                'backgroundColor': 'red'
            },
            flipStyle:{
                transform: ""
            },
            fadeout: false,
            srcImg: srcImg,
            timeoutTracker: null
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        // console.log('got message');
        const tempState = {...this.state};

        if(nextProps.reset){
            clearTimeout(this.state.timeoutTracker);

            tempState.num = nextProps.num;
            tempState.timeoutTracker = null;
            let srcImg = null;

            switch(tempState.num){
                case 1:
                    srcImg = theFury;
                    break;
                case 2:
                    srcImg = thePain;
                    break;
                case 3:
                    srcImg = theFear;
                    break;
                case 4:
                    srcImg = theSorrow;
                    break;
                case 5:
                    srcImg = sigint;
                    break;
                case 6:
                    srcImg = zero;
                    break;
                case 7:
                    srcImg = sokolov;
                    break;
                case 8:
                    srcImg = eva;
                    break;
                default:
                    srcImg = paramedic;
            }

            let backgroundColor = null;

            if(tempState.num >= 5){
                backgroundColor = 'blue';
            }
            else{
                backgroundColor = 'red'
            }

            tempState.backStyle.backgroundColor = backgroundColor;

            tempState.srcImg = srcImg;

            tempState.frontStyle.opacity = 0;
            tempState.backStyle.opacity = 0;

            this.setState(tempState);
        }
        else if(!nextProps.reset && !nextProps.fade){
            tempState.backStyle.opacity = 1;
            tempState.backStyle.cursor = 'pointer';
            tempState.frontStyle.opacity = 1;
            tempState.frontStyle.cursor = 'pointer';

            this.setState({
                backStyle: tempState.backStyle,
                frontStyle: tempState.frontStyle
            });
            this.setState(tempState);
        }

        if(this.props.flipped !== nextProps.flipped) {
            if (nextProps.flipped === true) {
                // console.log(`flipping card ${tempState.num} up!`);
                // console.log(`state of flipped card: `, this.state);
                tempState.flipStyle.transform = 'translateZ(50px) rotateY(180deg)';

                this.setState({flipStyle: tempState.flipStyle});
            }
            else if (nextProps.flipped === false) {
                // console.log(`flipping card ${tempState.num} down!`);
                tempState.flipStyle.transform = "";

                this.setState({flipStyle: tempState.flipStyle});
            }
            // console.log(this.state);
        }

        if(nextProps.fade){

            tempState.timeoutTracker = setTimeout(function(){
                tempState.backStyle.opacity = 0;
                tempState.backStyle.cursor = 'initial';
                tempState.frontStyle.opacity = 0;
                tempState.frontStyle.cursor = 'initial';

                this.setState({
                    backStyle: tempState.backStyle,
                    frontStyle: tempState.frontStyle
                });
            }.bind(this),1500);
        }

        this.setState({
            timeoutTracker: tempState.timeoutTracker
        });
    }

    handleClick(){
        console.log(`you got ${this.state.num}!`);
        this.props.handleMatch(this.props.id, this.props.num);
    }

    render(){
        const {frontStyle, backStyle, flipStyle, srcImg} = this.state;

        return(
            <div draggable="false" className={`cardContainer`} style={{...flipStyle}} onClick={this.handleClick}>
                <div className="card"  >
                    <img draggable="false" src={srcImg} style={{...backStyle}}/>
                    <img draggable="false" src={backImg} style={{...frontStyle}}/>
                </div>
            </div>
        );
    }
}

export default Card;