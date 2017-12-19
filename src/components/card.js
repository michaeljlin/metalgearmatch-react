import React, { Component } from 'react';
import backImg from '../assets/images/mgscard.svg';
import './app.css';

class Card extends Component{
    constructor(props) {
        super(props);

        this.state = {
            num: this.props.num,
            frontStyle: {
                'backgroundColor': 'blue',
                display: 'none'
            },
            backStyle: {
                'backgroundColor': 'red',
                display: 'block'
            }
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        console.log('got message');
        const tempState = {...this.state};

        if(nextProps.flipped === true){
            console.log(`flipping card ${this.state.num} up!`);
            tempState.frontStyle.display = 'block';
            tempState.backStyle.display = 'none';

            this.setState(tempState);
        }
        else if(nextProps.flipped === false){
            console.log(`flipping card ${this.state.num} down!`);
            tempState.frontStyle.display = 'none';
            tempState.backStyle.display = 'block';

            this.setState(tempState);
        }
        // console.log(this.state);
    }

    handleClick(){
        console.log(`you got ${this.state.num}!`);
        this.props.handleMatch(this.props.id, this.props.num);
    }

    render(){
        const {frontStyle, backStyle} = this.state;

        return(
            <div className="card" onClick={this.handleClick}>
                <div style={{...frontStyle}} >
                    <img src={backImg}/>
                </div>
                <div style={{...backStyle}} >
                    <img src={backImg}/>
                </div>
            </div>
        );
    }
}

export default Card;