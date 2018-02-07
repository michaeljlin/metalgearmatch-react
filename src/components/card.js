import React, { Component } from 'react';
import backImg from '../assets/images/mgscard.svg';
import './app.css';

/*
*   3D card flip animation adapted from article by David DeSandro:
*   https://desandro.github.io/3dtransforms/docs/card-flip.html
*/

class Card extends Component{
    constructor(props) {
        super(props);

        this.state = {
            num: this.props.num,
            backStyle: {
                'backgroundColor': 'blue',
                transform: 'rotateY(180deg)'
            },
            frontStyle: {
                'backgroundColor': 'red'
            },
            flipStyle:{
                transform: ""
            },
            fadeout: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        // console.log('got message');
        const tempState = {...this.state};

        if(this.props.num !== nextProps.num){
            tempState.num = nextProps.num;
            this.setState(tempState);
        }

        if(this.props.flipped !== nextProps.flipped) {
            if (nextProps.flipped === true) {
                // console.log(`flipping card ${tempState.num} up!`);
                tempState.flipStyle.transform = 'rotateY(180deg)';

                this.setState(tempState);
            }
            else if (nextProps.flipped === false) {
                // console.log(`flipping card ${tempState.num} down!`);
                tempState.flipStyle.transform = "";

                this.setState(tempState);
            }
            // console.log(this.state);
        }

        if(nextProps.fade){
            console.log('fade is not false!');
            console.log('fade is: ', nextProps.fade);

            setTimeout(function(){
                tempState.backStyle.opacity = 0;
                tempState.frontStyle.opacity = 0;
                this.setState(tempState);
            }.bind(this),1500);
        }
    }

    handleClick(){
        console.log(`you got ${this.state.num}!`);
        this.props.handleMatch(this.props.id, this.props.num);
    }

    render(){
        const {frontStyle, backStyle, flipStyle, fadeout} = this.state;

        if(fadeout){
            console.log(`fadeout is: ${fadeout}`);
        }

        return(
            <div className={`container`} style={{...flipStyle}} onClick={this.handleClick}>
                <div className="card"  >
                    <img src={backImg} style={{...backStyle}}/>
                    <img src={backImg} style={{...frontStyle}}/>

                </div>
            </div>
        );
    }
}

export default Card;