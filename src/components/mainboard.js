import React, { Component } from 'react';
import Player from "./player";
import Boss from "./boss";
import Card from './card';

class Main extends Component{
    constructor(props){
        super(props);

        this.state = {
            cards: [1,2,3]
        };

        this.dealcards = this.dealcards.bind(this);
        this.shufflecards = this.shufflecards.bind(this);
    }

    shufflecards(){

    }

    dealcards() {
        return this.state.cards.map((num, index) => {
            return <Card key={index} num={num}/>;
        });
    }

    render(){
        return(
            <div>Main Board
                <Player />
                <div>
                    {this.dealcards()}
                </div>
                <Boss />
            </div>
        );
    }
}

export default Main;