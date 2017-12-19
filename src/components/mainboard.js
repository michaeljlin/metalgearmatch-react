import React, { Component } from 'react';
import Player from "./player";
import Boss from "./boss";
import Card from './card';

import backImg from '../assets/images/mgscard.svg';

class Main extends Component{
    constructor(props){
        super(props);

        this.state = {
            cards: [{num:1, flipped:false},{num:2, flipped: false},{num:1, flipped: false}],
            firstCard: null,
            secondCard: null,
            message: ""
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
            return (<Card key={index} id={index} handleMatch={this.handleMatch} num={this.state.cards[index].num} flipped={this.state.cards[index].flipped}/>);
        });
    }

    handleMatch(cardID, num){
        const tempState = {...this.state};

        if(tempState.firstCard === null){
            console.log(`storing first card click from card ID: ${cardID}, card num: ${num}`);
            tempState.firstCard = {num: num, flipped: true, id: cardID};
            tempState.cards[cardID] = {num: num, flipped: true};
        }
        else if(tempState.secondCard === null){

            if(tempState.firstCard.id === cardID){
                console.log(`cannot match own card! returning!`);
                return;
            }

            console.log(`storing second card click from card ID: ${cardID}, card num: ${num}`);
            tempState.secondCard = {num: num, flipped: true, id: cardID};
            tempState.cards[cardID] = {num: num, flipped: true};
        }

        if(tempState.secondCard !== null){

            if(tempState.firstCard.num === tempState.secondCard.num){
                console.log(`A match has been made!`);
                tempState.message = 'Made a match!';
            }
            else{
                console.log(`Not a match, resetting cards!`);
                tempState.cards[tempState.firstCard.id] = {num: tempState.firstCard.num, flipped: false};
                tempState.cards[tempState.secondCard.id] = {num: tempState.secondCard.num, flipped: false};

                tempState.firstCard = null;
                tempState.secondCard = null;

                tempState.message = 'Not a match!';
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
            message: ""
        });
    }

    render(){
        const {message} = this.state;

        return(
            <div className="mainBoard">
                <div>{message}</div>
                <Player reset={this.reset} />
                <div className="cardDisplay">
                    {this.dealcards()}
                </div>
                <Boss />
                {/*<button onClick={this.reset}>Reset</button>*/}
            </div>
        );
    }
}

export default Main;