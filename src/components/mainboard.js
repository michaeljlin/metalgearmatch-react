import React, { Component } from 'react';
import Player from "./player";
import Boss from "./boss";
import Card from './card';
import Deck from './deck';

import backImg from '../assets/images/mgscard.svg';

class Main extends Component{
    constructor(props){
        super(props);

        this.state = {
            cards: [1,2,3],
            reset: false
        };

        this.dealcards = this.dealcards.bind(this);
        this.shufflecards = this.shufflecards.bind(this);
        this.reset = this.reset.bind(this);
    }

    shufflecards(){

    }

    dealcards() {
        return this.state.cards.map((num, index) => {
            return <Card key={index} num={num} display={this.state.display}/>;
        });
    }

    reset(){
        console.log('resetting');
        this.setState({
            reset: true
        });
    }

    render(){
        return(
            <div>Main Board
                <Player />
                <Deck cards={this.state.cards} reset={this.state.reset}/>
                <Boss />
                <button onClick={this.reset}>Reset</button>
            </div>
        );
    }
}

export default Main;