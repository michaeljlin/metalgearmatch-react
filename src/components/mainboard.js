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
            cards: [{num:1, flipped:false},{num:2, flipped: false},{num:1, flipped: false}],
            firstCard: null,
            secondCard: null,
            reset: false
        };

        this.dealcards = this.dealcards.bind(this);
        this.shufflecards = this.shufflecards.bind(this);
        this.reset = this.reset.bind(this);
        this.handleMatch = this.handleMatch.bind(this);
    }

    shufflecards(){

    }

    dealcards() {
        return this.state.cards.map((cards, index) => {
            // const num = cards.num;
            // const flipped = cards.flipped;
            return (<Card key={index} id={index} handleMatch={this.handleMatch} num={this.state.cards[index].num} flipped={this.state.cards[index].flipped} display={this.state.display} reset={this.state.reset}/>);
        });
    }

    handleMatch(cardID, num){
        const tempState = {...this.state};

        if(tempState.firstCard === null){
            console.log(`storing first card click from card ID: ${cardID}, card num: ${num}`);
            tempState.firstCard = {num: num, flipped: true};
        }
        else if(tempState.secondCard === null){
            console.log(`storing second card click from card ID: ${cardID}, card num: ${num}`);
            tempState.secondCard = {num: num, flipped: true};
        }

        if(tempState.secondCard !== null){

            if(tempState.firstCard.num === tempState.secondCard.num){
                console.log(`A match has been made!`);
            }
        }

        this.setState({...tempState});

        console.log(tempState);
    }

    reset(){
        console.log('resetting');
        this.setState({
            cards: [{num:1, flipped:false},{num:2, flipped: false},{num:1, flipped: false}],
            firstCard: null,
            secondCard: null,
            reset: true
        });
    }

    render(){
        return(
            <div>Main Board
                <div>{}</div>
                <Player />
                {/*<Deck cards={this.state.cards} reset={this.state.reset}/>*/}
                <div>
                    {this.dealcards()}
                </div>
                <Boss />
                <button onClick={this.reset}>Reset</button>
            </div>
        );
    }
}

export default Main;