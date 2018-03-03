import React, { Component } from 'react';
import Card from './card';

class Deck extends Component{
    constructor(props) {
        super(props);

        this.state = {
            cards: this.props.cards,
            display: true
        };

        this.dealcards = this.dealcards.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.reset === true){
            this.setState({
                display: true
            });
        }
    }

    dealcards() {
        return this.state.cards.map((num, index) => {
            return <Card key={index} num={num} display={this.state.display}/>;
        });
    }

    render(){
        return(<div>{this.dealcards()}</div>)
    }
}

export default Deck;