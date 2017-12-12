import React, { Component } from 'react';

class Card extends Component{
    constructor(props) {
        super(props);

        this.state = {
            num: this.props.num
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log(`you got ${this.state.num}!`);
    }

    render(){
        return(
            <div onClick={this.handleClick}>{this.props.num}</div>
        );
    }
}

export default Card;