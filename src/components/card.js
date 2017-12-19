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
            frontStyle: {
                'backgroundColor': 'blue',
                transform: 'rotateY(180deg)'
            },
            backStyle: {
                'backgroundColor': 'red',
                top: '-101%'
            },
            flipStyle:{
                transform: "inherit"
            }
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log('got message');
        const tempState = {...this.state};

        if(this.props.flipped !== nextProps.flipped) {
            if (nextProps.flipped === true) {
                console.log(`flipping card ${this.state.num} up!`);
                tempState.flipStyle.transform = 'rotateY(180deg)';

                this.setState(tempState);
            }
            else if (nextProps.flipped === false) {
                console.log(`flipping card ${this.state.num} down!`);
                tempState.flipStyle.transform = "inherit";

                this.setState(tempState);
            }
            // console.log(this.state);
        }
    }

    handleClick(){
        console.log(`you got ${this.state.num}!`);
        this.props.handleMatch(this.props.id, this.props.num);
    }

    render(){
        const {frontStyle, backStyle, flipStyle} = this.state;

        return(
            <div className="container" onClick={this.handleClick}>
                <div className="card" style={{...flipStyle}}>
                    <img src={backImg} style={{...frontStyle}}/>
                    <img src={backImg} style={{...backStyle}}/>

                </div>
            </div>
        );
    }
}

export default Card;